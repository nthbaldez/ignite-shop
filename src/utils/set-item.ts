import { Product } from '../types'

export function setItem(updatedCart: Product[]) {
  localStorage.setItem('@coffee-delivery:cart', JSON.stringify(updatedCart))
}
