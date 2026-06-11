"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import QuickViewModal from "@/components/QuickViewModal";

type Product = {
  id: number;
  name: string;
  category:
    | string
    | {
        name: string;
      };
  price: number;
  comparePrice?: number | null;
  oldPrice?: number | null;
  image: string;
  badge?: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();
  const { addToWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const oldPrice = product.oldPrice ?? product.comparePrice ?? product.price;
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

  const discount =
    oldPrice > product.price
      ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
      : 0;


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
        <span className="cat">{categoryName}</span>

        <h3>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="stars">
          ★★★★★ <span style={{ color: "var(--muted)" }}>(24)</span>
        </div>

        <div className="price">
          <span>{formatPrice(product.price)}</span>
          {oldPrice > product.price && (
            <span className="old">{formatPrice(oldPrice)}</span>
          )}
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