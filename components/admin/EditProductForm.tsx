type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
};

export default function EditProductForm({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
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

      <form className="admin-product-form">
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Product Name</label>
            <input defaultValue={product.name} />
          </div>

          <div className="admin-field">
            <label>Category</label>
            <select defaultValue={product.category}>
              <option>Pants</option>
              <option>Shirts</option>
              <option>Blazers</option>
              <option>Co-ords</option>
              <option>Party Wear</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Price</label>
            <input type="number" defaultValue={product.price} />
          </div>

          <div className="admin-field">
            <label>Old Price</label>
            <input type="number" defaultValue={product.oldPrice} />
          </div>

          <div className="admin-field">
            <label>Badge</label>
            <select defaultValue={product.badge}>
              <option>New</option>
              <option>Best</option>
              <option>Premium</option>
              <option>Luxe</option>
              <option>Limited</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Status</label>
            <select defaultValue="Active">
              <option>Active</option>
              <option>Draft</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="admin-field full">
            <label>Main Image URL</label>
            <input defaultValue={product.image} />
          </div>

          <div className="admin-field full">
            <label>Description</label>
            <textarea defaultValue="Premium Luxentir product description will be managed here." />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="button" className="admin-secondary-btn" onClick={onClose}>
            Cancel
          </button>

          <button type="button" className="admin-primary-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}