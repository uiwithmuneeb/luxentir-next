import { prisma } from "@/lib/prisma";
import AdminReelsClient from "@/components/admin/AdminReelsClient";

export const dynamic = "force-dynamic";

export default async function AdminReelsPage() {
  const reels = await prisma.reel.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <AdminReelsClient reels={reels} />;
}