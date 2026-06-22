import { prisma } from "@/lib/prisma";

export async function getStoreSettings() {
  const defaults = {
    storeName: "Luxentir",
    storeEmail: "support@luxentir.com",
    phoneNumber: "+92 300 1234567",
    whatsappNumber: "923001234567",
    instagramUrl: "https://instagram.com/luxentir",
    facebookUrl: "https://facebook.com/luxentir",
    tiktokUrl: "https://tiktok.com/@luxentir",
    defaultCurrency: "PKR",
    announcementBar:
      "Cash on Delivery Only • Premium women’s western clothing",
    footerDescription:
      "Premium women’s western online clothing shop with clean silhouettes, luxury styling and Cash on Delivery only.",
    enableCOD: true,
    enableFreeShipping: true,
    enableWhatsAppConfirmation: true,
  };

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

    return {
      ...defaults,
      ...settings,
    };
  } catch (error) {
    console.error("STORE SETTINGS ERROR:", error);
    return defaults;
  }
}