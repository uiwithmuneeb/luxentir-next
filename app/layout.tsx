import type { Metadata } from "next";
import CartProvider from "@/components/providers/CartProvider";
import WishlistProvider from "@/components/providers/WishlistProvider";
import CurrencyProvider from "@/components/providers/CurrencyProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteShell from "@/components/SiteShell";
import { getStoreSettings } from "@/lib/store-settings";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luxentir.com"),

  title: {
    default: "Luxentir | Luxury Women's Western Clothing in Pakistan",
    template: "%s | Luxentir",
  },

  description:
    "Shop premium women's western clothing online at Luxentir. Discover elegant shirts, pants, co-ord sets, blazers and party wear designed for modern women.",

  keywords: [
    "luxury women's clothing Pakistan",
    "premium women's western clothing",
    "women's western wear Pakistan",
    "women's fashion online Pakistan",
    "premium co-ord sets",
    "women blazers Pakistan",
    "party wear for women",
    "women shirts Pakistan",
    "women pants Pakistan",
    "Luxentir",
  ],

  authors: [{ name: "Luxentir" }],
  creator: "Luxentir",
  publisher: "Luxentir",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Luxentir | Luxury Women's Western Clothing in Pakistan",
    description:
      "Discover premium women's western clothing by Luxentir, including elegant shirts, pants, blazers, co-ord sets and party wear.",
    url: "https://www.luxentir.com",
    siteName: "Luxentir",
    type: "website",
    locale: "en_PK",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxentir | Luxury Women's Western Clothing in Pakistan",
    description:
      "Shop elegant women's western wear online with Luxentir. Premium styles for modern women.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getStoreSettings();

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CurrencyProvider>
            <WishlistProvider>
              <CartProvider>
                <SiteShell settings={settings}>{children}</SiteShell>
              </CartProvider>
            </WishlistProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}