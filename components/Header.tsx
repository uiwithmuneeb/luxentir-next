"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import SearchModal from "@/components/SearchModal";

type HeaderProps = {
  settings?: {
    storeName?: string;
    announcementBar?: string;
    defaultCurrency?: string;
  };
};

export default function Header({ settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="top-strip">
        {settings?.announcementBar ||
          "Cash on Delivery Only • Premium women’s western clothing"}
      </div>

      <header className="navbar">
        <div className="container nav-inner">
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            ☰
          </button>

          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/collections">Collections</Link>
          </nav>

          <Link className="brand" href="/">
            {settings?.storeName || "Luxentir"}
          </Link>

          <div className="nav-actions">
            <button
              className={`icon-btn hide-sm ${
                currency === "PKR" ? "active" : ""
              }`}
              onClick={() => setCurrency("PKR")}
            >
              PKR
            </button>

            <button
              className={`icon-btn hide-sm ${
                currency === "USD" ? "active" : ""
              }`}
              onClick={() => setCurrency("USD")}
            >
              $
            </button>

            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? "☀" : "☾"}
            </button>

            <button
              className="icon-btn search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              🔍
            </button>

            <Link className="icon-btn wishlist-btn" href="/wishlist">
              ♡
              {wishlistCount > 0 && (
                <span className="badge is-visible">{wishlistCount}</span>
              )}
            </Link>

            <Link className="icon-btn cart-btn" href="/cart">
              🛒
              {cartCount > 0 && (
                <span className="badge is-visible">{cartCount}</span>
              )}
            </Link>

            <Link className="account-pill hide-sm" href="/account">
              Sign in
            </Link>
          </div>
        </div>

        <div className={`mobile-menu container ${menuOpen ? "open" : ""}`}>
          <Link href="/search" onClick={() => setMenuOpen(false)}>
            Search
          </Link>
          <Link href="/account" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
          <Link href="/signin" onClick={() => setMenuOpen(false)}>
            Sign in
          </Link>
          <Link href="/signup" onClick={() => setMenuOpen(false)}>
            Sign up
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About us
          </Link>
          <Link href="/privacy-policy" onClick={() => setMenuOpen(false)}>
            Privacy Policy
          </Link>
          <Link href="/terms" onClick={() => setMenuOpen(false)}>
            Terms & Conditions
          </Link>
          <Link href="/exchange-and-returns" onClick={() => setMenuOpen(false)}>
            Exchange & Returns
          </Link>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}