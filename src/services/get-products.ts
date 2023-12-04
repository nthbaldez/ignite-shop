import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export const getProduct = async (productId: string) => {
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    id: product.id,
    name: product.name,
    imageURL: product.images[0],
    price: price.unit_amount ? price.unit_amount : 0,
    description: product.description,
    defaultPriceId: price.id,
  }
}
