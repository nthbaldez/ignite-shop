import MainProductsList from '@/components/MainProductsList'
import { stripe } from '@/lib/stripe'
import { formatPrice } from '@/utils/formatter'
import Stripe from 'stripe'

async function getProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0],
      price: price.unit_amount && formatPrice.format(price.unit_amount / 100),
    }
  })

  return products
}

export default async function Home() {
  const products = await getProducts()

  return <MainProductsList products={products} />
}
