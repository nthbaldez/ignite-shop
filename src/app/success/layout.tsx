import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../globals.css'
import LogoImg from '../../assets/logoImg.svg'
import Link from 'next/link'
import Image from 'next/image'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Ignite Shop',
  description: 'Generated by create next app',
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col items-start justify-center h-screen overflow-hidden">
          <header className="relative w-full py-[2rem] max-w-[1180px] mx-auto flex items-start justify-center">
            <Link href="/">
              <Image src={LogoImg} alt="" />
            </Link>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
