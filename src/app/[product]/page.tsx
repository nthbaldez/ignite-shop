import { stripe } from '@/lib/stripe'
import { formatPrice } from '@/utils/formatter'
import { Metadata } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

export const metadata: Metadata = {
  title: '',
  description: '',
}

const getProduct = async (productId: string) => {
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  metadata.title = product.name

  return {
    name: product.name,
    imageURL: product.images[0],
    price: price.unit_amount && formatPrice.format(price.unit_amount / 100),
    description: product.description,
  }
}

export async function generateStaticParams() {
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
      description: product.description,
    }
  })

  return products
}

export default async function Product({
  params,
}: {
  params: { product: string }
}) {
  const { name, imageURL, price, description } = await getProduct(
    params.product,
  )

  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] mx-auto">
      <div className="w-full max-w-[576px] h-[656px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg p-[0.25rem] flex items-center justify-center">
        <Image
          src={imageURL}
          width={576}
          height={656}
          className="object-cover"
          alt=""
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl text-gray300">{name}</h1>
        <span className="mt-4 block text-3xl text-green300">{price}</span>

        <p className="mt-10 text-lg leading-8 text-gray300">{description}</p>

        <button className="mt-auto bg-green500 border-0 text-white rounded-lg p-[1.25rem] cursor-pointer font-bold hover:bg-green300">
          Comprar
        </button>
      </div>
    </main>
  )
}
