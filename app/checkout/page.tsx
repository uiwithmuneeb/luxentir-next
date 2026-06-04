"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem(
      "luxentir-last-order",
      JSON.stringify(form)
    );

    router.push("/order-success");
  };

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow">Checkout</span>
          <h1>Delivery Details</h1>
          <p>Cash On Delivery Only</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <input
              className="field"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              className="field"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              className="field"
              placeholder="City"
              required
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />

            <textarea
              className="field"
              placeholder="Complete Address"
              required
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
            />

            <button
              className="btn gold"
              type="submit"
            >
              Place Order
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}