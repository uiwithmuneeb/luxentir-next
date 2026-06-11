"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminCustomersClient({
  customers,
}: {
  customers: any[];
}) {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

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

            {customers.length === 0 ? (
              <div className="admin-empty-state">No customers found yet.</div>
            ) : (
              customers.map((customer) => {
                const totalSpend = customer.orders.reduce(
                  (total: number, order: any) => total + order.total,
                  0
                );

                return (
                  <div className="admin-customers-row" key={customer.id}>
                    <div>
                      <strong>{customer.name}</strong>
                      <p>CUST-{String(customer.id).padStart(3, "0")}</p>
                    </div>

                    <span>{customer.email || "N/A"}</span>
                    <span>{customer.phone}</span>
                    <span>{customer.city || "N/A"}</span>

                    <span>
                      {customer.orders.length} orders • PKR{" "}
                      {totalSpend.toLocaleString()}
                    </span>

                    <span
                      className={`admin-customer-status ${
                        customer.orders.length > 0 ? "active" : "new"
                      }`}
                    >
                      {customer.orders.length > 0 ? "Active" : "New"}
                    </span>

                    <div className="admin-actions">
                      <button onClick={() => setSelectedCustomer(customer)}>
                        View
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {selectedCustomer && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="admin-order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-panel-head">
              <div>
                <h2>{selectedCustomer.name}</h2>
                <span>CUST-{String(selectedCustomer.id).padStart(3, "0")}</span>
              </div>

              <button
                className="admin-secondary-btn"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>
            </div>

            <div className="admin-order-detail-grid">
              <div>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Email:</strong> {selectedCustomer.email || "N/A"}</p>
                <p><strong>City:</strong> {selectedCustomer.city || "N/A"}</p>
                <p><strong>Address:</strong> {selectedCustomer.address || "N/A"}</p>
              </div>

              <div>
                <h3>Customer Summary</h3>
                <p><strong>Total Orders:</strong> {selectedCustomer.orders.length}</p>
                <p>
                  <strong>Total Spend:</strong> PKR{" "}
                  {selectedCustomer.orders
                    .reduce((total: number, order: any) => total + order.total, 0)
                    .toLocaleString()}
                </p>
                <p>
                  <strong>Last Order:</strong>{" "}
                  {selectedCustomer.orders[0]?.orderNumber || "N/A"}
                </p>
              </div>
            </div>

            <div className="admin-order-items">
              <h3>Order History</h3>

              {selectedCustomer.orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                selectedCustomer.orders.map((order: any) => (
                  <div className="admin-order-item" key={order.id}>
                    <div>
                      <strong>{order.orderNumber}</strong>
                      <p>Status: {order.status}</p>
                    </div>

                    <span>PKR {order.total.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}