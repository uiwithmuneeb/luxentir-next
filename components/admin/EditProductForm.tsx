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
  collections?: {
    collectionId: number;
  }[];
  price: number;
  comparePrice?: number | null;
  image: string;
  gallery?: string | null;
  sizes?: string | null;
  colors?: string | null;
  stock?: number;
  featured?: boolean;
  badge?: string | null;
  status: string;
  description: string;
};

const sizeOptions = ["XS", "S", "M", "L", "XL"];
const colorOptions = ["Ivory", "Black", "Gold", "Beige", "White"];

function parseArray(value?: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export default function EditProductForm({
  product,
  categories,
  collections,
  onClose,
}: {
  product: Product;
  categories: any[];
  collections: any[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [form, setForm] = useState({
    name: product.name || "",
    collections:
    product.collections?.map((c) => c.collectionId) || [],
    category: product.category?.name || categories?.[0]?.name || "",
    price: String(product.price || ""),
    comparePrice: product.comparePrice ? String(product.comparePrice) : "",
    badge: product.badge || "NEW",
    status: product.status || "Active",
    image: product.image || "",
    gallery: parseArray(product.gallery).join(", "),
    description: product.description || "",
    stock: String(product.stock || 0),
    featured: product.featured || false,
    sizes: parseArray(product.sizes).length
      ? parseArray(product.sizes)
      : ["XS", "S", "M", "L", "XL"],
    colors: parseArray(product.colors).length
      ? parseArray(product.colors)
      : ["Ivory", "Black", "Gold"],
  });

  const toggleArrayValue = (key: "sizes" | "colors", value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const toggleCollection = (id: number) => {
    setForm((prev) => ({
      ...prev,
      collections: prev.collections.includes(id)
        ? prev.collections.filter((x) => x !== id)
        : [...prev.collections, id],
    }));
  };

  async function uploadMainImage(file: File) {
    setUploadingMain(true);

    const data = new FormData();
    data.append("file", file);
    data.append("type", "products");

    const res = await fetch("/api/admin/upload/product-image", {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    setUploadingMain(false);

    if (json.url) {
      setForm((prev) => ({
        ...prev,
        image: json.url,
      }));
    } else {
      alert(json.message || "Upload failed");
    }
  }

  async function uploadGallery(files: FileList | null) {
    if (!files) return;

    setUploadingGallery(true);

    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "gallery");

      const res = await fetch("/api/admin/upload/product-image", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (json.url) {
        uploaded.push(json.url);
      }
    }

    setUploadingGallery(false);

    setForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery.split(",").filter(Boolean), ...uploaded].join(
        ",",
      ),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const body = {
      name: form.name,
      category: form.category,
      collections: form.collections,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
      badge: form.badge,
      status: form.status,
      image: form.image,
      gallery: form.gallery
        ? form.gallery
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      description: form.description,
      stock: Number(form.stock || 0),
      featured: form.featured,
      sizes: form.sizes,
      colors: form.colors,
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
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-field">
            <label>Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label>Old Price</label>
            <input
              type="number"
              value={form.comparePrice}
              onChange={(e) =>
                setForm({ ...form, comparePrice: e.target.value })
              }
            />
          </div>

          <div className="admin-field">
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label>Badge</label>
            <select
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            >
              <option value="NEW">NEW</option>
              <option value="BEST SELLER">BEST SELLER</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="LUXE">LUXE</option>
              <option value="LIMITED">LIMITED</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="admin-field full">
            <label>Main Product Image</label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadMainImage(file);
              }}
            />

            {uploadingMain && <p>Uploading main image...</p>}

            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/uploads/products/image.webp or https://..."
            />

            {form.image && (
              <img
                src={form.image}
                alt="Product preview"
                style={{
                  width: "120px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginTop: "12px",
                }}
              />
            )}
          </div>

          <div className="admin-field full">
            <label>Collections</label>

            <div className="admin-check-grid">
              {collections.map((collection) => (
                <label
                  key={collection.id}
                  className="admin-check-item"
                >
                  <input
                    type="checkbox"
                    checked={form.collections.includes(collection.id)}
                    onChange={() => toggleCollection(collection.id)}
                  />

                  {collection.name}
                </label>
              ))}
            </div>
          </div>

          <div className="admin-field full">
            <label>Gallery Images</label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => uploadGallery(e.target.files)}
            />

            {uploadingGallery && <p>Uploading gallery images...</p>}

            <textarea
              value={form.gallery}
              onChange={(e) => setForm({ ...form, gallery: e.target.value })}
              placeholder="Gallery image URLs will appear here"
            />

            {form.gallery && (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "12px",
                }}
              >
                {form.gallery
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt="Gallery preview"
                      style={{
                        width: "90px",
                        height: "115px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  ))}
              </div>
            )}
          </div>

          <div className="admin-field full">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Show on homepage
              </label>
            </div>
          </div>

          <div className="admin-field full">
            <label>Available Sizes</label>
            <div className="admin-checks">
              {sizeOptions.map((size) => (
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
              {colorOptions.map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    checked={form.colors.includes(color)}
                    onChange={() => toggleArrayValue("colors", color)}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-primary-btn"
            disabled={saving || uploadingMain || uploadingGallery}
          >
            {saving
              ? "Saving..."
              : uploadingMain || uploadingGallery
                ? "Uploading..."
                : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
