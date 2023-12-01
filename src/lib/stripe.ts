import Stripe from 'stripe'

const API_KEY =
  process.env.NEXT_STRIPE_SECRET_KEY ||
  'sk_test_51OFip9BopOvr8Ae1w7QKr1p0AF13NbNKgAoTLTxhoEqF1CoZ0cWIKFsEjWxWe8UalJJvCFIJfTXOSde1h3vNrgVe00GHYGaHtF'

export const stripe = new Stripe(API_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop',
  },
})
