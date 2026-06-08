const stats = [
  {
    label: "Total Products",
    value: "24",
    note: "Demo products",
  },
  {
    label: "Total Orders",
    value: "128",
    note: "COD orders",
  },
  {
    label: "Pending Orders",
    value: "12",
    note: "Needs confirmation",
  },
  {
    label: "Revenue",
    value: "PKR 485K",
    note: "Demo revenue",
  },
];

export default function AdminStats() {
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