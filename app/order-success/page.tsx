"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";

type OrderItem = {
  name: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
  price: number;
};

type OrderData = {
  orderNumber: string;

  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
    address?: string;
    notes?: string;
  };

  customerName?: string;
  phone?: string;
  email?: string | null;
  city?: string;
  address?: string;
  notes?: string | null;

  items: OrderItem[];
  total: number;
};

export default function OrderSuccessPage() {
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<OrderData | null>(null);

  const whatsappNumber = "923395211000";

  useEffect(() => {
    const saved = localStorage.getItem("luxentir-last-order");

    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  const customerName = order?.customerName || order?.customer?.name || "";
  const phone = order?.phone || order?.customer?.phone || "";
  const email = order?.email || order?.customer?.email || "";
  const city = order?.city || order?.customer?.city || "";
  const address = order?.address || order?.customer?.address || "";
  const notes = order?.notes || order?.customer?.notes || "";

  const createWhatsAppLink = () => {
    if (!order) return "#";

    const itemsText = order.items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
Size: ${item.size || "N/A"}
Color: ${item.color || "N/A"}
Qty: ${item.quantity}
Price: ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n\n");

    const message = `Hello Luxentir,

I want to confirm my Cash on Delivery order.

Order Number: ${order.orderNumber}

Customer Details:
Name: ${customerName}
Phone: ${phone}
Email: ${email || "N/A"}
City: ${city}
Address: ${address}
Notes: ${notes || "N/A"}

Order Items:
${itemsText}

Total: ${formatPrice(order.total)}

Payment Method: Cash on Delivery`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

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
                  <strong>{customerName}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{phone}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </div>
              
            )}

            {order && order.items.length > 0 && (
              <div className="order-products">
                <h3>Purchased Items ({order.items.length})</h3>

                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="order-product-row"
                  >
                    <div>
                      <strong>{item.name}</strong>

                      <p>
                        {item.size} / {item.color}
                      </p>

                      <p>
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <strong>
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>
            )}

            <div className="order-actions">
              {order && (
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn gold"
                >
                  Send Order on WhatsApp
                </a>
              )}

              <Link href="/shop" className="btn ghost">
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