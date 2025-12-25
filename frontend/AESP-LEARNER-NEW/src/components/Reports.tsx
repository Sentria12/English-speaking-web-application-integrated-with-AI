const Reports = () => (
  <>
    <h2>Báo Cáo Hiệu Suất</h2>
    <div className="report-summary"></div>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Phát âm:</h3>
      </div>
      <div className="stat-card">
        <h3>Ngữ pháp & Từ vựng:</h3>
      </div>
      <div className="stat-card">
        <h3>Độ lưu loát:</h3>
      </div>
    </div>
    <div className="recommend-box">
      <h4>Khuyến nghị từ AI:</h4>
    </div>
  </>
);

export default Reports;
