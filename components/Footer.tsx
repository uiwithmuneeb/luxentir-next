import Link from "next/link";

type FooterProps = {
  settings?: {
    storeName?: string;
    footerDescription?: string;
    whatsappNumber?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
    enableCOD?: boolean;
  };
};

export default function Footer({ settings }: FooterProps) {
  const storeName = settings?.storeName || "Luxentir";
  const whatsappNumber = settings?.whatsappNumber || "923001234567";

  return (
    <footer className="footer">
      <div className="container footer-compact">
        <div className="footer-brand-block">
          <h3 className="brand">{storeName}</h3>

          <p>
            {settings?.footerDescription ||
              "Premium women's western clothing for modern elegance."}
          </p>

          <div className="footer-socials">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank">
                Instagram
              </a>
            )}

            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank">
                Facebook
              </a>
            )}

            {settings?.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank">
                TikTok
              </a>
            )}
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <p><Link href="/shop">New Arrivals</Link></p>
            <p><Link href="/shop">Best Sellers</Link></p>
            <p><Link href="/shop?category=shirts">Shirts</Link></p>
            <p><Link href="/shop?category=pants">Pants</Link></p>
          </div>

          <div>
            <h4>Company</h4>
            <p><Link href="/about">About Us</Link></p>
            <p><Link href="/privacy-policy">Privacy Policy</Link></p>
            <p><Link href="/terms">Terms and Conditions</Link></p>
            <p><Link href="/exchange-and-returns">Exchange & Returns</Link></p>
          </div>

          <div>
            <h4>Support</h4>
            <p><Link href="/track-order">Track Order</Link></p>
            <p><Link href="/contact">Contact</Link></p>
            <p>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank">
                WhatsApp
              </a>
            </p>
            {settings?.enableCOD && <p>Cash on Delivery</p>}
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p>© 2026 {storeName}. All rights reserved.</p>
            <small className="footer-credit">
              Website designed &amp; developed by{" "}
              <a
                href="https://www.uiwithmuneeb.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                UIwithMuneeb.com
              </a>
            </small>
          </div>

          <p>Luxury women’s western clothing in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}