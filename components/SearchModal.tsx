"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export default function SearchModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const { formatPrice } = useCurrency();

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return products.slice(0, 4);

    return products.filter((product) => {
      const text = `${product.name} ${product.category} ${product.badge}`.toLowerCase();
      return text.includes(value);
    });
  }, [query]);

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <button className="search-modal-close" onClick={onClose}>
          ×
        </button>

        <span className="eyebrow">Search Luxentir</span>
        <h2>Find your next look</h2>

        <div className="search-modal-input">
          <span>⌕</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pants, shirts, blazers..."
          />
        </div>

        <div className="search-modal-results">
          {results.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try searching for pants, shirts, blazers or party wear.</p>
            </div>
          ) : (
            results.map((product) => (
              <Link
                href={`/product/${product.id}`}
                className="search-modal-item"
                key={product.id}
                onClick={onClose}
              >
                <img src={product.image} alt={product.name} />

                <div>
                  <strong>{product.name}</strong>
                  <p>{product.category}</p>
                </div>

                <span>{formatPrice(product.price)}</span>
              </Link>
            ))
          )}
        </div>

        <Link href="/search" className="btn ghost search-page-link" onClick={onClose}>
          Open Full Search Page
        </Link>
      </div>
    </div>
  );
}