'use client'

import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatter'
import { useAside } from '@/hooks/useAside'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

export default function AsideBar() {
  const { cart, totalValue } = useCart()
  const { isOpen, handleToggleAside } = useAside()
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <aside
      className={`h-full w-[480px] bg-gray800 absolute bottom-[0.25rem] right-[0.25rem] z-50 ${
        open ? 'translate-x-[0%]' : 'translate-x-[110%]'
      } transition-all ease-in-out delay-2000`}
    >
      <div className="h-full flex flex-col justify-between p-[48px] relative">
        <header className="flex justify-between items-center">
          <h1 className="text-[20px] font-bold">Sacola de compras</h1>
          <button
            onClick={handleToggleAside}
            className="absolute top-6 right-6"
          >
            <MdClose size={24} />
          </button>
        </header>

        <div className="mt-7 overflow-y-auto">
          <ul className="flex flex-col gap-3">
            {cart.map((product) => (
              <li className="flex gap-4" key={product.id}>
                <div className="flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg">
                  <Image width={94} height={94} src={product.imageURL} alt="" />
                </div>
                <div className="flex justify-between flex-col gap-[4px] items-start">
                  <p className="text-gray300">{product.name}</p>
                  <span className="text-[18px] font-semibold">
                    {formatPrice.format(product.price / 100)}
                  </span>
                  <button className="text-green500 font-semibold">
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center">
              <span>Quantidade</span>
              <span>
                {cart.length} {cart.length > 1 ? 'itens' : 'item'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[18px] text-gray100 font-bold">
                Valor total
              </span>
              <span className="text-[24px] text-gray100 font-bold">
                {formatPrice.format(totalValue / 100)}
              </span>
            </div>
          </div>

          <button className="text-center font-bold text-[18px] rounded-lg bg-green500 hover:bg-green300 py-5 px-8">
            Finalizar compra
          </button>
        </div>
      </div>
    </aside>
  )
}
