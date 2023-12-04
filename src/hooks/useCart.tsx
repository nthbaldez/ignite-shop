'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Product } from '../types'
import { setItem } from '../utils/set-item'
import { getProduct } from '@/services/get-products'
import axios from 'axios'

interface CartProviderProps {
  children: ReactNode
}
interface PriceIdsProps {
  price: string
  quantity: number
}

interface CartContextData {
  cart: Product[]
  totalValue: number
  addProduct: (productId: string) => Promise<void>
  removeProduct: (productId: string) => void
  handleBuyProduct: (listIds: PriceIdsProps[]) => void
  handleCart: () => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@ignite-shop:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const calculateTotalValue = (items: Product[]) => {
    return items.reduce((total, item) => (total += item.price), 0)
  }

  const totalValue = calculateTotalValue(cart)

  async function addProduct(productId: string) {
    try {
      const updatedCart = [...cart]
      const findProduct = updatedCart.find(
        (product) => product.id === productId,
      )

      if (!findProduct) {
        const product = await getProduct(productId)

        if (product) {
          updatedCart.push({
            ...product,
            id: productId,
          })
        }
        setCart(updatedCart)
        setItem(updatedCart)
      }
    } catch {
      toast.error('Erro na adição do produto')
    }
  }

  function removeProduct(productId: string) {
    try {
      const updatedCart = [...cart]

      const product = updatedCart.findIndex(
        (product) => product.id === productId,
      )

      if (product >= 0) {
        updatedCart.splice(product, 1)
        setItem(updatedCart)
        setCart(updatedCart)
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro na remoção do produto')
    }
  }

  async function handleBuyProduct(defaultPriceIds: PriceIdsProps[]) {
    try {
      const response = await axios.post('/api/checkout', {
        priceIds: defaultPriceIds,
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (err) {
      alert('Houve algum erro')
    }
  }

  function handleCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        totalValue,
        handleBuyProduct,
        handleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
