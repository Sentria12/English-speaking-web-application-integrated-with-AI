import React, { useState } from 'react';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'statistics' | 'policies' | 'settings'>('statistics');

  const policies = [
    { id: 'POL001', title: 'Chính sách Bảo mật', category: 'Bảo mật', version: '2.1', status: 'active', lastUpdate: '15/12/2025' },
    { id: 'POL002', title: 'Điều khoản Sử dụng', category: 'Điều khoản', version: '3.0', status: 'active', lastUpdate: '20/12/2025' },
    { id: 'POL003', title: 'Chính sách Hoàn tiền', category: 'Thanh toán', version: '1.5', status: 'active', lastUpdate: '10/12/2025' }
  ];

  const renderStatistics = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-label">Tổng người dùng</div>
            <div className="stat-value">2,847</div>
            <div className="stat-change up">↑ 12%</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <div className="stat-label">Tổng Mentor</div>
            <div className="stat-value">127</div>
            <div className="stat-change up">↑ 5%</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-label">Doanh thu tháng</div>
            <div className="stat-value">₫45.2M</div>
            <div className="stat-change up">↑ 23%</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-label">Gói đã bán</div>
            <div className="stat-value">286</div>
            <div className="stat-change up">↑ 18%</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Người dùng mới theo thời gian</h3>
            <select className="chart-filter">
              <option>30 ngày</option>
              <option>90 ngày</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-icon">📊</div>
            <p>Biểu đồ người dùng mới</p>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Doanh thu theo gói</h3>
            <select className="chart-filter">
              <option>Quý này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-icon">📈</div>
            <p>Biểu đồ doanh thu</p>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Top Mentor (Tháng này)</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Xếp hạng</th>
                <th>Mentor</th>
                <th>Học viên</th>
                <th>Đánh giá</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Nguyễn Văn A', students: 62, rating: 4.9, revenue: '₫12.4M' },
                { name: 'Trần Thị B', students: 58, rating: 4.8, revenue: '₫11.6M' },
                { name: 'Lê Văn C', students: 45, rating: 4.7, revenue: '₫9.0M' }
              ].map((mentor, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: idx < 3 ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'var(--light)',
                      color: idx < 3 ? 'white' : 'var(--dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700'
                    }}>
                      #{idx + 1}
                    </div>
                  </td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{mentor.name[0]}</div>
                      <span>{mentor.name}</span>
                    </div>
                  </td>
                  <td><strong>{mentor.students}</strong> học viên</td>
                  <td>
                    <div className="rating">
                      <span>⭐</span>
                      <span>{mentor.rating}</span>
                    </div>
                  </td>
                  <td><strong>{mentor.revenue}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderPolicies = () => (
    <div className="table-card">
      <div className="table-header">
        <h3>Chính sách Hệ thống</h3>
        <button className="btn btn-primary">➕ Tạo chính sách</button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Phiên bản</th>
              <th>Trạng thái</th>
              <th>Cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td><strong>{policy.id}</strong></td>
                <td>{policy.title}</td>
                <td>
                  <span className="badge badge-info">{policy.category}</span>
                </td>
                <td>
                  <span className="badge badge-secondary">v{policy.version}</span>
                </td>
                <td>
                  <span className="badge badge-success">Đang áp dụng</span>
                </td>
                <td>{policy.lastUpdate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Xem">👁️</button>
                    <button className="btn-icon" title="Sửa">✏️</button>
                    <button className="btn-icon" title="Lịch sử">📜</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <div className="table-card" style={{ marginBottom: '24px' }}>
        <div className="table-header">
          <h3>Cấu hình Chung</h3>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--light)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Chế độ bảo trì</div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Tạm dừng truy cập hệ thống</div>
              </div>
              <button className="btn btn-secondary">Tắt</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--light)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Email thông báo</div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Gửi email cho admin khi có sự kiện quan trọng</div>
              </div>
              <button className="btn btn-success">Bật</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--light)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Tự động sao lưu</div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Sao lưu dữ liệu hàng ngày lúc 2:00 AM</div>
              </div>
              <button className="btn btn-success">Bật</button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Trạng thái Hệ thống</h3>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Server Status', value: 'Online', status: 'success' },
              { label: 'Database', value: 'Connected', status: 'success' },
              { label: 'API', value: 'Healthy', status: 'success' },
              { label: 'Backup', value: 'Scheduled', status: 'warning' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: item.status === 'success' ? 'var(--success)' : 'var(--warning)',
                  boxShadow: `0 0 8px ${item.status === 'success' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)'}`
                }}></div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--gray)' }}>{item.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Cài đặt Hệ thống</h2>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', borderBottom: '2px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('statistics')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'statistics' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'statistics' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'statistics' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          📊 Thống kê & Báo cáo
        </button>
        <button 
          onClick={() => setActiveTab('policies')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'policies' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'policies' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'policies' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          📋 Chính sách
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'settings' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'settings' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'settings' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          ⚙️ Cấu hình
        </button>
      </div>

      {activeTab === 'statistics' && renderStatistics()}
      {activeTab === 'policies' && renderPolicies()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
};

export default SystemSettings;