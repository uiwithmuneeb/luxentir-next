"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const quickSearches = [
  "Pants",
  "Shirts",
  "Blazers",
  "Co-ords",
  "Party Wear",
];

export default function SearchClient() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return products;

    return products.filter((product) => {
      const searchText = `
        ${product.name}
        ${product.category}
        ${product.badge}
      `.toLowerCase();

      return searchText.includes(value);
    });
  }, [query]);

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Search Luxentir</span>
          <h1>Find your perfect look</h1>
          <p>
            Search premium pants, shirts, blazers, co-ord sets and party wear
            edits.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="search-panel">
            <label>Search products</label>

            <div className="search-box-pro">
              <span>⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by product, category or style..."
                autoFocus
              />
            </div>

            <div className="search-chips">
              {quickSearches.map((item) => (
                <button key={item} onClick={() => setQuery(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="search-result-head">
            <div>
              <span className="eyebrow">Results</span>
              <h2>Curated matches</h2>
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
              <p>Try searching pants, blazer, co-ord or party wear.</p>

              <button className="btn gold" onClick={() => setQuery("")}>
                Clear Search
              </button>
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