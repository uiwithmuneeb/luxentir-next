import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function CollectionsPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Collections</span>
          <h1>Luxury Collection</h1>
          <p>
            Explore Luxentir’s focused western womenswear categories: Pants,
            Shirts/T-shirts, Blazers & pants premium, casual co-ord sets and
            party wear premium.
          </p>
        </div>
      </section>

      <Categories />

      <section className="section tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Luxury Collection</span>
              <h2>Featured category products</h2>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}