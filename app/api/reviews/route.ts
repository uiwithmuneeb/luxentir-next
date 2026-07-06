import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: {
      productId: Number(productId),
      status: "Approved",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { productId, customerName, rating, comment } = body;

  if (!productId || !customerName || !rating || !comment) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      productId: Number(productId),
      customerName,
      rating: Number(rating),
      comment,
      status: "Pending",
    },
  });

  return NextResponse.json({
    success: true,
    message: "Review submitted for approval",
    review,
  });
}