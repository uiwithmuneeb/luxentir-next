"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function MobileBottomNav() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <nav className="mobile-bottom-nav">
      <Link href="/">
        <span>⌂</span>
        <small>Home</small>
      </Link>

      <Link href="/wishlist">
        <span>♡</span>
        <small>Wishlist</small>
        {wishlistCount > 0 && <b>{wishlistCount}</b>}
      </Link>

      <Link href="/cart">
        <span>🛒</span>
        <small>Cart</small>
        {cartCount > 0 && <b>{cartCount}</b>}
      </Link>

      <Link href="/shop">
        <span>▦</span>
        <small>Shop</small>
      </Link>

      <Link href="/collections">
        <span>◇</span>
        <small>Collection</small>
      </Link>
    </nav>
  );
}