"use client";
import Link from "next/link";
import { useCurrency } from "@/components/providers/CurrencyProvider";

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
  return (
    <article className="product-card reveal show">
      <Link href={`/product/${product.id}`} className="product-media">
        <img src={product.image} alt={product.name} />
        <span className="label">{product.badge}</span>
      </Link>

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
      </div>
    </article>
  );
}