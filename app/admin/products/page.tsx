"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductForm from "@/components/admin/ProductForm";
import EditProductForm from "@/components/admin/EditProductForm";
import { products } from "@/data/products";

export default function AdminProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Product Management"
          subtitle="Add, edit and manage Luxentir products for the storefront."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Products</h2>
              <span>Manage product listings, pricing and status</span>
            </div>

            <button
              className="admin-primary-btn"
              onClick={() => {
                setEditingProduct(null);
                setShowForm(!showForm);
              }}
            >
              {showForm ? "Close Form" : "+ Add Product"}
            </button>
          </div>

          <div className="admin-products-table">
            <div className="admin-products-head">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Badge</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {products.map((product) => (
              <div
                className="admin-products-row"
                key={product.id}
              >
                <div className="admin-product-cell">
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div>
                    <strong>{product.name}</strong>
                    <p>ID: #{product.id}</p>
                  </div>
                </div>

                <span>{product.category}</span>

                <span>
                  PKR {(product.price * 278).toLocaleString()}
                </span>

                <span className="admin-pill">
                  {product.badge}
                </span>

                <span className="admin-status active">
                  Active
                </span>

                <div className="admin-actions">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingProduct(product);
                    }}
                  >
                    Edit
                  </button>
                  <button
                  onClick={() =>
                    window.confirm(
                      `Delete ${product.name}?`
                    )
                  }
                >
                  Delete
                </button>
                </div>
              </div>
            ))}
          </div>
         
        </div>
         {showForm && <ProductForm />}

        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
          />
        )}
      </section>
    </main>
  );
}