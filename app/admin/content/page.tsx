export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminContentClient from "@/components/admin/AdminContentClient";

export default async function AdminContentPage() {
  let sections: any[] = [];

  try {
    sections = await prisma.homepageSection.findMany({
      orderBy: {
        id: "asc",
      },
    });
  } catch (error) {
    console.error("ADMIN CONTENT ERROR:", error);
  }

  return <AdminContentClient sections={sections} />;
}