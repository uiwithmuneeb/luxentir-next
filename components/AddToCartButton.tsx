"use client";

import { useCart } from "./providers/CartProvider";

export default function AddToCartButton({
  id,
  size = "S",
  color = "Ivory",
}: {
  id: number;
  size?: string;
  color?: string;
}) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn gold"
      onClick={() => addToCart(id, size, color)}
    >
      Add to Cart
    </button>
  );
}