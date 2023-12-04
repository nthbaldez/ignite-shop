'use client'

import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatter'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  imageURL: string
  price: number | 0
  description: string | null
  defaultPriceId: string
}

interface ProductComponentProps {
  product: Product
}

export default function ProductComponent({ product }: ProductComponentProps) {
  const { name, price, description, imageURL, id } = product

  const { addProduct } = useCart()
  const router = useRouter()

  async function handleAddProductToCart() {
    await addProduct(id)
    router.push('/')
  }

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
        <span className="mt-4 block text-3xl text-green300">
          {formatPrice.format(price / 100)}
        </span>

        <p className="mt-10 text-lg leading-8 text-gray300">{description}</p>

        <button
          onClick={handleAddProductToCart}
          className="mt-auto bg-green500 border-0 text-white rounded-lg p-[1.25rem] cursor-pointer font-bold hover:bg-green300 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Colocar na sacola
        </button>
      </div>
    </main>
  )
}
