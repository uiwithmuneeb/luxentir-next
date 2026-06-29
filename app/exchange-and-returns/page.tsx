import { getPolicyContent } from "@/lib/policy-content";

export const dynamic = "force-dynamic";

export default async function ExchangeReturnsPage() {
  const page = await getPolicyContent("exchangeReturns");

  if (!page.enabled) {
    return <UnavailablePage title="Exchange & Returns" />;
  }

  return (
    <PolicyPage
      eyebrow={page.eyebrow}
      title={page.title}
      content={page.content}
    />
  );
}

function PolicyPage({
  eyebrow,
  title,
  content,
}: {
  eyebrow: string;
  title: string;
  content: string;
}) {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <div className="policy-content">
            {content}
          </div>
        </div>
      </section>
    </main>
  );
}

function UnavailablePage({ title }: { title: string }) {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Unavailable</span>
          <h1>{title}</h1>
          <p>This page is currently unavailable.</p>
        </div>
      </section>
    </main>
  );
}