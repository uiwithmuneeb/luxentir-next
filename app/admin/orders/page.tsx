import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const orders = [
  {
    id: "LX-104221",
    customer: "Sarah Khan",
    phone: "0300 1234567",
    items: "2 items",
    total: "PKR 32,804",
    payment: "COD",
    status: "Pending",
    date: "08 Jun 2026",
  },
  {
    id: "LX-104198",
    customer: "Ayesha Malik",
    phone: "0312 9876543",
    items: "1 item",
    total: "PKR 55,044",
    payment: "COD",
    status: "Confirmed",
    date: "07 Jun 2026",
  },
  {
    id: "LX-104166",
    customer: "Maham Ali",
    phone: "0333 4455667",
    items: "3 items",
    total: "PKR 20,016",
    payment: "COD",
    status: "Delivered",
    date: "06 Jun 2026",
  },
];

export default function AdminOrdersPage() {
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

            <button className="admin-primary-btn">Export Orders</button>
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

            {orders.map((order) => (
              <div className="admin-orders-row" key={order.id}>
                <strong>{order.id}</strong>

                <span>{order.customer}</span>

                <span>{order.phone}</span>

                <span>{order.items}</span>

                <span>{order.total}</span>

                <span
                  className={`admin-order-status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

                <div className="admin-actions">
                  <button>View</button>
                  <button>Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}