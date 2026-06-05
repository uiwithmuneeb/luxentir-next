"use client";

import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { products } from "@/data/products";

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

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  const cartProducts: CartProduct[] = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);

      if (!product) return null;

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        badge: product.badge,
        quantity: item.quantity,
        size: item.size || "S",
        color: item.color || "Ivory",
        image: item.image || product.image,
      };
    })
    .filter((item): item is CartProduct => item !== null);

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            <div style={{ textAlign: "center" }}>
              <h2>Cart Empty</h2>
              <p>Add some premium products first.</p>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cartProducts.map((item) => (
                  <div
                    className="cart-item"
                    key={`${item.id}-${item.size}-${item.color}-${item.image}`}
                  >
                    <img src={item.image} alt={item.name} />

                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      <strong>{formatPrice(item.price)}</strong>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>Qty: {item.quantity}</p>

                      <button
                        className="btn ghost"
                        onClick={() =>
                        removeFromCart(item.id, item.size, item.color, item.image)
                      }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <hr />

                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
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

                <p style={{ marginTop: 15, opacity: 0.7, fontSize: 14 }}>
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