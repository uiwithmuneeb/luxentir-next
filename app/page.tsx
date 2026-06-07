import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import ReelsSection from "@/components/ReelsSection";
import { products } from "@/data/products";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyLuxentir from "@/components/WhyLuxentir";

export default function Home() {
  return (
    <main>
      <Hero />

      <Categories />

      <FeaturedCollection />
      
      <WhyLuxentir />

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
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <ReelsSection />
      
    </main>
  );
}