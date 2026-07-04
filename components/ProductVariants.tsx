"use client";

import { useState } from "react";
import { useCart } from "./providers/CartProvider";

const defaultColors = ["Ivory", "Black", "Gold"];
const defaultSizes = ["XS", "S", "M", "L", "XL"];

function parseArray(value?: string | string[] | null, fallback: string[] = []) {
  if (Array.isArray(value)) return value;

  if (!value) return fallback;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export default function ProductVariants({
  productId,
  name,
  category,
  price,
  image,
  sizes,
  colors,
  stock,
}: {
  productId: number;
  name: string;
  category: string;
  price: number;
  image: string;
  sizes?: string | string[] | null;
  colors?: string | string[] | null;
  stock?: number;
}) {
  const { addToCart } = useCart();

  const availableSizes = parseArray(sizes, defaultSizes);
  const availableColors = parseArray(colors, defaultColors);

  const [size, setSize] = useState(availableSizes[0] || "S");
  const [color, setColor] = useState(availableColors[0] || "Ivory");

  const isOutOfStock = Number(stock || 0) <= 0;

  return (
    <div className="variant-box">
      <div className="variant-head">
        <div>
          <h3>Color</h3>
          <p>{color}</p>
        </div>
      </div>

      <div className="sizes">
        {availableColors.map((item) => (
          <button
            key={item}
            className={`size ${color === item ? "active" : ""}`}
            onClick={() => setColor(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="variant-head size-head">
        <div>
          <h3>Size</h3>
          <p>Selected: {size}</p>
        </div>
      </div>

      <div className="sizes">
        {availableSizes.map((item) => (
          <button
            key={item}
            className={`size ${size === item ? "active" : ""}`}
            onClick={() => setSize(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {isOutOfStock ? (
        <button className="btn ghost add-cart-wide" disabled>
          Out of Stock
        </button>
      ) : (
        <button
          className="btn gold add-cart-wide"
          onClick={() =>
            addToCart({
              id: productId,
              name,
              category,
              price,
              size,
              color,
              image,
            })
          }
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}