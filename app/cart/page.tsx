import { prisma } from "@/lib/prisma";
import CartClient from "@/components/CartClient";

export default async function CartPage() {
  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      where: {
        status: "Active",
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("CART PRODUCTS ERROR:", error);
  }

  return <CartClient products={products} />;
}