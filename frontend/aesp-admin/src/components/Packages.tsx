import React, { useState } from 'react';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  status: 'active' | 'inactive';
  subscribers: number;
}

const Packages: React.FC = () => {
  const [packages] = useState<Package[]>([
    {
      id: 'PKG001',
      name: 'Basic',
      price: 299000,
      duration: '1 tháng',
      features: ['Truy cập khóa học cơ bản', 'Hỗ trợ email', '10 bài tập'],
      status: 'active',
      subscribers: 145
    },
    {
      id: 'PKG002',
      name: 'Standard',
      price: 599000,
      duration: '3 tháng',
      features: ['Tất cả tính năng Basic', '1 mentor cá nhân', 'Bài tập không giới hạn', 'Chứng chỉ'],
      status: 'active',
      subscribers: 89
    },
    {
      id: 'PKG003',
      name: 'Premium',
      price: 999000,
      duration: '6 tháng',
      features: ['Tất cả tính năng Standard', '3 mentor chuyên gia', 'Học 1-1', 'Dự án thực tế', 'Hỗ trợ 24/7'],
      status: 'active',
      subscribers: 52
    },
    {
      id: 'PKG004',
      name: 'Enterprise',
      price: 1999000,
      duration: '12 tháng',
      features: ['Tất cả tính năng Premium', 'Mentor không giới hạn', 'Chương trình tùy chỉnh', 'Hỗ trợ ưu tiên'],
      status: 'inactive',
      subscribers: 23
    }
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Gói Dịch vụ & Giá</h2>
        <button className="btn btn-primary">➕ Tạo gói mới</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-label">Tổng gói dịch vụ</div>
            <div className="stat-value">{packages.length}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-label">Tổng đăng ký</div>
            <div className="stat-value">{packages.reduce((sum, p) => sum + p.subscribers, 0)}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-label">Doanh thu ước tính</div>
            <div className="stat-value">
              {formatPrice(packages.reduce((sum, p) => sum + (p.price * p.subscribers), 0))}
            </div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Gói đang hoạt động</div>
            <div className="stat-value">{packages.filter(p => p.status === 'active').length}</div>
          </div>
        </div>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`package-card ${pkg.status === 'inactive' ? 'inactive' : ''}`}>
            <div className="package-header">
              <div>
                <h3>{pkg.name}</h3>
                <p className="package-id">{pkg.id}</p>
              </div>
              <span className={`badge ${pkg.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                {pkg.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              </span>
            </div>

            <div className="package-price">
              <div className="price-amount">{formatPrice(pkg.price)}</div>
              <div className="price-duration">/{pkg.duration}</div>
            </div>

            <div className="package-features">
              <h4>Tính năng:</h4>
              <ul>
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="package-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span>{pkg.subscribers} đăng ký</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <span>{formatPrice(pkg.price * pkg.subscribers)}</span>
              </div>
            </div>

            <div className="package-actions">
              <button className="btn btn-secondary btn-block">✏️ Chỉnh sửa</button>
              <button className={`btn ${pkg.status === 'active' ? 'btn-danger' : 'btn-success'} btn-block`}>
                {pkg.status === 'active' ? '🔒 Vô hiệu hóa' : '🔓 Kích hoạt'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;