import { prisma } from "@/lib/prisma";
import AdminCustomersClient from "@/components/admin/AdminCustomersClient";

export default async function AdminCustomersPage() {
  let customers: any[] = [];

  try {
    customers = await prisma.customer.findMany({
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("ADMIN CUSTOMERS ERROR:", error);
  }

  return <AdminCustomersClient customers={customers} />;
}