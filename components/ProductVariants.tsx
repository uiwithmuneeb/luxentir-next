"use client";

import { useState } from "react";
import { useCart } from "./providers/CartProvider";

export default function ProductVariants({
  productId,
}: {
  productId: number;
}) {
  const { addToCart } = useCart();

  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Ivory");

  return (
    <>
      <h3>Color</h3>

      <div className="sizes">
        {["Ivory", "Black", "Gold"].map((item) => (
          <button
            key={item}
            className={`size ${
              color === item ? "active" : ""
            }`}
            onClick={() => setColor(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: 25 }}>
        Size
      </h3>

      <div className="sizes">
        {["XS", "S", "M", "L", "XL"].map(
          (item) => (
            <button
              key={item}
              className={`size ${
                size === item ? "active" : ""
              }`}
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div
        className="detail-actions"
        style={{ marginTop: 25 }}
      >
        <button
          className="btn gold"
          onClick={() =>
            addToCart(
              productId,
              size,
              color
            )
          }
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}