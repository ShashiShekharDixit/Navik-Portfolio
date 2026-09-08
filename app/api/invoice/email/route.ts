import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type InvoiceRequest = {
  email?: unknown
  invoiceNumber?: unknown
  pdfBase64?: unknown
  finalMessage?: unknown
}

export async function POST(request: Request) {
  let body: InvoiceRequest
  try {
    body = await request.json() as InvoiceRequest
  } catch {
    return NextResponse.json({ error: 'Invalid invoice request.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const invoiceNumber = typeof body.invoiceNumber === 'string' ? body.invoiceNumber.trim() : 'navik-invoice'
  const pdfBase64 = typeof body.pdfBase64 === 'string' ? body.pdfBase64 : ''
  const finalMessage = typeof body.finalMessage === 'string' && body.finalMessage.trim()
    ? body.finalMessage.trim()
    : 'Thank you for choosing navik. Your payment has been confirmed and your final invoice is attached.'
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.INVOICE_FROM_EMAIL

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !pdfBase64 || pdfBase64.length > 10_000_000) {
    return NextResponse.json({ error: 'A valid work email and invoice PDF are required.' }, { status: 400 })
  }
  if (!apiKey || !from) {
    return NextResponse.json({ error: 'Invoice email service is not configured.' }, { status: 503 })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your navik final invoice ${invoiceNumber}`,
      text: finalMessage,
      attachments: [{ filename: `${invoiceNumber}-navik-invoice.pdf`, content: pdfBase64 }],
    }),
    cache: 'no-store',
  })

  if (!resendResponse.ok) return NextResponse.json({ error: 'Unable to send the final invoice email.' }, { status: 502 })
  return NextResponse.json({ sent: true })
}