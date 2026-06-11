"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  category?: {
    id: number;
    name: string;
  } | null;
  price: number;
  comparePrice?: number | null;
  image: string;
  badge?: string | null;
  status: string;
  description: string;
};

export default function EditProductForm({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);

    const body = {
      name: String(formData.get("name")),
      category: String(formData.get("category")),
      price: Number(formData.get("price")),
      comparePrice: Number(formData.get("comparePrice")) || null,
      badge: String(formData.get("badge")),
      status: String(formData.get("status")),
      image: String(formData.get("image")),
      description: String(formData.get("description")),
    };

    await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setSaving(false);
    onClose();
    router.refresh();
  }

  return (
    <div className="admin-form-card">
      <div className="admin-panel-head">
        <div>
          <h2>Edit Product</h2>
          <span>Update product details for storefront</span>
        </div>

        <button className="admin-secondary-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <form className="admin-product-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Product Name</label>
            <input name="name" defaultValue={product.name} />
          </div>

          <div className="admin-field">
            <label>Category</label>
            <select name="category" defaultValue={product.category?.name || ""}>
              <option value="Pants">Pants</option>
              <option value="Shirts">Shirts</option>
              <option value="Blazers">Blazers</option>
              <option value="Co-ords">Co-ords</option>
              <option value="Party Wear">Party Wear</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Price</label>
            <input name="price" type="number" defaultValue={product.price} />
          </div>

          <div className="admin-field">
            <label>Old Price</label>
            <input
              name="comparePrice"
              type="number"
              defaultValue={product.comparePrice || ""}
            />
          </div>

          <div className="admin-field">
            <label>Badge</label>
            <select name="badge" defaultValue={product.badge || "NEW"}>
              <option value="NEW">NEW</option>
              <option value="BEST SELLER">BEST SELLER</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="LUXE">LUXE</option>
              <option value="LIMITED">LIMITED</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Status</label>
            <select name="status" defaultValue={product.status || "Active"}>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="admin-field full">
            <label>Main Image URL</label>
            <input name="image" defaultValue={product.image} />
          </div>

          <div className="admin-field full">
            <label>Description</label>
            <textarea
              name="description"
              defaultValue={product.description || ""}
            />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="button" className="admin-secondary-btn" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="admin-primary-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}