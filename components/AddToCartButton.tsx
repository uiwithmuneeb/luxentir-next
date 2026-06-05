"use client";

import { useCart } from "./providers/CartProvider";

export default function AddToCartButton({
  id,
  size = "S",
  color = "Ivory",
  image,
}: {
  id: number;
  size?: string;
  color?: string;
  image: string;
}) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn gold"
      onClick={() => addToCart(id, size, color, image)}
    >
      Add to Cart
    </button>
  );
}