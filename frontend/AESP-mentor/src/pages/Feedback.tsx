
import { useState } from "react";

const Feedback = () => {
  const [activeTab, setActiveTab] = useState<
    "pending" | "given" | "templates" | "analytics"
  >("pending");

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Top Header */}
      <header className="top-header">
        <button className="menu-toggle">
          <i className="fas fa-bars"></i>
        </button>

        <div className="header-search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search feedback..." />
        </div>

        <div className="header-actions">
          <button className="btn-icon">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">0</span>
          </button>
          <button className="btn-icon">
            <i className="fas fa-question-circle"></i>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Feedback Management</h1>
          <p>Provide immediate feedback to help learners improve quickly</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus-circle"></i> Give New Feedback
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#fff3e0" }}>
              <i className="fas fa-clock" style={{ color: "#ff9800" }}></i>
            </div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Pending Feedback</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#e8f5e9" }}>
              <i
                className="fas fa-check-circle"
                style={{ color: "#4caf50" }}
              ></i>
            </div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Given This Week</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#e3f2fd" }}>
              <i className="fas fa-star" style={{ color: "#2196f3" }}></i>
            </div>
            <div className="stat-info">
              <h3>0h</h3>
              <p>Avg. Response Time</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#fce4ec" }}>
              <i
                className="fas fa-exclamation-circle"
                style={{ color: "#e91e63" }}
              ></i>
            </div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Urgent Feedback</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {["pending", "given", "templates", "analytics"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Pending Tab */}
        {activeTab === "pending" && (
          <div className="section">
            <div className="section-header">
              <h2>Feedback Pending</h2>
              <button className="btn btn-outline">
                <i className="fas fa-check-double"></i> Mark All as Reviewed
              </button>
            </div>

            <div className="empty-state">
              <i className="fas fa-check-circle"></i>
              <h3>No Pending Feedback</h3>
              <p>All feedback has been addressed. Great work!</p>
            </div>
          </div>
        )}

        {/* Guidelines */}
        <div className="section">
          <div className="section-header">
            <h2>Feedback Guidelines</h2>
          </div>

          <div className="guidelines-grid">
            <div className="guideline-card">
              <h3>
                <i className="fas fa-volume-up"></i> Pronunciation Feedback
              </h3>
              <ul>
                <li>Identify specific sound errors</li>
                <li>Demonstrate correct pronunciation</li>
                <li>Suggest practice exercises</li>
                <li>Use phonetic symbols when helpful</li>
              </ul>
            </div>

            <div className="guideline-card">
              <h3>
                <i className="fas fa-language"></i> Grammar Feedback
              </h3>
              <ul>
                <li>Correct errors clearly</li>
                <li>Explain the rule briefly</li>
                <li>Provide correct examples</li>
                <li>Suggest grammar resources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Provide Feedback</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Feedback Details</label>
                  <textarea rows={6}></textarea>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
