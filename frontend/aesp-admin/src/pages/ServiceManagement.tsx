import React, { useState } from 'react';

const ServiceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packages' | 'purchases'>('packages');

  const packages = [
    { id: 'PKG001', name: 'Basic', price: 299000, duration: '1 tháng', features: ['Khóa học cơ bản', 'Hỗ trợ email'], subscribers: 145, status: 'active' },
    { id: 'PKG002', name: 'Standard', price: 599000, duration: '3 tháng', features: ['Tất cả Basic', '1 mentor', 'Chứng chỉ'], subscribers: 89, status: 'active' },
    { id: 'PKG003', name: 'Premium', price: 999000, duration: '6 tháng', features: ['Tất cả Standard', '3 mentor', 'Học 1-1', 'Dự án'], subscribers: 52, status: 'active' }
  ];

  const purchases = [
    { id: 'PUR001', userId: '#101', userName: 'Nguyễn Văn A', package: 'Premium', price: 999000, date: '15/01/2025', endDate: '15/07/2025', status: 'active', payment: 'Chuyển khoản' },
    { id: 'PUR002', userId: '#102', userName: 'Trần Thị B', package: 'Basic', price: 299000, date: '10/01/2025', endDate: '10/02/2025', status: 'active', payment: 'Thẻ tín dụng' },
    { id: 'PUR003', userId: '#104', userName: 'Phạm Thị D', package: 'Standard', price: 599000, date: '01/01/2025', endDate: '01/04/2025', status: 'expired', payment: 'Ví điện tử' }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const renderPackages = () => (
    <>
      <div className="table-header" style={{ marginBottom: '24px' }}>
        <h3>Quản lý Gói Dịch vụ</h3>
        <button className="btn btn-primary">➕ Tạo gói mới</button>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <div className="package-header">
              <div>
                <h3>{pkg.name}</h3>
                <p className="package-id">{pkg.id}</p>
              </div>
              <span className={`badge badge-${pkg.status === 'active' ? 'success' : 'danger'}`}>
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
    </>
  );

  const renderPurchases = () => (
    <div className="table-card">
      <div className="table-header">
        <h3>Lịch sử Mua Gói</h3>
        <div className="filter-group">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm..." />
          </div>
          <select>
            <option>Tất cả gói</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
          <button className="btn btn-secondary">📥 Xuất báo cáo</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã GD</th>
              <th>Người dùng</th>
              <th>Gói</th>
              <th>Giá trị</th>
              <th>Ngày mua</th>
              <th>Hết hạn</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td><strong>{purchase.id}</strong></td>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-small">{purchase.userName[0]}</div>
                    <div>
                      <div>{purchase.userName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{purchase.userId}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-info">{purchase.package}</span>
                </td>
                <td><strong>{formatPrice(purchase.price)}</strong></td>
                <td>{purchase.date}</td>
                <td>{purchase.endDate}</td>
                <td>{purchase.payment}</td>
                <td>
                  <span className={`badge badge-${purchase.status === 'active' ? 'success' : 'danger'}`}>
                    {purchase.status === 'active' ? 'Đang hoạt động' : 'Đã hết hạn'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Xem">👁️</button>
                    <button className="btn-icon" title="In hóa đơn">🖨️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const totalRevenue = purchases.reduce((sum, p) => sum + p.price, 0);
  const totalSubscribers = packages.reduce((sum, p) => sum + p.subscribers, 0);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Dịch vụ</h2>
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
            <div className="stat-value">{totalSubscribers}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-label">Tổng doanh thu</div>
            <div className="stat-value">{formatPrice(totalRevenue)}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">💳</div>
          <div className="stat-info">
            <div className="stat-label">Giao dịch</div>
            <div className="stat-value">{purchases.length}</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', borderBottom: '2px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('packages')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'packages' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'packages' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'packages' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          📦 Gói dịch vụ
        </button>
        <button 
          onClick={() => setActiveTab('purchases')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'purchases' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'purchases' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'purchases' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          💳 Lịch sử mua
        </button>
      </div>

      {activeTab === 'packages' && renderPackages()}
      {activeTab === 'purchases' && renderPurchases()}
    </div>
  );
};

export default ServiceManagement;