"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  });

  const [cartProducts, setCartProducts] = useState<any[]>([]);

  useEffect(() => {
    const selected = localStorage.getItem("luxentir-selected-cart");

    if (selected) {
      setCartProducts(JSON.parse(selected));
    }
  }, []);

  const subtotal = cartProducts.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items: cartProducts,
          total: subtotal,
        }),
      });

      const order = await response.json();

      localStorage.setItem(
        "luxentir-last-order",
        JSON.stringify(order)
      );

      clearCart();

      router.push("/order-success");
    } catch (error) {
      console.error("ORDER ERROR:", error);
      alert("Order could not be placed.");
    }
  };

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Checkout</span>
          <h1>Complete your order</h1>
          <p>Cash on Delivery only. Our team will confirm your order shortly.</p>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-layout">
          <form className="checkout-card" onSubmit={handleSubmit}>
            <span className="eyebrow">Delivery details</span>
            <h2>Customer information</h2>

            <div className="checkout-fields">
              <input
                className="field"
                placeholder="Full name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="field"
                placeholder="Phone number"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="field"
                placeholder="Email address (optional)"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="field"
                placeholder="City"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <textarea
                className="field checkout-textarea"
                placeholder="Complete delivery address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <textarea
                className="field checkout-textarea"
                placeholder="Order notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="checkout-trust">
              <span>✓ Cash on Delivery</span>
              <span>✓ Premium Packaging</span>
              <span>✓ Easy Exchange</span>
            </div>

            <button className="btn gold checkout-submit" type="submit">
              Place Order
            </button>
          </form>

          <aside className="checkout-summary">
            <span className="eyebrow">Order summary</span>
            <h2>Your pieces</h2>

            {cartProducts.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="checkout-items">
                {cartProducts.map((item) => (
                  <div
                    className="checkout-item"
                    key={`${item.id}-${item.size}-${item.color}-${item.image}`}
                  >
                    <img src={item.image} alt={item.name} />

                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                    </div>

                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>Free</strong>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="checkout-note">
              Payment method: Cash on Delivery only.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}