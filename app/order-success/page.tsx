export default function OrderSuccessPage() {
  return (
    <main>
      <section className="section">
        <div
          className="container"
          style={{
            textAlign: "center",
            padding: "120px 0",
          }}
        >
          <span className="eyebrow">
            Order Confirmed
          </span>

          <h1>
            Thank You For Shopping
            With Luxentir
          </h1>

          <p>
            Your Cash On Delivery order
            has been placed successfully.
          </p>

          <br />

          <a
            className="btn gold"
            href="/shop"
          >
            Continue Shopping
          </a>
        </div>
      </section>
    </main>
  );
}