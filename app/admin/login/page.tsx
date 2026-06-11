"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-bg">
        <span />
        <span />
        <span />
      </div>

      <section className="admin-login-shell">
        <div className="admin-login-brand">
          <span className="eyebrow">Luxentir Admin</span>
          <h1>Luxury CMS Control Center</h1>
          <p>
            Manage products, orders, customers and premium storefront content
            from one secure dashboard.
          </p>

          <div className="admin-login-points">
            <span>✓ Product Management</span>
            <span>✓ COD Orders</span>
            <span>✓ Customer Records</span>
          </div>
        </div>

        <form className="admin-login-card" onSubmit={handleLogin}>
          <div className="admin-login-logo">L</div>

          <span className="eyebrow">Secure Access</span>
          <h2>Sign in to CMS</h2>
          <p>Use your admin credentials to continue.</p>

          <label>
            <span>Email Address</span>
            <input
              type="email"
              placeholder="admin@luxentir.com"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </label>

          {error && <p className="admin-login-error">{error}</p>}

          <button className="btn gold admin-login-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="admin-login-note">
            Protected admin area for Luxentir CMS management.
          </p>
        </form>
      </section>
    </main>
  );
}