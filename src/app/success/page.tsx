'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { stripe } from '@/lib/stripe'
import { useCart } from '@/hooks/useCart'

interface Product {
  name: string
  imageUrl: string
}

export default function Success() {
  const searchParams = useSearchParams()
  const [customerName, setCustomerName] = useState<string | undefined | null>()
  const [products, setProducts] = useState<Product[]>([])

  const router = useRouter()

  const { handleCart } = useCart()

  useEffect(() => {
    async function getSession() {
      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        router.push('/')
      } else {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items', 'line_items.data.price.product'],
        })

        const customerName = session.customer_details?.name
        const products = session.line_items?.data
        setCustomerName(customerName)
        console.log(products)
        const formattedProducts = products?.map((product) => {
          return {
            name: product.description,
            imageUrl: product.price?.product.images[0],
          }
        })

        if (formattedProducts) setProducts(formattedProducts)
      }
    }

    getSession()
  }, [searchParams, router])
  return (
    <main className="flex flex-col items-center justify-center mx-auto height-[656px]">
      <h1 className="text-3xl text-gray100">Compra efetuada</h1>

      <div className="flex relative gap-2">
        {products.map((product) => {
          return (
            <div
              key={product.name}
              className={`w-full max-w-[130px] h-[130px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-full p-1 mt-16 flex items-center justify-center`}
            >
              {product?.imageUrl && (
                <Image
                  src={String(product?.imageUrl)}
                  width={560}
                  height={656}
                  alt=""
                  className="object-cover"
                />
              )}
            </div>
          )
        })}
      </div>

      <p className="text-2xl text-gray100 max-w-[560px] text-center mt-4 leading-8">
        Uhuul <strong>{customerName}</strong>, sua compra de camisetas já está a
        caminho da sua casa.
      </p>

      <Link
        onClick={handleCart}
        href="/"
        className="block mt-20 text-xl text-green500 font-bold hover:text-green300"
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
