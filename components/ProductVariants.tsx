"use client";

import { useState } from "react";
import { useCart } from "./providers/CartProvider";

const colors = [
  { name: "Ivory", value: "#f5eee4" },
  { name: "Black", value: "#111111" },
  { name: "Gold", value: "#b9935b" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductVariants({
  productId,
  image,
  }: {
    productId: number;
    image: string;
  }) {
  const { addToCart } = useCart();

  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Ivory");

  return (
    <div className="variant-box">
      <div className="variant-head">
        <div>
          <h3>Color</h3>
          <p>{color}</p>
        </div>
      </div>

      <div className="swatches">
        {colors.map((item) => (
          <button
            key={item.name}
            className={`swatch ${color === item.name ? "active" : ""}`}
            style={{ background: item.value }}
            onClick={() => setColor(item.name)}
            aria-label={item.name}
          />
        ))}
      </div>

      <div className="variant-head size-head">
        <div>
          <h3>Size</h3>
          <p>Selected: {size}</p>
        </div>
      </div>

      <div className="sizes">
        {sizes.map((item) => (
          <button
            key={item}
            className={`size ${size === item ? "active" : ""}`}
            onClick={() => setSize(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        className="btn gold add-cart-wide"
        onClick={() => addToCart(productId, size, color, image)}
        >
        Add To Cart
      </button>
    </div>
  );
}