import { Link } from 'react-router-dom'

const HeroSection = () => (
  <section className="hero-section">
    <h1 className="hero-title">
      Luyện Nói Tiếng Anh Tự Tin <br />
      <span className="highlight">Không Sợ Sai</span>
    </h1>
    <p className="hero-subtitle">
      Hàng ngàn người Việt đã cải thiện phát âm và lưu loát chỉ sau 30 ngày với AI thông minh của AESP
    </p>
    <Link to="/auth?register" className="btn-primary-large">
      Bắt đầu ngay miễn phí
    </Link>
  </section>
)

export default HeroSection