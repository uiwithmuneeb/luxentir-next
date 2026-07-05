"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function SearchClient({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return products;

    return products.filter((product) => {
      const categoryName =
        typeof product.category === "string"
          ? product.category
          : product.category?.name || "";

      const searchText = `
        ${product.name}
        ${categoryName}
        ${product.badge || ""}
        ${product.description || ""}
      `.toLowerCase();

      return searchText.includes(value);
    });
  }, [query, products]);

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Search Luxentir</span>
          <h1>Find your perfect look</h1>
          <p>
            Search premium western wear by product name, category, style or
            collection.
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setQuery(category.name)}
                >
                  {category.name}
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
              <p>Try searching by product name or category.</p>

              <button className="btn gold" onClick={() => setQuery("")}>
                Clear Search
              </button>
            </div>
          ) : (
            <div className="product-grid search-grid">
              {filteredProducts.map((product) => (
                <ProductCard product={product as any} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}