import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Luxentir Orders");

    worksheet.columns = [
      { header: "Order Number", key: "orderNumber", width: 18 },
      { header: "Date", key: "date", width: 18 },
      { header: "Customer", key: "customerName", width: 24 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "Email", key: "email", width: 28 },
      { header: "Country", key: "country", width: 18 },
      { header: "City", key: "city", width: 18 },
      { header: "Address", key: "address", width: 40 },
      { header: "Payment", key: "payment", width: 14 },
      { header: "Status", key: "status", width: 16 },
      { header: "Items", key: "items", width: 40 },
      { header: "Shipping", key: "shippingCharge", width: 14 },
      { header: "Total", key: "total", width: 14 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        orderNumber: order.orderNumber,
        date: new Date(order.createdAt).toLocaleDateString("en-GB"),
        customerName: order.customerName,
        phone: order.phone,
        email: order.email || "",
        country: order.country || "Pakistan",
        city: order.city,
        address: order.address,
        payment: order.payment,
        status: order.status,
        items: order.items
          .map(
            (item) =>
              `${item.name} x${item.quantity} ${item.size ? `(${item.size})` : ""}`
          )
          .join(", "),
        shippingCharge: order.shippingCharge || 0,
        total: order.total,
      });
    });

    worksheet.getRow(1).font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF111111" },
    };

    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FFE5E5E5" } },
          left: { style: "thin", color: { argb: "FFE5E5E5" } },
          bottom: { style: "thin", color: { argb: "FFE5E5E5" } },
          right: { style: "thin", color: { argb: "FFE5E5E5" } },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="luxentir-orders.xlsx"`,
      },
    });
  } catch (error) {
    console.error("EXPORT ORDERS ERROR:", error);

    return NextResponse.json(
      {
        message: "Orders export failed",
      },
      {
        status: 500,
      }
    );
  }
}