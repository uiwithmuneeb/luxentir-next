import Link from "next/link";

const categories = [
  {
    name: "Pants",
    text: "Tailored luxury bottoms",
    href: "/shop?category=Pants",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Shirts/T-shirts",
    text: "Premium clean essentials",
    href: "/shop?category=Shirts",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Blazers & pants",
    text: "Structured power sets",
    href: "/shop?category=Blazers",
    image:
      "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "casual co-ord sets",
    text: "Relaxed matching edits",
    href: "/shop?category=Co-ords",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "party wear",
    text: "Evening-ready luxe looks",
    href: "/shop?category=Party Wear",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Categories() {
  return (
    <section className="section tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Curated categories</span>
            <h2>Shop by mood</h2>
          </div>
          <p>
            Clean categories for a premium shopping flow across mobile, tablet
            and desktop.
          </p>
        </div>

        <div className="category-grid five">
          {categories.map((cat) => (
            <Link className="category-card reveal show" href={cat.href} key={cat.name}>
              <img src={cat.image} alt={cat.name} />
              <div>
                <h3>{cat.name}</h3>
                <span>{cat.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}