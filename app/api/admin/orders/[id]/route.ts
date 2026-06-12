import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/orders");

    return NextResponse.json(order);
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return NextResponse.json(
      { message: "Order status could not be updated" },
      { status: 500 }
    );
  }
}