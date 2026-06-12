import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rows = await prisma.storeSetting.findMany();

    const settings = rows.reduce((acc: Record<string, any>, item) => {
      try {
        acc[item.key] = JSON.parse(item.value);
      } catch {
        acc[item.key] = item.value;
      }

      return acc;
    }, {});

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      { message: "Settings could not be loaded" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.storeSetting.upsert({
          where: { key },
          update: {
            value: JSON.stringify(value),
          },
          create: {
            key,
            value: JSON.stringify(value),
          },
        })
      )
    );

    revalidatePath("/");
    revalidatePath("/admin/settings");

    return NextResponse.json({
      message: "Settings saved successfully",
    });
  } catch (error) {
    console.error("SAVE SETTINGS ERROR:", error);

    return NextResponse.json(
      { message: "Settings could not be saved" },
      { status: 500 }
    );
  }
}