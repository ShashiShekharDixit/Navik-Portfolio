import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const planConfiguration: Record<string, { name: string; monthlyRate: number; planId?: string }> = {
  launch: { name: 'Launch', monthlyRate: 85, planId: process.env.RAZORPAY_PLAN_LAUNCH },
  growth: { name: 'Growth', monthlyRate: 99, planId: process.env.RAZORPAY_PLAN_GROWTH },
  premium: { name: 'Premium', monthlyRate: 149, planId: process.env.RAZORPAY_PLAN_PREMIUM },
  custom: { name: 'Custom', monthlyRate: 199, planId: process.env.RAZORPAY_PLAN_CUSTOM },
}

const licenseConfiguration: Record<string, { label: string; monthlyRate: number }> = {
  field: { label: 'Field Sales Tracker', monthlyRate: 69 },
  sso: { label: 'SSO + Multi-Factor Authentication', monthlyRate: 19 },
  contractual: { label: 'Contractual Workforce Management', monthlyRate: 49 },
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
}

function makeQuote(body: Record<string, unknown>) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const contact = typeof body.contact === 'string' ? body.contact.replace(/\D/g, '') : ''
  const quantity = Number(body.quantity)
  const duration = Number(body.duration)
  const plan = typeof body.plan === 'string' ? body.plan : ''
  const selectedLicenses = Array.isArray(body.licenses) ? body.licenses.filter((value): value is string => typeof value === 'string') : []
  const configuration = planConfiguration[plan]

  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter valid customer details.')
  if (!/^\d{10,15}$/.test(contact) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000) throw new Error('Enter valid contact and employee details.')
  if (![1, 3, 6, 12].includes(duration)) throw new Error('Choose a valid subscription duration.')
  if (!configuration) throw new Error('The selected plan is unavailable.')

  const licenses = [...new Set(selectedLicenses)].map((license) => licenseConfiguration[license]).filter(Boolean)
  const baseAmount = configuration.monthlyRate * quantity * duration
  const licenseAmounts = licenses.map((license) => ({ label: license.label, amount: license.monthlyRate * quantity * duration }))
  const total = baseAmount + licenseAmounts.reduce((sum, license) => sum + license.amount, 0)
  const start = new Date()
  const end = new Date(start)
  end.setMonth(end.getMonth() + duration)

  return {
    invoiceNumber: `NAVIK-${Date.now()}`,
    customer: { name, email, contact, quantity, duration },
    plan,
    planName: configuration.name,
    planId: configuration.planId,
    licenses: licenseAmounts,
    licenseKeys: [...new Set(selectedLicenses)].filter((license) => license in licenseConfiguration),
    baseAmount,
    gst: 0,
    total,
    startDate: formatDate(start),
    endDate: formatDate(end),
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid request body.', 400)
  }

  let quote: ReturnType<typeof makeQuote>
  try {
    quote = makeQuote(body)
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : 'Invalid subscription details.', 400)
  }

  // Stage 1 only returns a server-calculated quote. It does not create a subscription.
  if (body.action === 'quote') return NextResponse.json({ quote })
  if (body.action !== 'create') return jsonError('Invalid subscription action.', 400)

  // Keep all credentials, rates, and Razorpay plan IDs on the server.
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return jsonError('Payment service is not configured.', 503)
  if (!quote.planId) return jsonError('This plan is not configured for Razorpay yet.', 503)

  const authorization = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
  // Stage 2 creates the recurring subscription only after the client confirms the quote.
  const razorpayResponse = await fetch('https://api.razorpay.com/v1/subscriptions', {
    method: 'POST',
    headers: { Authorization: `Basic ${authorization}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan_id: quote.planId,
      total_count: quote.customer.duration,
      quantity: quote.customer.quantity,
      customer_notify: 1,
      addons: quote.licenses.map((license) => ({
        item: { name: license.label, amount: license.amount * 100, currency: 'INR' },
        quantity: 1,
      })),
      notes: { invoice_number: quote.invoiceNumber, customer_name: quote.customer.name, customer_email: quote.customer.email },
    }),
    cache: 'no-store',
  })

  if (!razorpayResponse.ok) return jsonError('Unable to create the subscription.', 502)
  const subscription = await razorpayResponse.json() as { id?: string }
  if (!subscription.id) return jsonError('Razorpay returned an invalid subscription.', 502)

  return NextResponse.json({ keyId, subscriptionId: subscription.id, quote })
}
