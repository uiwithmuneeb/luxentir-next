export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminCollectionsClient from "@/components/admin/AdminCollectionsClient";

export default async function AdminCollectionsPage() {
  let collections: any[] = [];

  try {
    collections = await prisma.collection.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });
  } catch (error) {
    console.error("ADMIN COLLECTIONS ERROR:", error);
  }

  return <AdminCollectionsClient collections={collections} />;
}