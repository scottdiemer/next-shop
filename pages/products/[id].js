import Image from 'next/image'
import { ApiError } from '../../lib/api'
import Page from '../../components/Page'
import { getProducts, getProduct } from '../../lib/products'
import { useUser } from '../../hooks/user'

export async function getStaticPaths() {
  const products = await getProducts()
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id)

    return {
      props: {
        product,
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    }
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true }
    }
    throw err
  }
}

export default function ProductPage({ product }) {
  const user = useUser()
  console.log('[ProductPage] user:', user)
  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} width={640} height={480} alt="" />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="mt-2 text-lg font-bold">{product.price}</p>
          {user && <p>Only for {user.name}!!!</p>}
        </div>
      </div>
    </Page>
  )
}
