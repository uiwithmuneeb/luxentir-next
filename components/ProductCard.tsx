"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import QuickViewModal from "@/components/QuickViewModal";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();
  const { addToWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <article className="product-card reveal show">
      <div className="product-media">
        <Link href={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <div className="product-badges">
          {discount > 0 && <span className="discount-badge">-{discount}%</span>}
          <span className="label">{product.badge}</span>
        </div>

        <button
          className="product-wishlist"
          onClick={() => addToWishlist(product.id)}
          aria-label="Add to wishlist"
        >
          ♡
        </button>

        <button
          className="quick-view"
          onClick={() => setQuickViewOpen(true)}
        >
          Quick View
        </button>
      </div>

      <div className="product-info">
        <span className="cat">{product.category}</span>

        <h3>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="stars">
          ★★★★★ <span style={{ color: "var(--muted)" }}>(24)</span>
        </div>

        <div className="price">
          <span>{formatPrice(product.price)}</span>
          <span className="old">{formatPrice(product.oldPrice)}</span>
        </div>

        <Link href={`/product/${product.id}`} className="btn ghost product-view-btn">
          View Details
        </Link>
      </div>

      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </article>
  );
}