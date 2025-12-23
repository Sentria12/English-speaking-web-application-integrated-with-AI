import { useState } from 'react'

const Packages = () => {
  const [status, setStatus] = useState('')

  return (
    <>
      <h2>Chọn Gói Dịch Vụ Phù hợp</h2>
      <div className="packages-grid">
        <div className="package-card">
          <h3>Basic</h3>
          <p className="price">200.000 <span className="currency">VNĐ/tháng</span></p>
          <ul className="package-features">
            <li>AI hỗ trợ luyện nói</li>
            <li>Gợi ý từ vựng & câu</li>
            <li>Theo dõi tiến độ cơ bản</li>
          </ul>
          <button className="btn-package" onClick={() => setStatus('Đã chọn gói BASIC thành công! 🎉')}>
            Chọn gói
          </button>
        </div>
        <div className="package-card premium">
          <div className="badge">Phổ biến</div>
          <h3>Premium</h3>
          <p className="price">500.000 <span className="currency">VNĐ/tháng</span></p>
          <ul className="package-features">
            <li>Tất cả tính năng Basic</li>
            <li>Mentor hỗ trợ trực tiếp</li>
            <li>Phản hồi chi tiết</li>
            <li>Báo cáo nâng cao</li>
          </ul>
          <button className="btn-package" onClick={() => setStatus('Đã chọn gói PREMIUM thành công! 🎉')}>
            Chọn gói
          </button>
        </div>
      </div>
      {status && <p className="status">{status}</p>}
    </>
  )
}

export default Packages