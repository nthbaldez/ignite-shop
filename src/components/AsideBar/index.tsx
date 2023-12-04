import Image from 'next/image'

import Shirt from '../../assets/shirts/Shirt-1.png'

type AsideProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AsideBar() {
  return (
    <aside className="h-full w-[480px] bg-gray800 absolute right-[0px] top-0 z-50">
      <div className="h-full flex flex-col justify-between p-[48px]">
        <h1 className="text-[20px] font-bold">Sacola de compras</h1>

        <div className="mt-7 overflow-y-auto">
          <ul className="flex flex-col gap-3">
            <li className="flex gap-4">
              <div className="flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg">
                <Image width={94} height={94} src={Shirt} alt="" />
              </div>
              <div className="flex justify-between flex-col gap-[4px] items-start">
                <p className="text-gray300">Camiseta Igniter</p>
                <span className="text-[18px] font-semibold">R$ 79,90</span>
                <button className="text-green500 font-semibold">Remover</button>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg">
                <Image width={94} height={94} src={Shirt} alt="" />
              </div>
              <div className="flex justify-between flex-col gap-[4px] items-start">
                <p className="text-gray300">Camiseta Igniter</p>
                <span className="text-[18px] font-semibold">R$ 79,90</span>
                <button className="text-green500 font-semibold">Remover</button>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg">
                <Image width={94} height={94} src={Shirt} alt="" />
              </div>
              <div className="flex justify-between flex-col gap-[4px] items-start">
                <p className="text-gray300">Camiseta Igniter</p>
                <span className="text-[18px] font-semibold">R$ 79,90</span>
                <button className="text-green500 font-semibold">Remover</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-8">
          <div className="grid grid-cols-1">
            <div className="flex justify-between items-center">
              <span>Quantidade</span>
              <span>3 itens</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[18px] text-gray100 font-bold">
                Valor total
              </span>
              <span className="text-[24px] text-gray100 font-bold">
                R$ 270,00
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
