
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
    label: "Categories",
    href: "/admin/categories",
    icon: "▣",
  },
  {
    label: "Collections",
    href: "/admin/collections",
    icon: "◈",
  },
  {
    label: "Hero Banners",
    href: "/admin/banners",
    icon: "🖼️",
  },
  {
    label: "Reels",
    href: "/admin/reels",
    icon: "🎬",
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
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  };
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

      <button
        onClick={handleLogout}
        className="admin-logout-btn"
      >
        Logout
      </button>
    </div>
    </aside>
  );
}