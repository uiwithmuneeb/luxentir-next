import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import ProductDetailClient from "@/components/ProductDetailClient";
import RecentlyViewed from "@/components/RecentlyViewed";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });

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

  const relatedProducts = await prisma.product.findMany({
    where: {
      id: {
        not: product.id,
      },
      status: "Active",
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

 let galleryImages: string[] = [];

  try {
    galleryImages = product.gallery
      ? JSON.parse(product.gallery)
      : [];
  } catch {
    galleryImages = product.gallery
      ? product.gallery
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
  }

  const productImages: string[] = [
    product.image,
    ...galleryImages,
  ].filter(Boolean);

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
          product={product as any}
          images={productImages}
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
            {relatedProducts.map((item) => (
              <ProductCard product={item as any} key={item.id} />
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed currentProductId={product.id} />
    </main>
  );
}