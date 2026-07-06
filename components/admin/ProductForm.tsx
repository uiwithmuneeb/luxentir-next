"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductForm({
  categories,
  collections,
}: {
  categories: any[];
  collections: any[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: categories?.[0]?.name || "",
    status: "Active",
    price: "",
    comparePrice: "",
    badge: "NEW",
    image: "",
    gallery: "",
    description: "",
    stock: "0",
    featured: false,
    collections: [] as number[],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Black", "Gold", "Beige", "White"],
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

    const text = await res.text();

    let json: any = {};
    try {
      json = JSON.parse(text);
    } catch {
      console.error("UPLOAD RESPONSE:", text);
      alert("Upload API JSON return nahi kar rahi. Terminal error check karo.");
      setUploadingMain(false);
      return;
    }

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

      const text = await res.text();

      let json: any = {};
      try {
        json = JSON.parse(text);
      } catch {
        console.error("GALLERY UPLOAD RESPONSE:", text);
        alert("Gallery upload API JSON return nahi kar rahi.");
        continue;
      }

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
    saveAsDraft = false,
  ) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      collections: form.collections,
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
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
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

          <div className="admin-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
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
              onChange={(e) => setForm({ ...form, price: e.target.value })}
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
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label>Badge</label>
            <select
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
            >
              <option>NEW</option>
              <option>BEST SELLER</option>
              <option>PREMIUM</option>
              <option>LIMITED</option>
              <option>LUXE</option>
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
              placeholder="/uploads/products/image.webp or https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
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
            <label>Gallery Images</label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => uploadGallery(e.target.files)}
            />

            {uploadingGallery && <p>Uploading gallery images...</p>}

            <textarea
              placeholder="Gallery image URLs will appear here"
              value={form.gallery}
              onChange={(e) => setForm({ ...form, gallery: e.target.value })}
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
              {["Ivory", "Black", "Gold", "Beige", "White"].map((color) => (
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

        {message && <p className="admin-form-message">{message}</p>}

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={(e) =>
              handleSubmit(
                e as unknown as React.FormEvent<HTMLFormElement>,
                true,
              )
            }
            disabled={loading || uploadingMain || uploadingGallery}
          >
            Save Draft
          </button>

          <button
            type="submit"
            className="admin-primary-btn"
            disabled={loading || uploadingMain || uploadingGallery}
          >
            {loading
              ? "Saving..."
              : uploadingMain || uploadingGallery
              ? "Uploading..."
              : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
