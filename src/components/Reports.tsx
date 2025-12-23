const Reports = () => (
  <>
    <h2>Báo Cáo Hiệu Suất</h2>
    <div className="report-summary">
      <p>Báo cáo tuần này (23/12/2025)</p>
    </div>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Phát âm</h3>
        <p className="big-score">60%</p>
        <p>Khởi đầu tốt</p>
      </div>
      <div className="stat-card">
        <h3>Ngữ pháp & Từ vựng</h3>
        <p className="big-score">55%</p>
        <p>Cần luyện thêm</p>
      </div>
      <div className="stat-card">
        <h3>Độ lưu loát</h3>
        <p className="big-score">50%</p>
        <p>Tiếp tục cố gắng</p>
      </div>
    </div>
    <div className="recommend-box">
      <h4>Khuyến nghị từ AI:</h4>
      <p>Hãy luyện nói hàng ngày để tăng streak và cải thiện nhanh hơn!</p>
    </div>
    <button className="btn-primary">Tải báo cáo PDF (mock)</button>
  </>
)

export default Reports