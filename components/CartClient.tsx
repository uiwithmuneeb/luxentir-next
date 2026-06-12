"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

type CartProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
  quantity: number;
  size: string;
  color: string;
};

export default function CartClient({ products }: { products: any[] }) {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  const cartProducts: CartProduct[] = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;

      return {
        id: product.id,
        name: product.name,
        category: product.category?.name || "No Category",
        price: product.price,
        oldPrice: product.comparePrice || 0,
        badge: product.badge || "NEW",
        quantity: item.quantity,
        size: item.size || "S",
        color: item.color || "Ivory",
        image: item.image || product.image,
      };
    })
    .filter((item): item is CartProduct => item !== null);

  const itemKeys = cartProducts.map(
    (item) => `${item.id}-${item.size}-${item.color}-${item.image}`
  );

  const [selectedItems, setSelectedItems] = useState<string[]>(itemKeys);

  const selectedProducts = cartProducts.filter((item) =>
    selectedItems.includes(`${item.id}-${item.size}-${item.color}-${item.image}`)
  );

  const subtotal = selectedProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const allSelected =
    cartProducts.length > 0 && selectedItems.length === cartProducts.length;

  const toggleSelectAll = () => {
    setSelectedItems(allSelected ? [] : itemKeys);
  };

  const toggleItem = (key: string) => {
    setSelectedItems((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  const proceedToCheckout = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }

    localStorage.setItem(
      "luxentir-selected-cart",
      JSON.stringify(selectedProducts)
    );

    router.push("/checkout");
  };

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Shopping Bag</span>
          <h1>Your Cart</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {cartProducts.length === 0 ? (
            <div className="cart-empty-premium">
              <h2>Cart Empty</h2>
              <p>Add some premium products first.</p>
            </div>
          ) : (
            <div className="cart-premium-layout">
              <div>
                <div className="cart-select-bar">
                  <label>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                    />
                    Select all items
                  </label>

                  <span>
                    {selectedProducts.length} of {cartProducts.length} selected
                  </span>
                </div>

                <div className="cart-premium-grid">
                  {cartProducts.map((item) => {
                    const key = `${item.id}-${item.size}-${item.color}-${item.image}`;
                    const selected = selectedItems.includes(key);

                    return (
                      <div
                        className={`cart-premium-card ${
                          selected ? "selected" : ""
                        }`}
                        key={key}
                      >
                        <label className="cart-item-check">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleItem(key)}
                          />
                        </label>

                        <img src={item.image} alt={item.name} />

                        <div className="cart-premium-info">
                          <span className="cart-badge">{item.badge}</span>
                          <h3>{item.name}</h3>
                          <p>{item.category}</p>

                          <div className="cart-meta">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>

                          <div className="cart-price-row">
                            <strong>
                              {formatPrice(item.price * item.quantity)}
                            </strong>

                            {item.oldPrice > 0 && (
                              <del>{formatPrice(item.oldPrice)}</del>
                            )}
                          </div>

                          <button
                            className="cart-remove-btn"
                            onClick={() => {
                              removeFromCart(
                                item.id,
                                item.size,
                                item.color,
                                item.image
                              );

                              setSelectedItems((prev) =>
                                prev.filter((value) => value !== key)
                              );
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="cart-premium-summary">
                <span className="eyebrow">Order Summary</span>
                <h3>Selected Items</h3>

                <div className="summary-row">
                  <span>Items</span>
                  <strong>{selectedProducts.length}</strong>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <strong>Free</strong>
                </div>

                <hr />

                <div className="summary-row total">
                  <span>Total</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <button
                  className="btn gold"
                  style={{
                    width: "100%",
                    marginTop: 20,
                  }}
                  onClick={proceedToCheckout}
                >
                  Proceed To Checkout
                </button>

                <p className="cart-summary-note">
                  Cash on Delivery only. You can choose selected items before
                  checkout.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}