"use client";

import { useWishlist } from "./providers/WishlistProvider";

export default function AddToWishlistButton({
  id,
}: {
  id: number;
}) {
  const { addToWishlist } = useWishlist();

  return (
    <button
      className="btn ghost"
      onClick={() => addToWishlist(id)}
    >
      ♡ Add to Wishlist
    </button>
  );
}