import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";

const recentOrders = [
  {
    id: "LX-104221",
    customer: "Sarah Khan",
    total: "PKR 32,804",
    status: "Pending",
  },
  {
    id: "LX-104198",
    customer: "Ayesha Malik",
    total: "PKR 55,044",
    status: "Confirmed",
  },
  {
    id: "LX-104166",
    customer: "Maham Ali",
    total: "PKR 20,016",
    status: "Delivered",
  },
];

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Dashboard Overview"
          subtitle="Manage products, orders, customers and Luxentir storefront content."
        />

        <AdminStats />

        <div className="admin-grid">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Recent Orders</h2>
              <span>Latest COD requests</span>
            </div>

            <div className="admin-table">
              {recentOrders.map((order) => (
                <div className="admin-table-row" key={order.id}>
                  <strong>{order.id}</strong>
                  <span>{order.customer}</span>
                  <span>{order.total}</span>
                  <em>{order.status}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>CMS Controls</h2>
              <span>Upcoming editable sections</span>
            </div>

            <div className="admin-task-list">
              <p>✓ Product management</p>
              <p>✓ Order management</p>
              <p>✓ Homepage banner control</p>
              <p>✓ Reels and content updates</p>
              <p>✓ WhatsApp and store settings</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}