"use client";

import { useCart } from "@/components/providers/CartProvider";
import { products } from "@/data/products";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  const cartProducts = cart.map((item) => {
    const product = products.find(
      (p) => p.id === item.id
    );

    return {
      ...product!,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    };
  })
  .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">
            Shopping Bag
          </span>

          <h1>Your Cart</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {cartProducts.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <h2>Cart Empty</h2>
              <p>
                Add some premium products first.
              </p>
            </div>
          ) : (
            <div className="cart-layout">
              {/* LEFT */}

              <div className="cart-items">
                {cartProducts.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-info">
                      <h3>{item.name}</h3>

                      <p>{item.category}</p>

                      <strong>
                        {formatPrice(item.price)}
                      </strong>

                      <p>
                        Size: {item.size}
                      </p>

                      <p>
                        Color: {item.color}
                      </p>

                      <p>
                        Qty: {item.quantity}
                      </p>

                      <button
                        className="btn ghost"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT */}

              <div className="cart-summary">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>

                  <span>
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>

                  <span>Free</span>
                </div>

                <hr />

                <div className="summary-row total">
                  <span>Total</span>

                  <span>
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <a
                  href="/checkout"
                  className="btn gold"
                  style={{
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  Proceed To Checkout
                </a>

                <p
                  style={{
                    marginTop: 15,
                    opacity: 0.7,
                    fontSize: 14,
                  }}
                >
                  Cash On Delivery Only
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}