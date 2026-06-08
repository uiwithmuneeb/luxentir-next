import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const customers = [
  {
    id: "CUST-001",
    name: "Sarah Khan",
    email: "sarah@example.com",
    phone: "0300 1234567",
    city: "Karachi",
    orders: 4,
    lastOrder: "LX-104221",
    status: "Active",
  },
  {
    id: "CUST-002",
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    phone: "0312 9876543",
    city: "Lahore",
    orders: 2,
    lastOrder: "LX-104198",
    status: "Active",
  },
  {
    id: "CUST-003",
    name: "Maham Ali",
    email: "maham@example.com",
    phone: "0333 4455667",
    city: "Islamabad",
    orders: 1,
    lastOrder: "LX-104166",
    status: "New",
  },
];

export default function AdminCustomersPage() {
  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Customer Management"
          subtitle="View customer profiles, contact details and order history."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Customers</h2>
              <span>Manage customer records and purchase activity</span>
            </div>

            <button className="admin-primary-btn">Export Customers</button>
          </div>

          <div className="admin-customers-table">
            <div className="admin-customers-head">
              <span>Customer</span>
              <span>Email</span>
              <span>Phone</span>
              <span>City</span>
              <span>Orders</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {customers.map((customer) => (
              <div className="admin-customers-row" key={customer.id}>
                <div>
                  <strong>{customer.name}</strong>
                  <p>{customer.id}</p>
                </div>

                <span>{customer.email}</span>
                <span>{customer.phone}</span>
                <span>{customer.city}</span>
                <span>{customer.orders}</span>

                <span
                  className={`admin-customer-status ${customer.status.toLowerCase()}`}
                >
                  {customer.status}
                </span>

                <div className="admin-actions">
                  <button>View</button>
                  <button>Orders</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}