'use client'

import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '../../assets/logoImg.svg'
import { PiHandbag } from 'react-icons/pi'
import { useCart } from '@/hooks/useCart'
import { useAside } from '@/hooks/useAside'

export default function Header() {
  const { cart } = useCart()
  const { isOpen, handleToggleAside } = useAside()

  return (
    <header className="relative w-full py-[2rem] max-w-[1180px] mx-auto flex items-center justify-between">
      <Link href="/">
        <Image src={LogoImg} alt="" />
      </Link>

      <button
        onClick={handleToggleAside}
        className="relative bg-[#202024] p-3 rounded-lg"
      >
        <PiHandbag size={30} />
        <span className="absolute left-10 bottom-10 rounded-full flex items-center w-[20px] h-[20px] text-[14px] bg-green500 text-white">
          <p className="m-auto">{cart.length}</p>
        </span>
      </button>
    </header>
  )
}
