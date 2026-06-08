import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminContentPage() {
  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Content Management"
          subtitle="Manage homepage sections, policies and marketing content."
        />

        <div className="admin-content-grid">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Homepage Content</h2>
              <span>Main storefront sections</span>
            </div>

            <div className="admin-task-list">
              <p>✓ Hero Section</p>
              <p>✓ Homepage Categories</p>
              <p>✓ Featured Collection</p>
              <p>✓ Why Luxentir</p>
              <p>✓ Best Sellers</p>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Marketing Content</h2>
              <span>Social & engagement sections</span>
            </div>

            <div className="admin-task-list">
              <p>✓ Instagram Reels</p>
              <p>✓ Newsletter Section</p>
              <p>✓ Announcement Bar</p>
              <p>✓ Homepage Promotions</p>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Policy Pages</h2>
              <span>Store information pages</span>
            </div>

            <div className="admin-task-list">
              <p>✓ About Us</p>
              <p>✓ Privacy Policy</p>
              <p>✓ Terms & Conditions</p>
              <p>✓ Exchange & Returns</p>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Homepage Visibility</h2>
              <span>Enable / disable sections</span>
            </div>

            <div className="admin-content-switches">
              <label>
                <input type="checkbox" defaultChecked />
                Hero Section
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Reels Section
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Featured Collection
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Newsletter
              </label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}