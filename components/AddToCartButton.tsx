"use client";

import { useCart } from "./providers/CartProvider";

export default function AddToCartButton({
  id,
  name,
  category,
  price,
  size = "S",
  color = "Ivory",
  image,
}: {
  id: number;
  name: string;
  category: string;
  price: number;
  size?: string;
  color?: string;
  image: string;
}) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn gold"
      onClick={() =>
        addToCart({
          id,
          name,
          category,
          price,
          size,
          color,
          image,
        })
      }
    >
      Add to Cart
    </button>
  );
}