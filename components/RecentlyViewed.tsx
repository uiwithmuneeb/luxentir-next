"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function RecentlyViewed({
  currentProductId,
}: {
  currentProductId: number;
}) {
  const [items, setItems] = useState<typeof products>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("luxentir-recent") || "[]"
    );

    const viewedProducts = saved
      .filter((id: number) => id !== currentProductId)
      .map((id: number) =>
        products.find((p) => p.id === id)
      )
      .filter(Boolean)
      .slice(0, 4);

    setItems(viewedProducts as typeof products);
  }, [currentProductId]);

  if (items.length === 0) return null;

  return (
    <section className="section tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Recently viewed</span>
            <h2>Continue shopping</h2>
          </div>
        </div>

        <div className="product-grid">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}