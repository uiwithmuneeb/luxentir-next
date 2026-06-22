"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function SiteShell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings?: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
      <MobileBottomNav />
    </>
  );
}