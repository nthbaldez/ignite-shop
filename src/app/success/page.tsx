'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

interface Product {
  name: string
  imageUrl: string
}

export default function Success() {
  const searchParams = useSearchParams()
  const [customerName, setCustomerName] = useState<string | undefined | null>()
  const [product, setProduct] = useState<Product>()

  const router = useRouter()

  useEffect(() => {
    async function getSession() {
      const sessionId = searchParams.get('session_id')
      console.log(sessionId)
      if (!sessionId) {
        router.push('/')
      } else {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items', 'line_items.data.price.product'],
        })

        const customerName = session.customer_details?.name
        const product = session.line_items?.data[0].price
          ?.product as Stripe.Product

        if (product && customerName) {
          setCustomerName(customerName)
          setProduct({
            name: product.name,
            imageUrl: product.images[0],
          })
        }
      }
    }

    getSession()
  }, [searchParams, router])
  return (
    <main className="flex flex-col items-center justify-center mx-auto height-[656px]">
      <h1 className="text-3xl text-gray100">Compra efetuada</h1>

      <div className="w-full max-w-[130px] h-[145px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg p-1 mt-16 flex items-center justify-center">
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

      <p className="text-2xl text-gray100 max-w-[560px] text-center mt-4 leading-8">
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{product?.name}</strong> já está a caminho da sua casa.
      </p>

      <Link
        href="/"
        className="block mt-20 text-xl text-green500 font-bold hover:text-green300"
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
