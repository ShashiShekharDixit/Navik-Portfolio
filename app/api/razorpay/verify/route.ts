import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  // Signature verification is the source of truth; never trust a browser success callback alone.
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 })
  }

  let body: {
    razorpay_payment_id?: unknown
    razorpay_subscription_id?: unknown
    razorpay_signature?: unknown
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const paymentId = typeof body.razorpay_payment_id === 'string' ? body.razorpay_payment_id : ''
  const subscriptionId = typeof body.razorpay_subscription_id === 'string' ? body.razorpay_subscription_id : ''
  const signature = typeof body.razorpay_signature === 'string' ? body.razorpay_signature : ''

  if (!paymentId || !subscriptionId || !/^[a-f0-9]{64}$/i.test(signature)) {
    return NextResponse.json({ error: 'Invalid payment verification data.' }, { status: 400 })
  }

  // Razorpay subscription signatures are HMAC-SHA256(subscription_id|payment_id).
  const expected = createHmac('sha256', secret)
    .update(`${subscriptionId}|${paymentId}`)
    .digest('hex')
  const verified = timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'))

  if (!verified) {
    return NextResponse.json({ error: 'Payment signature verification failed.' }, { status: 400 })
  }

  return NextResponse.json({ verified: true })
}
