"use client";

import Link from "next/link";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  images?: string[];
  badge: string;
};

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { formatPrice } = useCurrency();
  const { addToWishlist } = useWishlist();

  return (
    <div className="quick-modal-backdrop" onClick={onClose}>
      <div className="quick-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quick-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="quick-modal-grid">
          <div className="quick-modal-image">
            <img src={product.image} alt={product.name} />
            <span className="label">{product.badge}</span>
          </div>

          <div className="quick-modal-info">
            <span className="eyebrow">{product.category}</span>
            <h2>{product.name}</h2>

            <div className="stars">
              ★★★★★ <span style={{ color: "var(--muted)" }}>(24)</span>
            </div>

            <div className="price">
              <span>{formatPrice(product.price)}</span>
              <span className="old">{formatPrice(product.oldPrice)}</span>
            </div>

            <p>
              A refined Luxentir piece designed for elegant western styling,
              premium comfort and a luxury boutique shopping experience.
            </p>

            <div className="quick-modal-actions">
              <Link href={`/product/${product.id}`} className="btn gold">
                View Full Product
              </Link>

              <button
                className="btn ghost"
                onClick={() => addToWishlist(product.id)}
              >
                ♡ Wishlist
              </button>
            </div>

            <p className="quick-modal-note">
              Cash on Delivery only. Size and color selection available on the
              product detail page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}