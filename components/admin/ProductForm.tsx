"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "Pants",
    status: "Active",
    price: "",
    comparePrice: "",
    badge: "NEW",
    image: "",
    gallery: "",
    description: "",
    stock: "0",
    featured: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Black", "Gold", "Beige", "White"],
  });

  const toggleArrayValue = (
    key: "sizes" | "colors",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    saveAsDraft = false
  ) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      status: saveAsDraft ? "Draft" : form.status,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
      stock: Number(form.stock || 0),
      gallery: form.gallery
        ? form.gallery.split(",").map((item) => item.trim())
        : [],
      sizes: form.sizes,
      colors: form.colors,
    };

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setMessage("Product could not be saved.");
      return;
    }

    setMessage("Product saved successfully.");
    router.refresh();
  };

  return (
    <div className="admin-form-card">
      <div className="admin-panel-head">
        <div>
          <h2>Add New Product</h2>
          <span>Create product details for Luxentir storefront</span>
        </div>
      </div>

      <form
        className="admin-product-form"
        onSubmit={(e) => handleSubmit(e, false)}
      >
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Product Name</label>
            <input
              placeholder="Ivory Wide-Leg Luxe Pants"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          <div className="admin-field">
            <label>Slug</label>
            <input
              placeholder="ivory-wide-leg-luxe-pants"
              value={form.slug}
              onChange={(e) =>
                setForm({ ...form, slug: e.target.value })
              }
              required
            />
          </div>

          <div className="admin-field">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Pants</option>
              <option>Shirts</option>
              <option>Blazers</option>
              <option>Co-ords</option>
              <option>Party Wear</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Active</option>
              <option>Draft</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Price</label>
            <input
              placeholder="118"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />
          </div>

          <div className="admin-field">
            <label>Old Price</label>
            <input
              placeholder="155"
              type="number"
              value={form.comparePrice}
              onChange={(e) =>
                setForm({
                  ...form,
                  comparePrice: e.target.value,
                })
              }
            />
          </div>

          <div className="admin-field">
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />
          </div>

          <div className="admin-field">
            <label>Badge</label>
            <select
              value={form.badge}
              onChange={(e) =>
                setForm({ ...form, badge: e.target.value })
              }
            >
              <option>NEW</option>
              <option>BEST SELLER</option>
              <option>PREMIUM</option>
              <option>LIMITED</option>
              <option>LUXE</option>
            </select>
          </div>

          <div className="admin-field full">
            <label>Main Image URL</label>
            <input
              placeholder="https://..."
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
              required
            />
          </div>

          <div className="admin-field full">
            <label>Gallery Image URLs</label>
            <textarea
              placeholder="Add multiple image URLs separated by comma"
              value={form.gallery}
              onChange={(e) =>
                setForm({ ...form, gallery: e.target.value })
              }
            />
          </div>

          <div className="admin-field full">
            <label>Description</label>
            <textarea
              placeholder="Product description..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="admin-field full">
            <label>Featured Product</label>
            <div className="admin-checks">
              <label>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      featured: e.target.checked,
                    })
                  }
                />
                Show on homepage
              </label>
            </div>
          </div>

          <div className="admin-field full">
            <label>Available Sizes</label>
            <div className="admin-checks">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(size)}
                    onChange={() => toggleArrayValue("sizes", size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="admin-field full">
            <label>Available Colors</label>
            <div className="admin-checks">
              {["Ivory", "Black", "Gold", "Beige", "White"].map(
                (color) => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      checked={form.colors.includes(color)}
                      onChange={() =>
                        toggleArrayValue("colors", color)
                      }
                    />
                    {color}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {message && <p className="admin-form-message">{message}</p>}

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={(e) =>
              handleSubmit(
                e as unknown as React.FormEvent<HTMLFormElement>,
                true
              )
            }
            disabled={loading}
          >
            Save Draft
          </button>

          <button
            type="submit"
            className="admin-primary-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}