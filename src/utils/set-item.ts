import { Product } from '../types'

export function setItem(updatedCart: Product[]) {
  localStorage.setItem('@ignite-shop:cart', JSON.stringify(updatedCart))
}
