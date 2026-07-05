type Props = {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  revenue: number;
};

export default function AdminStats({
  totalProducts,
  totalOrders,
  pendingOrders,
  revenue,
}: Props) {
  const stats = [
    {
      label: "Products",
      value: totalProducts.toLocaleString(),
      note: "Total catalog",
    },
    {
      label: "Orders",
      value: totalOrders.toLocaleString(),
      note: "All COD orders",
    },
    {
      label: "Pending Orders",
      value: pendingOrders.toLocaleString(),
      note: "Need confirmation",
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