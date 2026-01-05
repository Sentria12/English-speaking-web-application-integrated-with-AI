const Assessments = () => {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>Learner Assessments</h1>
        <p>Organize and evaluate learner proficiency levels</p>
        <button className="btn btn-primary">
          <i className="fas fa-plus-circle"></i> Create New Assessment
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
            <p>Pending Review</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: "#e8f5e9" }}>
            <i className="fas fa-check-circle" style={{ color: "#4caf50" }}></i>
          </div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: "#e3f2fd" }}>
            <i className="fas fa-user-clock" style={{ color: "#2196f3" }}></i>
          </div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Scheduled</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: "#fce4ec" }}>
            <i className="fas fa-exclamation-circle" style={{ color: "#e91e63" }}></i>
          </div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Overdue</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab-btn active">Pending Review</button>
        <button className="tab-btn">Scheduled</button>
        <button className="tab-btn">Completed</button>
        <button className="tab-btn">Templates</button>
      </div>

      {/* Pending Assessments Table */}
      <div className="section">
        <div className="section-header">
          <h2>Assessments Pending Review</h2>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Assessment Date</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="empty-row">
                <td colSpan={6}>No pending assessments</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Criteria */}
      <div className="section">
        <div className="section-header">
          <h2>Assessment Criteria</h2>
        </div>

        <div className="criteria-grid">
          <div className="criterion-card">
            <h3><i className="fas fa-volume-up"></i> Pronunciation</h3>
            <ul>
              <li>Clarity of speech</li>
              <li>Word stress</li>
              <li>Intonation patterns</li>
              <li>Accent comprehensibility</li>
            </ul>
            <div className="rating-scale">
              <span>1 (Needs Work)</span>
              <span>5 (Excellent)</span>
            </div>
          </div>

          <div className="criterion-card">
            <h3><i className="fas fa-language"></i> Grammar</h3>
            <ul>
              <li>Sentence structure</li>
              <li>Tense usage</li>
              <li>Article usage</li>
              <li>Preposition accuracy</li>
            </ul>
            <div className="rating-scale">
              <span>1 (Needs Work)</span>
              <span>5 (Excellent)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Assessments
