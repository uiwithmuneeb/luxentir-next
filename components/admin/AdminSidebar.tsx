import Link from "next/link";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "▦",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: "◇",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: "◎",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: "◌",
  },
  {
    label: "Content",
    href: "/admin/content",
    icon: "✦",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "⚙",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span>Luxentir</span>
        <small>CMS Dashboard</small>
      </div>

      <nav className="admin-nav">
        {adminLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-store-link">
          View Store
        </Link>
      </div>
    </aside>
  );
}