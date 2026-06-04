"use client";

import { useWishlist } from "@/components/providers/WishlistProvider";
import { products } from "@/data/products";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const wishlistProducts = products.filter(
    (product) => wishlist.includes(product.id)
  );

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">
            Saved Styles
          </span>

          <h1>Your Wishlist</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {wishlistProducts.length === 0 ? (
            <h2>No wishlist items</h2>
          ) : (
            <div className="product-grid">
              {wishlistProducts.map((item) => (
                <div
                  className="product-card"
                  key={item.id}
                >
                  <div className="product-media">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="product-info">
                    <h3>{item.name}</h3>

                    <button
                      className="btn ghost"
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}