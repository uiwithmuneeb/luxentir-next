import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminSettingsPage() {
  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Store Settings"
          subtitle="Manage Luxentir store information, social links and checkout settings."
        />

        <div className="admin-settings-grid">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Store Information</h2>
              <span>Basic brand and contact details</span>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Store Name</label>
                <input defaultValue="Luxentir" />
              </div>

              <div className="admin-field">
                <label>Store Email</label>
                <input defaultValue="support@luxentir.com" />
              </div>

              <div className="admin-field">
                <label>Phone Number</label>
                <input defaultValue="+92 300 1234567" />
              </div>

              <div className="admin-field">
                <label>WhatsApp Number</label>
                <input defaultValue="923001234567" />
              </div>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Social Media</h2>
              <span>Connect Luxentir social platforms</span>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Instagram URL</label>
                <input placeholder="https://instagram.com/luxentir" />
              </div>

              <div className="admin-field">
                <label>Facebook URL</label>
                <input placeholder="https://facebook.com/luxentir" />
              </div>

              <div className="admin-field">
                <label>TikTok URL</label>
                <input placeholder="https://tiktok.com/@luxentir" />
              </div>

              <div className="admin-field">
                <label>Default Currency</label>
                <select defaultValue="PKR">
                  <option>PKR</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Checkout Settings</h2>
              <span>Payment and delivery controls</span>
            </div>

            <div className="admin-content-switches">
              <label>
                <input type="checkbox" defaultChecked />
                Enable Cash on Delivery
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Enable Free Shipping
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Enable WhatsApp Order Confirmation
              </label>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Website Text</h2>
              <span>Announcement and footer content</span>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field full">
                <label>Announcement Bar</label>
                <input defaultValue="Cash on Delivery Only • Premium women’s western clothing" />
              </div>

              <div className="admin-field full">
                <label>Footer Description</label>
                <textarea defaultValue="Premium women’s western online clothing shop with clean silhouettes, luxury styling and Cash on Delivery only." />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button className="admin-secondary-btn">Reset</button>
          <button className="admin-primary-btn">Save Settings</button>
        </div>
      </section>
    </main>
  );
}