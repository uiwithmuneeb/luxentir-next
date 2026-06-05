"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import SearchModal from "@/components/SearchModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="top-strip">
        Cash on Delivery Only • Premium women’s western clothing
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
            Luxentir
          </Link>

          <div className="nav-actions">
            <button
              className={`icon-btn hide-sm ${currency === "PKR" ? "active" : ""}`}
              onClick={() => setCurrency("PKR")}
            >
              PKR
            </button>

            <button
              className={`icon-btn hide-sm ${currency === "USD" ? "active" : ""}`}
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

            <Link
              className="icon-btn wishlist-btn"
              href="/wishlist"
            >
              ♡
              {wishlistCount > 0 && (
                <span className="badge is-visible">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              className="icon-btn cart-btn"
              href="/cart"
            >
              🛒
              {cartCount > 0 && (
                <span className="badge is-visible">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link className="account-pill hide-sm" href="/account">
              Sign in
            </Link>
          </div>
        </div>

        <div className={`mobile-menu container ${menuOpen ? "open" : ""}`}>
          <Link href="/search">Search</Link>
          <Link href="/account">Profile</Link>
          <Link href="/signin">Sign in</Link>
          <Link href="/signup">Sign up</Link>
          <Link href="/about">About us</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/exchange-and-returns">Exchange & Returns</Link>
        </div>
      </header>
      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}