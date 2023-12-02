import ProductComponent from '@/components/ProductComponent'
import { getProduct } from '@/services/get-products'
export default async function Product({
  params,
}: {
  params: { product: string }
}) {
  const product = await getProduct(params.product)

  return <ProductComponent product={product} />
}
