import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'

const URL = process.env.NEXT_URL || 'https://localhost:3000'

export async function POST(req: Request) {
  const { priceId } = await req.json()

  if (!priceId) {
    NextResponse.json({ status: 400 })
  }

  const successUrl = `${URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return NextResponse.json(
    {
      checkoutUrl: checkoutSession.url,
    },
    { status: 201 },
  )
}
