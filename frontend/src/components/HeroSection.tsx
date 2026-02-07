import { Link } from "react-router-dom";

const HeroSection = () => (
  <>
    <section className="hero-section">
      <header className="hero-header"></header>
      <h1 className="hero-title">
        Luyện Nói Tiếng Anh Tự Tin <br />
        <span className="highlight">Không Sợ Sai</span>
      </h1>

      <p className="hero-subtitle">
        Hàng ngàn người Việt đã cải thiện phát âm và lưu loát chỉ sau 30 ngày
        với AI thông minh của AESP
      </p>
    </section>

    <section className="cta-section">
      <Link to="/register" className="btn-primary-large">
        Bắt đầu ngay miễn phí
      </Link>
    </section>

    {/* FEATURES */}
    <section className="features-section">
      <div className="features-grid">
        {/* CARD 1 */}
        <div className="feature-card">
          <div className="feature-icon-circle">
            <i className="fas fa-robot"></i>
          </div>
          <h3>AI Thông Minh</h3>
          <p>Sửa phát âm, ngữ pháp ngay lập tức như giáo viên bản xứ</p>
        </div>

        {/* CARD 2 */}
        <div className="feature-card">
          <div className="feature-icon-circle">
            <i className="fas fa-comments"></i>
          </div>
          <h3>Luyện Mọi Lúc</h3>
          <p>Thực hành với hàng trăm tình huống thực tế</p>
        </div>

        {/* CARD 3 */}
        <div className="feature-card">
          <div className="feature-icon-circle">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Theo Dõi Tiến Bộ</h3>
          <p>Báo cáo chi tiết, streak, bảng xếp hạng</p>
        </div>

        {/* CARD 4  */}
        <div className="feature-card">
          <div className="feature-icon-circle">
            <i className="fas fa-user-graduate"></i>
          </div>
          <h3>Học Với Mentor</h3>
          <p>Gói Premium: hướng dẫn 1-1 từ chuyên gia</p>
        </div>
      </div>
    </section>
  </>
);

export default HeroSection;
