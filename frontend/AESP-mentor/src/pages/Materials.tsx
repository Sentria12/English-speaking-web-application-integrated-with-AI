import { useState } from "react";

type TabType = "all" | "documents" | "audio" | "videos" | "links";

export default function Materials() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <div className="page-header">
        <h1>Teaching Materials</h1>
        <p>Share relevant documents and resources with learners</p>
        <button
          className="btn btn-primary"
          onClick={() => setShowUploadModal(true)}
        >
          <i className="fas fa-cloud-upload-alt"></i> Upload New Material
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <StatCard icon="fa-file-alt" label="Total Materials" value="0" />
        <StatCard icon="fa-download" label="Total Downloads" value="0" />
        <StatCard icon="fa-folder-open" label="Shared Folders" value="0" />
        <StatCard icon="fa-users" label="Learners Shared With" value="0" />
      </div>

      {/* ===== TABS ===== */}
      <div className="tabs">
        {[
          { key: "all", label: "All Materials" },
          { key: "documents", label: "Documents" },
          { key: "audio", label: "Audio Files" },
          { key: "videos", label: "Videos" },
          { key: "links", label: "Web Links" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key as TabType)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== TAB CONTENT ===== */}
      {activeTab === "all" && (
        <div className="section">
          <div className="section-header">
            <h2>All Teaching Materials</h2>
            <div className="section-actions">
              <button className="btn btn-outline">
                <i className="fas fa-folder-plus"></i> Create Folder
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-share-alt"></i> Bulk Share
              </button>
            </div>
          </div>

          <div className="materials-grid">
            <div className="empty-state">
              <i className="fas fa-cloud-upload-alt"></i>
              <h3>No Materials Uploaded Yet</h3>
              <p>Upload your first teaching material to share with learners</p>
              <button
                className="btn btn-primary"
                onClick={() => setShowUploadModal(true)}
              >
                <i className="fas fa-upload"></i> Upload First Material
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== CATEGORIES ===== */}
      <div className="section">
        <div className="section-header">
          <h2>Material Categories</h2>
        </div>

        <div className="categories-grid">
          {[
            ["fa-volume-up", "Pronunciation"],
            ["fa-language", "Grammar"],
            ["fa-comments", "Conversation"],
            ["fa-briefcase", "Business English"],
            ["fa-plane", "Travel English"],
            ["fa-book", "Vocabulary"],
          ].map(([icon, title]) => (
            <div className="category-card" key={title}>
              <div className="category-icon">
                <i className={`fas ${icon}`}></i>
              </div>
              <h3>{title}</h3>
              <p>0 files</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== GUIDELINES ===== */}
      <div className="section">
        <div className="section-header">
          <h2>Sharing Guidelines</h2>
        </div>

        <div className="guidelines">
          {[
            "Provide relevant documents when learners need them",
            "Organize materials by topic and difficulty",
            "Include practical, real-life examples",
            "Suggest ways to learn vocabulary and idioms",
            "Share real communication experiences",
          ].map((text) => (
            <div className="guideline-item" key={text}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>{text}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== UPLOAD MODAL ===== */}
      {showUploadModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Upload Teaching Material</h3>
              <button
                className="modal-close"
                onClick={() => setShowUploadModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Material Title</label>
                  <input type="text" placeholder="Enter title" required />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea rows={3}></textarea>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select required>
                    <option value="">Select category</option>
                    <option>Pronunciation</option>
                    <option>Grammar</option>
                    <option>Vocabulary</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Upload Material
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ===== HELPER COMPONENT ===== */
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div className="stat-card">
    <div className="stat-icon">
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </div>
);
