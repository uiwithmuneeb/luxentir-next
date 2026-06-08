import type { Metadata } from "next";
import CartProvider from "@/components/providers/CartProvider";
import WishlistProvider from "@/components/providers/WishlistProvider";
import CurrencyProvider from "@/components/providers/CurrencyProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxentir — Luxury Women’s Western Clothing",
  description: "Luxentir premium women’s western clothing online shop.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CurrencyProvider>
            <WishlistProvider>
              <CartProvider>
                <SiteShell>{children}</SiteShell>
              </CartProvider>
            </WishlistProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}