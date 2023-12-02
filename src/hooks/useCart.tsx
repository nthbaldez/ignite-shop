'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Product } from '../types'
import { setItem } from '../utils/set-item'
import { getProduct } from '@/services/get-products'

interface CartProviderProps {
  children: ReactNode
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: string) => Promise<void>
  removeProduct: (productId: string) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const storagedCart = localStorage.getItem('@ignite-shop:cart')

      if (storagedCart) {
        return JSON.parse(storagedCart)
      }
    }

    return []
  })

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

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
