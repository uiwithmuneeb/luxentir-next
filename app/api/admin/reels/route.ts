import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();

  const reel = await prisma.reel.create({
    data: {
      title: body.title,
      videoUrl: body.videoUrl,
      image: body.image || "",
      status: body.status || "Active",
      sortOrder: Number(body.sortOrder || 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/reels");

  return NextResponse.json(reel);
}

export async function GET() {
  const reels = await prisma.reel.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return NextResponse.json(reels);
}