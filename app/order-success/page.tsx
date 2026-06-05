"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";

type OrderData = {
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    notes: string;
  };
  total: number;
};

export default function OrderSuccessPage() {
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("luxentir-last-order");

    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  return (
    <main>
      <section className="section">
        <div className="container order-success-wrap">
          <div className="order-success-card">
            <span className="success-icon">✓</span>

            <span className="eyebrow">Order Confirmed</span>

            <h1>Thank you for shopping with Luxentir</h1>

            <p>
              Your Cash on Delivery order has been received successfully. Our
              team will contact you shortly for confirmation.
            </p>

            {order && (
              <div className="order-success-details">
                <div>
                  <span>Order Number</span>
                  <strong>{order.orderNumber}</strong>
                </div>

                <div>
                  <span>Customer</span>
                  <strong>{order.customer.name}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{order.customer.phone}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </div>
            )}

            <div className="order-actions">
              <Link href="/shop" className="btn gold">
                Continue Shopping
              </Link>

              <Link href="/" className="btn ghost">
                Back to Home
              </Link>
            </div>

            <p className="order-note">
              Payment method: Cash on Delivery only. Please keep your phone
              available for order confirmation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}