"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";

type ProductPriceProps = {
  price: number;
  oldPrice?: number | null;
};

export default function ProductPrice({
  price,
  oldPrice,
}: ProductPriceProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="price" style={{ fontSize: 24 }}>
      <span>{formatPrice(price)}</span>

      {oldPrice && oldPrice > price && (
        <span className="old">
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  );
}