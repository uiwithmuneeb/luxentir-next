import { prisma } from "@/lib/prisma";
import AdminBannersClient from "@/components/admin/AdminBannersClient";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await prisma.heroBanner.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <AdminBannersClient banners={banners} />;
}