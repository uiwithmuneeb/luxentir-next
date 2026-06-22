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
  title: "Luxentir — Luxury Women’s Western Clothing",
  description: "Luxentir premium women’s western clothing online shop.",
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