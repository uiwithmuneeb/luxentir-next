export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      products: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (!collection || collection.status !== "Active") {
    notFound();
  }

  const products = collection.products
    .map((item) => item.product)
    .filter((product) => product.status === "Active");

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Collection</span>
          <h1>{collection.name}</h1>
          <p>
            {collection.description ||
              "Explore selected Luxentir pieces curated for modern elegance and timeless style."}
          </p>

          <div className="collection-meta">
            <span>{products.length} products</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <div className="empty-state">
              <h2>No products added yet</h2>
              <p>
                This collection is being curated. Explore our latest arrivals
                while we update this edit.
              </p>

              <Link href="/shop" className="btn gold">
                Shop All Products
              </Link>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard product={product as any} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}