'use client'

import { useKeenSlider } from 'keen-slider/react'
import Link from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Product {
  id: string
  name: string
  imageURL: string
  price: string | 0 | null
}
interface MainProductsListProps {
  products: Product[]
}

export default function MainProductsList({ products }: MainProductsListProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <main
      ref={sliderRef}
      className={twMerge(
        'flex w-full max-w-calculated ml-auto min-h-[656px] overflow-hidden',
        'keen-slider',
      )}
    >
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            href={{
              pathname: `/${product.id}`,
            }}
            className={twMerge(
              'rounded-lg cursor-pointer relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] group',
              'keen-slider__slide',
            )}
          >
            <Image
              src={product.imageURL}
              width={520}
              height={656}
              alt=""
              className="object-cover h-full"
            />

            <footer className="absolute bottom-[0.25rem] left-[0.25rem] right-[0.25rem] p-[2rem] rounded-md flex items-center justify-between translate-y-[110%] transition-all ease-in-out delay-2000 group-hover:opacity-1 group-hover:translate-y-[0%] bg-[#000]/[0.6]">
              <strong className="text-xl text-gray100">{product.name}</strong>
              <span className="text-2xl font-bold text-green300">
                {product.price}
              </span>
            </footer>
          </Link>
        )
      })}
    </main>
  )
}
