export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";

export default async function AdminPage() {
  let totalProducts = 0;
  let totalOrders = 0;
  let pendingOrders = 0;
  let totalCustomers = 0;
  let revenue = 0;
  let recentOrders: any[] = [];

  try {
    totalProducts = await prisma.product.count();

    totalOrders = await prisma.order.count();

    pendingOrders = await prisma.order.count({
      where: {
        status: "Pending",
      },
    });

    totalCustomers = await prisma.customer.count();

    const revenueData = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    revenue = revenueData._sum.total || 0;

    recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
  }

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Dashboard Overview"
          subtitle="Manage products, orders, customers and Luxentir storefront content."
        />

        <AdminStats
          totalProducts={totalProducts}
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          totalCustomers={totalCustomers}
          revenue={revenue}
        />

        <div className="admin-grid">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Recent Orders</h2>
              <span>Latest COD requests</span>
            </div>

            <div className="admin-table">
              {recentOrders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                recentOrders.map((order) => (
                  <div className="admin-table-row" key={order.id}>
                    <strong>{order.orderNumber}</strong>
                    <span>{order.customerName}</span>
                    <span>
                      PKR {order.total.toLocaleString()}
                    </span>
                    <em>{order.status}</em>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Store Summary</h2>
              <span>Current database status</span>
            </div>

            <div className="admin-task-list">
              <p>✓ Products: {totalProducts}</p>
              <p>✓ Orders: {totalOrders}</p>
              <p>✓ Customers: {totalCustomers}</p>
              <p>✓ Pending Orders: {pendingOrders}</p>
              <p>✓ Revenue: PKR {revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}