const Dashboard = () => {
  return (
    <>
      {/* Top Header */}
      <header className="top-header">
        <button className="menu-toggle">
          <i className="fas fa-bars"></i>
        </button>

        <div className="header-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search learners, sessions..."
          />
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

      {/* Dashboard Content */}
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Mentor Dashboard</h1>
          <p>Welcome back! Here's your teaching overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#e3f2fd" }}
            >
              <i className="fas fa-users" style={{ color: "#2196f3" }}></i>
            </div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Total Learners</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#e8f5e9" }}
            >
              <i
                className="fas fa-clipboard-check"
                style={{ color: "#4caf50" }}
              ></i>
            </div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Pending Assessments</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#fff3e0" }}
            >
              <i
                className="fas fa-comments"
                style={{ color: "#ff9800" }}
              ></i>
            </div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Sessions Today</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#f3e5f5" }}
            >
              <i className="fas fa-star" style={{ color: "#9c27b0" }}></i>
            </div>
            <div className="stat-info">
              <h3>0.0</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="actions-grid">
            <a href="/assessments" className="action-card">
              <i className="fas fa-clipboard-list"></i>
              <h3>Organize Assessment</h3>
              <p>Create and manage learner assessments</p>
            </a>

            <a href="/learners" className="action-card">
              <i className="fas fa-user-check"></i>
              <h3>Level Learners</h3>
              <p>Assign proficiency levels to learners</p>
            </a>

            <a href="/feedback" className="action-card">
              <i className="fas fa-comment-medical"></i>
              <h3>Provide Feedback</h3>
              <p>Give immediate feedback after practice</p>
            </a>

            <a href="/materials" className="action-card">
              <i className="fas fa-file-upload"></i>
              <h3>Upload Materials</h3>
              <p>Share documents and resources</p>
            </a>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="section">
          <div className="section-header">
            <h2>Upcoming Sessions</h2>
            <a href="#" className="view-all">
              View All
            </a>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Time</th>
                  <th>Topic</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="empty-row">
                  <td colSpan={5}>
                    No upcoming sessions scheduled
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="section">
          <div className="section-header">
            <h2>Your Responsibilities</h2>
          </div>

          <div className="responsibilities">
            {[
              "Organize assessment and leveling for learners",
              "Provide relevant documents when needed",
              "Point out pronunciation and grammar errors",
              "Guide clear and confident expression",
              "Give immediate feedback after practice",
              "Provide real-life conversation situations",
            ].map((text, index) => (
              <div className="responsibility-item" key={index}>
                <i className="fas fa-check-circle"></i>
                <div>
                  <h4>{text}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
