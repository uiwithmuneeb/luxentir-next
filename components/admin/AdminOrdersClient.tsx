"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const statuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersClient({ orders }: { orders: any[] }) {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const updateStatus = async (orderId: number, status: string) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    router.refresh();
  };

  const printOrder = (order: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = order.items
      .map(
        (item: any) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.size || "N/A"}</td>
            <td>${item.color || "N/A"}</td>
            <td>${item.quantity}</td>
            <td>PKR ${(item.price * item.quantity).toLocaleString()}</td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Order ${order.orderNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 32px;
              color: #111;
            }

            .invoice-head {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #111;
              padding-bottom: 18px;
              margin-bottom: 24px;
            }

            h1 {
              margin: 0;
              letter-spacing: 4px;
            }

            h2 {
              margin-top: 28px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 8px;
            }

            p {
              margin: 6px 0;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 14px;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }

            th {
              background: #f5f1ea;
            }

            .total {
              text-align: right;
              margin-top: 24px;
              font-size: 20px;
              font-weight: bold;
            }

            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>

        <body>
          <div class="invoice-head">
            <div>
              <h1>LUXENTIR</h1>
              <p>Premium Women's Western Clothing</p>
            </div>

            <div>
              <p><strong>Order:</strong> ${order.orderNumber}</p>
              <p><strong>Status:</strong> ${order.status}</p>
              <p><strong>Payment:</strong> ${order.payment}</p>
            </div>
          </div>

          <h2>Customer Details</h2>
          <p><strong>Name:</strong> ${order.customerName}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Email:</strong> ${order.email || "N/A"}</p>
          <p><strong>City:</strong> ${order.city}</p>
          <p><strong>Address:</strong> ${order.address}</p>
          <p><strong>Notes:</strong> ${order.notes || "N/A"}</p>

          <h2>Order Items</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <p class="total">Total: PKR ${order.total.toLocaleString()}</p>

          <div class="footer">
            Thank you for shopping with Luxentir.
          </div>

          <script>
            window.print();
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Order Management"
          subtitle="View, confirm and manage Cash on Delivery orders."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Orders</h2>
              <span>Track customer orders and delivery status</span>
            </div>

            <button
              className="admin-primary-btn"
              onClick={() => {
                window.location.href = "/api/admin/orders/export";
              }}
            >
              Export Orders
            </button>
          </div>

          <div className="admin-orders-table">
            <div className="admin-orders-head">
              <span>Order</span>
              <span>Customer</span>
              <span>Phone</span>
              <span>Items</span>
              <span>Total</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {orders.length === 0 ? (
              <div className="admin-empty-state">No orders found yet.</div>
            ) : (
              orders.map((order) => (
                <div className="admin-orders-row" key={order.id}>
                  <strong>{order.orderNumber}</strong>
                  <span>{order.customerName}</span>
                  <span>{order.phone}</span>
                  <span>{order.items.length} items</span>
                  <span>PKR {order.total.toLocaleString()}</span>

                  <select
                    className={`admin-order-status ${order.status.toLowerCase()}`}
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option value={status} key={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <div className="admin-actions">
                    <button onClick={() => setSelectedOrder(order)}>
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {selectedOrder && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="admin-order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-panel-head">
              <div>
                <h2>Order {selectedOrder.orderNumber}</h2>
                <span>{selectedOrder.status}</span>
              </div>

              <div className="admin-actions">
                <button
                  className="admin-secondary-btn"
                  onClick={() => printOrder(selectedOrder)}
                >
                  Print
                </button>

                <button
                  className="admin-secondary-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="admin-order-detail-grid">
              <div>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Email:</strong> {selectedOrder.email || "N/A"}</p>
                <p><strong>City:</strong> {selectedOrder.city}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
                <p><strong>Notes:</strong> {selectedOrder.notes || "N/A"}</p>
              </div>

              <div>
                <h3>Payment</h3>
                <p><strong>Method:</strong> {selectedOrder.payment}</p>
                <p>
                  <strong>Total:</strong> PKR{" "}
                  {selectedOrder.total.toLocaleString()}
                </p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
              </div>
            </div>

            <div className="admin-order-items">
              <h3>Order Items</h3>

              {selectedOrder.items.map((item: any) => (
                <div className="admin-order-item" key={item.id}>
                  {item.image && <img src={item.image} alt={item.name} />}

                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      Size: {item.size || "N/A"} / Color:{" "}
                      {item.color || "N/A"}
                    </p>
                    <p>Qty: {item.quantity}</p>
                  </div>

                  <span>
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}