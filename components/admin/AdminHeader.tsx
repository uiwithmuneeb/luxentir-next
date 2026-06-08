export default function AdminHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="admin-header">
      <div>
        <span className="eyebrow">Luxentir Admin</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="admin-user">
        <span>Admin</span>
        <strong>LH</strong>
      </div>
    </div>
  );
}