import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderNumber = String(body.orderNumber || "").trim();
    const phone = String(body.phone || "").trim();

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { message: "Order number and phone number are required." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber,
        phone,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "No order found with these details." },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("TRACK ORDER ERROR:", error);

    return NextResponse.json(
      { message: "Order could not be tracked." },
      { status: 500 }
    );
  }
}