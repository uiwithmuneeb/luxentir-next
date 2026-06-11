export default function AdminStats({
  totalProducts,
  totalOrders,
  pendingOrders,
  totalCustomers,
  revenue,
}: {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  revenue: number;
}) {
  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toLocaleString(),
      note: "Store products",
    },
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString(),
      note: "COD orders",
    },
    {
      label: "Pending Orders",
      value: pendingOrders.toLocaleString(),
      note: "Needs confirmation",
    },
    {
      label: "Total Customers",
      value: totalCustomers.toLocaleString(),
      note: "Registered buyers",
    },
    {
      label: "Revenue",
      value: `PKR ${revenue.toLocaleString()}`,
      note: "Total sales",
    },
  ];

  return (
    <div className="admin-stats">
      {stats.map((item) => (
        <div className="admin-stat-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.note}</p>
        </div>
      ))}
    </div>
  );
}