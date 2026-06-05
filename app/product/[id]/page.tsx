import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import ProductDetailClient from "@/components/ProductDetailClient";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main>
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow">Product not found</span>
            <h1>Product not found</h1>
            <p>This product is not available.</p>
            <br />
            <Link className="btn gold" href="/shop">
              Back to shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Product detail</span>
          <h1>{product.name}</h1>
          <p>
            A refined Luxentir statement piece with product variants, image
            gallery, size guide and Cash on Delivery messaging.
          </p>
        </div>
      </section>

      <section className="section">
        <ProductDetailClient
          product={product}
          images={
            product.images || [
              product.image,
              product.image,
              product.image,
              product.image,
            ]
          }
        />
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Complete the look</span>
              <h2>Related products</h2>
            </div>
            <Link className="btn ghost" href="/shop">
              View all
            </Link>
          </div>

          <div className="product-grid">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}