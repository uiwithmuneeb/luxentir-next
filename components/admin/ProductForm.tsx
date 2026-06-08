export default function ProductForm() {
  return (
    <div className="admin-form-card">
      <div className="admin-panel-head">
        <div>
          <h2>Add New Product</h2>
          <span>Create product details for Luxentir storefront</span>
        </div>
      </div>

      <form className="admin-product-form">
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Product Name</label>
            <input placeholder="Ivory Wide-Leg Luxe Pants" />
          </div>

          <div className="admin-field">
            <label>Slug</label>
            <input placeholder="ivory-wide-leg-luxe-pants" />
          </div>

          <div className="admin-field">
            <label>Category</label>
            <select>
              <option>Pants</option>
              <option>Shirts</option>
              <option>Blazers</option>
              <option>Co-ords</option>
              <option>Party Wear</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Status</label>
            <select>
              <option>Active</option>
              <option>Draft</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Price</label>
            <input placeholder="118" type="number" />
          </div>

          <div className="admin-field">
            <label>Old Price</label>
            <input placeholder="155" type="number" />
          </div>

          <div className="admin-field">
            <label>Badge</label>
            <select>
              <option>NEW</option>
              <option>BEST SELLER</option>
              <option>PREMIUM</option>
              <option>LIMITED</option>
              <option>LUXE</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Main Image URL</label>
            <input placeholder="https://..." />
          </div>

          <div className="admin-field full">
            <label>Gallery Image URLs</label>
            <textarea placeholder="Add multiple image URLs separated by comma" />
          </div>

          <div className="admin-field full">
            <label>Description</label>
            <textarea placeholder="Product description..." />
          </div>

          <div className="admin-field full">
            <label>Available Sizes</label>
            <div className="admin-checks">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <label key={size}>
                  <input type="checkbox" defaultChecked />
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
                  <input type="checkbox" defaultChecked />
                  {color}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="button" className="admin-secondary-btn">
            Save Draft
          </button>

          <button type="button" className="admin-primary-btn">
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}