import Shirt from '../../assets/shirts/Shirt-1.png'
import Image from 'next/image'

export default async function Product() {
  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] mx-auto">
      <div className="w-full max-w-[576px] h-[656px] bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg p-[0.25rem] flex items-center justify-center">
        <Image
          src={Shirt}
          width={576}
          height={656}
          className="object-cover"
          alt=""
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl text-gray300">
          Camiseta Maratona Explorer 2.0
        </h1>
        <span className="mt-4 block text-3xl text-green300">R$ 79,90</span>

        <p className="mt-10 text-lg leading-8 text-gray300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
          similique perspiciatis excepturi aliquid aut quae dolores aliquam
          maiores? Blanditiis exercitationem impedit illum eveniet provident
          repellendus earum eos autem quasi cum! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nulla sed quo est debitis at ipsam unde
          recusandae pariatur sunt laboriosam hic voluptate ducimus voluptas,
          facilis nihil rerum molestiae qui error.
        </p>

        <button className="mt-auto bg-green500 border-0 text-white rounded-lg p-[1.25rem] cursor-pointer font-bold hover:bg-green300">
          Comprar
        </button>
      </div>
    </main>
  )
}
