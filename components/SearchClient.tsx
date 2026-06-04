"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function SearchClient() {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchText = `
      ${product.name}
      ${product.category}
      ${product.badge}
    `.toLowerCase();

    return searchText.includes(query.toLowerCase());
  });

  return (
    <main>
      <section className="search-hero">
        <div className="container search-hero-grid">
          <div className="fade-in">
            <span className="eyebrow">Find your look</span>
            <h1 className="serif">Search Luxentir</h1>
            <p>
              Discover pants, shirts, premium blazers, casual co-ords and party
              wear through a clean boutique search experience.
            </p>
          </div>

          <div className="search-panel reveal show">
            <label>Search products</label>

            <div className="search-box-pro">
              <span>🔍</span>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: pants, blazer, party wear, ivory..."
                autoFocus
              />
            </div>

            <div className="search-chips">
              <button onClick={() => setQuery("Pants")}>Pants</button>
              <button onClick={() => setQuery("Shirts")}>Shirts</button>
              <button onClick={() => setQuery("Blazers")}>Blazers</button>
              <button onClick={() => setQuery("co-ord")}>Co-ords</button>
              <button onClick={() => setQuery("party")}>Party wear</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="search-result-head">
            <div>
              <span className="eyebrow">Results</span>
              <h2 className="serif">Curated matches</h2>
            </div>

            <p className="search-status">
              {query
                ? `${filteredProducts.length} result(s) for "${query}"`
                : "Showing all products"}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try another keyword like pants, blazer or party wear.</p>
            </div>
          ) : (
            <div className="product-grid search-grid">
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}