export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import ReelsSection from "@/components/ReelsSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyLuxentir from "@/components/WhyLuxentir";

export default async function Home() {
  let products: any[] = [];
  let reels: any[] = [];
  let banners: any[] = [];

  try {
    products = await prisma.product.findMany({
      where: {
        status: "Active",
        featured: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    reels = await prisma.reel.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        sortOrder: "asc",
      },
      take: 8,
    });

    banners = await prisma.heroBanner.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  } catch (error) {
    console.error("HOME DATA ERROR:", error);
  }

  return (
    <main>
      <Hero banners={banners} />

      <Categories />

      <FeaturedCollection />

      <section className="section tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Best sellers</span>
              <h2>Customer favorites</h2>
            </div>
            <p>
              Trending products loved for refined fits, soft tones and elegant
              styling.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product as any} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      <WhyLuxentir />

      <ReelsSection reels={reels} />
    </main>
  );
}