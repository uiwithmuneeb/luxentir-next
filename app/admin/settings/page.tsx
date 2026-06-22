export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminSettingsClient from "@/components/admin/AdminSettingsClient";

export default async function AdminSettingsPage() {
  let settings: Record<string, any> = {};

  try {
    const rows = await prisma.storeSetting.findMany();

    settings = rows.reduce((acc: Record<string, any>, item) => {
      try {
        acc[item.key] = JSON.parse(item.value);
      } catch {
        acc[item.key] = item.value;
      }

      return acc;
    }, {});
  } catch (error) {
    console.error("ADMIN SETTINGS ERROR:", error);
  }

  return <AdminSettingsClient settings={settings} />;
}