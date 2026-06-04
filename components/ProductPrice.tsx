"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";

export default function ProductPrice({
  price,
  oldPrice,
}: {
  price: number;
  oldPrice: number;
}) {
  const { formatPrice } = useCurrency();

  return (
    <div className="price" style={{ fontSize: 24 }}>
      <span>{formatPrice(price)}</span>
      <span className="old">{formatPrice(oldPrice)}</span>
    </div>
  );
}