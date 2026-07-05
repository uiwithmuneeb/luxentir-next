import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, items, total, shippingCharge } = body;

    const orderNumber = `LX-${Date.now().toString().slice(-6)}`;

    let existingCustomer = await prisma.customer.findUnique({
      where: {
        phone: customer.phone,
      },
    });

    if (!existingCustomer) {
      existingCustomer = await prisma.customer.create({
        data: {
          name: customer.name,
          email: customer.email || null,
          phone: customer.phone,
          city: customer.city,
          address: customer.address,
          country: customer.country || "Pakistan",
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: existingCustomer.id,
        customerName: customer.name,
        phone: customer.phone,
        email: customer.email || null,
        city: customer.city,
        address: customer.address,
        country: customer.country || "Pakistan",
        notes: customer.notes || null,
        total: Number(total || 0),
        shippingCharge: Number(shippingCharge || 0),
        payment: "COD",
        status: "Pending",

        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity),
            size: item.size,
            color: item.color,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        message: "Order could not be created",
      },
      {
        status: 500,
      }
    );
  }
}