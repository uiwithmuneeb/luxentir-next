"use client";

import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function WishlistClient({ products }: { products: any[] }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  const validIds = wishlistProducts.map((product) => product.id);
  const invalidIds = wishlist.filter((id) => !validIds.includes(id));

  if (invalidIds.length > 0) {
    invalidIds.forEach((id) => removeFromWishlist(id));
  }

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Saved Styles</span>
          <h1>Your Wishlist</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {wishlistProducts.length === 0 ? (
            <div className="cart-empty-premium">
              <h2>No wishlist items</h2>
              <p>Your saved products will appear here.</p>
            </div>
          ) : (
            <div className="product-grid">
              {wishlistProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />

                  <button
                    className="btn ghost"
                    style={{ marginTop: 12 }}
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}