import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "Active",
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 12,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("SEARCH API ERROR:", error);
    return NextResponse.json([], { status: 200 });
  }
}