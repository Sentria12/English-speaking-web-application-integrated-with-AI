const Progress = () => (
  <>
    <h2>Tiến Độ Học Tập</h2>
    <div className="progress-overview">
      <div className="progress-circle">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831"
          />
          <path
            className="circle-progress"
            strokeDasharray="35, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            35%
          </text>
        </svg>
      </div>
      <p className="level-text">Trình độ: Beginner</p>
    </div>
    <div className="stats-grid">
      <div className="stat-item">
        <strong>Streak:</strong> 1 ngày 🔥
      </div>
      <div className="stat-item">
        <strong>Thời gian luyện:</strong> 10 phút
      </div>
      <div className="stat-item">
        <strong>Từ vựng mới:</strong> 30 từ
      </div>
    </div>
  </>
);

export default Progress;
