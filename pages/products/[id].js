import Head from "next/head";
import Image from "next/image";
import { ApiError } from "../../lib/api";
import Title from "../../components/Title";
import { getProducts, getProduct } from "../../lib/products";

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id);

    return {
      props: {
        product,
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

export default function ProductPage({ product }) {
  console.log("[ProductPage] render:", product);
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        {/* show image (640x480) */}
        <div className="flex flex-col lg:flex-row">
          <div>
            <Image src={product.pictureUrl} width={640} height={480} alt="" />
          </div>
          <div className="flex-1 lg:ml-4">
            <p className="text-sm">{product.description}</p>
            <p className="mt-2 text-lg font-bold">{product.price}</p>
          </div>
        </div>
      </main>
    </>
  );
}
