import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sections = await prisma.homepageSection.findMany();

    return NextResponse.json(sections);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    for (const section of body.sections) {
      await prisma.homepageSection.upsert({
        where: {
          key: section.key,
        },
        update: {
          title: section.title || "",
          subtitle: section.subtitle || "",
          content: section.content || "",
          enabled: section.enabled,
        },
        create: {
          key: section.key,
          title: section.title || "",
          subtitle: section.subtitle || "",
          content: section.content || "",
          enabled: section.enabled,
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to save content" },
      { status: 500 }
    );
  }
}