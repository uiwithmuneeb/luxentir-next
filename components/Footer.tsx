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

export default function Footer({
  settings,
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="brand">
            {settings?.storeName || "Luxentir"}
          </h3>

          <p>
            {settings?.footerDescription ||
              "Premium women’s western online clothing shop with clean silhouettes, luxury styling and Cash on Delivery only."}
          </p>
        </div>

        <div>
          <h4>Company</h4>

          <p>
            <Link href="/about">About us</Link>
          </p>

          <p>
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>
          </p>

          <p>
            <Link href="/terms">
              Terms & Conditions
            </Link>
          </p>

          <p>
            <Link href="/exchange-and-returns">
              Exchange & Returns
            </Link>
          </p>
        </div>

        <div>
          <h4>Categories</h4>

          <p>
            <Link href="/shop?category=pants">
              Pants
            </Link>
          </p>

          <p>
            <Link href="/shop?category=shirts">
              Shirts / T-Shirts
            </Link>
          </p>

          <p>
            <Link href="/shop?category=blazers">
              Blazers & Pants
            </Link>
          </p>
        </div>

        <div>
          <h4>Support</h4>

          {settings?.enableCOD && (
            <p>Cash on Delivery Available</p>
          )}

          <p>Order Tracking</p>

          <p>
            WhatsApp:
            {" "}
            {settings?.whatsappNumber ||
              "923001234567"}
          </p>

          {settings?.instagramUrl && (
            <p>
              <a
                href={settings.instagramUrl}
                target="_blank"
              >
                Instagram
              </a>
            </p>
          )}

          {settings?.facebookUrl && (
            <p>
              <a
                href={settings.facebookUrl}
                target="_blank"
              >
                Facebook
              </a>
            </p>
          )}

          {settings?.tiktokUrl && (
            <p>
              <a
                href={settings.tiktokUrl}
                target="_blank"
              >
                TikTok
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}