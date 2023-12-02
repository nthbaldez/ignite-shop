export interface Product {
  id: string
  name: string
  description: string | null
  price: string | 0 | null
  imageURL: string
}
