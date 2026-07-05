"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import Lottie from "lottie-react";
import trackingAnimation from "@/public/lottie/order-tracking.json";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  color?: string | null;
  image?: string | null;
};

type Order = {
  id: number;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string | null;
  city: string;
  address: string;
  notes?: string | null;
  country: string;
  shippingCharge: number;
  total: number;
  payment: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

const steps = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

export default function TrackOrderPage() {
  const { formatPrice } = useCurrency();

  const [form, setForm] = useState({
    orderNumber: "",
    phone: "",
  });

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const activeStep = Math.max(0, steps.indexOf(order?.status || "Pending"));
  const shippingCharge = Number(order?.shippingCharge || 0);
  const subtotal = Number(order?.total || 0) - shippingCharge;

  const trackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setOrder(null);

    const res = await fetch("/api/track-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setMessage(data.message || "Order not found.");
      return;
    }

    setOrder(data);
  };

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Order Tracking</span>
          <h1>Track your Luxentir order</h1>
          <p>
            Enter your order number and phone number to view your order status,
            items and delivery details.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container track-order-layout">
          <div className="track-order-card">
            <span className="eyebrow">Find your order</span>
            <h2>Order details</h2>

            <form onSubmit={trackOrder} className="track-order-form">
              <input
                className="field"
                placeholder="Order Number e.g. LX-123456"
                value={form.orderNumber}
                onChange={(e) =>
                  setForm({ ...form, orderNumber: e.target.value })
                }
                required
              />

              <input
                className="field"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <button
                className={`btn gold track-order-submit ${loading ? "is-loading" : ""}`}
                type="submit"
                disabled={loading}
              >
                <span>{loading ? "Tracking..." : "Track Order"}</span>
              </button>
            </form>

            {message && <p className="track-error">{message}</p>}

            <p className="track-help">
              You can find your order number on the order success page or
              WhatsApp confirmation message.
            </p>
          </div>
          
          {!order && (
          <div className="tracking-empty-state">
            <h2>Track your Luxentir order instantly</h2>
            <div className="tracking-animation">
              <Lottie
                animationData={trackingAnimation}
                loop
                autoplay
              />
            </div>
          </div>
        )}
          {order && (
            <div className="track-result">
              <div className="track-summary-head">
                <div>
                  <span className="eyebrow">Order Found</span>
                  <h2>{order.orderNumber}</h2>
                  <p>
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span className={`track-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-timeline">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className={`timeline-step ${
                      index <= activeStep ? "done" : ""
                    }`}
                  >
                    <span>{index <= activeStep ? "✓" : index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <div className="track-info-grid">
                <div>
                  <span>Customer</span>
                  <strong>{order.customerName}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{order.phone}</strong>
                </div>

                <div>
                  <span>City</span>
                  <strong>{order.city}</strong>
                </div>

                <div>
                  <span>Country</span>
                  <strong>{order.country || "Pakistan"}</strong>
                </div>

                <div>
                  <span>Payment</span>
                  <strong>{order.payment}</strong>
                </div>
              </div>

              <div className="track-address">
                <span>Delivery Address</span>
                <p>{order.address}</p>
              </div>

              <div className="track-items">
                <h3>Order Summary</h3>

                {order.items.map((item) => (
                  <div className="track-item" key={item.id}>
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                    />

                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        Size: {item.size || "N/A"} • Color:{" "}
                        {item.color || "N/A"} • Qty: {item.quantity}
                      </p>
                    </div>

                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="track-price-summary">
                <div className="track-price-row">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <div className="track-price-row">
                  <span>Shipping ({order.country || "Pakistan"})</span>
                  <strong>{formatPrice(shippingCharge)}</strong>
                </div>

                <div className="track-price-row grand">
                  <span>Total Amount</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </div>

              <div className="track-actions">
                <Link href="/shop" className="btn ghost">
                  Continue Shopping
                </Link>

                <a
                  href={`https://wa.me/923395211000?text=${encodeURIComponent(
                    `Hello Luxentir, I need help with my order ${order.orderNumber}`
                  )}`}
                  target="_blank"
                  className="btn gold"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}