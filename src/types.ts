export interface Product {
  id: string
  defaultPriceId: string
  name: string
  description: string | null
  price: number | 0
  imageURL: string
}
