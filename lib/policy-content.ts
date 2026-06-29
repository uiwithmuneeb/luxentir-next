import { prisma } from "@/lib/prisma";

const defaults: Record<string, any> = {
  aboutUs: {
    eyebrow: "About Luxentir",
    title: "Luxury western wear for modern women",
    content:
      "Luxentir is a premium women’s western clothing brand focused on elegant silhouettes, refined styling and a boutique shopping experience.",
  },
  privacyPolicy: {
    eyebrow: "Privacy Policy",
    title: "Your privacy matters",
    content:
      "We collect only the information required to process orders, provide support and improve the Luxentir shopping experience.",
  },
  termsConditions: {
    eyebrow: "Terms & Conditions",
    title: "Shopping with Luxentir",
    content:
      "By using Luxentir, customers agree to our order, exchange, delivery and Cash on Delivery terms.",
  },
  exchangeReturns: {
    eyebrow: "Exchange & Returns",
    title: "Easy exchange support",
    content:
      "Eligible products can be exchanged according to Luxentir’s exchange policy. Items must be unused, unworn and returned with original packaging.",
  },
};

export async function getPolicyContent(key: string) {
  const fallback = defaults[key];

  try {
    const section = await prisma.homepageSection.findUnique({
      where: { key },
    });

    if (!section) {
      return {
        ...fallback,
        enabled: true,
      };
    }

    return {
      ...fallback,
      content: section.content || fallback.content,
      enabled: section.enabled,
    };
  } catch (error) {
    console.error("POLICY CONTENT ERROR:", error);

    return {
      ...fallback,
      enabled: true,
    };
  }
}