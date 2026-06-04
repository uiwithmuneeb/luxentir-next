import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="brand">Luxentir</h3>
          <p>
            Premium women’s western online clothing shop with clean silhouettes,
            luxury styling and Cash on Delivery only.
          </p>
        </div>

        <div>
          <h4>Company</h4>
          <p>
            <Link href="/about">About us</Link>
          </p>
          <p>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
          <p>
            <Link href="/terms">Terms & Conditions</Link>
          </p>
          <p>
            <Link href="/exchange-and-returns">Exchange and returns</Link>
          </p>
        </div>

        <div>
          <h4>Categories</h4>
          <p>
            <Link href="/shop?category=pants">Pants</Link>
          </p>
          <p>
            <Link href="/shop?category=shirts">Shirts/T-shirts</Link>
          </p>
          <p>
            <Link href="/shop?category=blazers">Blazers & pants</Link>
          </p>
        </div>

        <div>
          <h4>Support</h4>
          <p>Cash on Delivery Only</p>
          <p>Order Tracking</p>
          <p>WhatsApp Support</p>
        </div>
      </div>
    </footer>
  );
}