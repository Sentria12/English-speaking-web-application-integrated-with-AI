import React, { useState } from 'react';

const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30days');

  const overviewStats = [
    { icon: '👥', label: 'Tổng người dùng', value: '2,847', change: '+12%', trend: 'up' },
    { icon: '🎓', label: 'Tổng Mentor', value: '127', change: '+5%', trend: 'up' },
    { icon: '💰', label: 'Doanh thu tháng', value: '₫45.2M', change: '+23%', trend: 'up' },
    { icon: '📦', label: 'Gói đã bán', value: '286', change: '+18%', trend: 'up' }
  ];

  const userStats = [
    { label: 'Người dùng mới (30 ngày)', value: '342', icon: '🆕' },
    { label: 'Người dùng hoạt động', value: '1,923', icon: '✅' },
    { label: 'Tỷ lệ giữ chân', value: '87.5%', icon: '📊' },
    { label: 'Thời gian TB/phiên', value: '24 phút', icon: '⏱️' }
  ];

  const packageStats = [
    { name: 'Basic', sold: 145, revenue: 43355000, percentage: 35 },
    { name: 'Standard', sold: 89, revenue: 53311000, percentage: 31 },
    { name: 'Premium', sold: 52, revenue: 51948000, percentage: 29 },
    { name: 'Enterprise', sold: 23, revenue: 45977000, percentage: 5 }
  ];

  const mentorStats = [
    { name: 'Top 1: Nguyễn Văn A', students: 62, rating: 4.9, revenue: '₫12.4M' },
    { name: 'Top 2: Trần Thị B', students: 58, rating: 4.8, revenue: '₫11.6M' },
    { name: 'Top 3: Lê Văn C', students: 45, rating: 4.7, revenue: '₫9.0M' },
    { name: 'Top 4: Phạm Thị D', students: 42, rating: 4.6, revenue: '₫8.4M' },
    { name: 'Top 5: Hoàng Văn E', students: 38, rating: 4.5, revenue: '₫7.6M' }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Thống kê & Báo cáo</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ 
              padding: '10px 16px',
              border: '2px solid var(--border)',
              borderRadius: '10px',
              fontSize: '14px',
              cursor: 'pointer',
              background: 'var(--white)',
              fontFamily: 'inherit'
            }}
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="year">Năm nay</option>
            <option value="all">Toàn bộ</option>
          </select>
          <button className="btn btn-secondary">📥 Xuất báo cáo</button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        {overviewStats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${['blue', 'green', 'purple', 'orange'][idx]}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change} so với tháng trước
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Người dùng mới theo thời gian</h3>
            <select className="chart-filter">
              <option>7 ngày</option>
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
              <option>Tháng này</option>
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

      {/* User Statistics */}
      <div className="table-card">
        <div className="table-header">
          <h3>Thống kê Người dùng</h3>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            {userStats.map((stat, idx) => (
              <div key={idx} style={{ 
                padding: '20px',
                background: 'var(--light)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Statistics */}
      <div className="table-card">
        <div className="table-header">
          <h3>Thống kê Gói Dịch vụ</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Gói dịch vụ</th>
                <th>Số lượng bán</th>
                <th>Doanh thu</th>
                <th>Tỷ trọng</th>
                <th>Xu hướng</th>
              </tr>
            </thead>
            <tbody>
              {packageStats.map((pkg, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '14px', padding: '8px 16px' }}>
                      {pkg.name}
                    </span>
                  </td>
                  <td><strong>{pkg.sold}</strong> gói</td>
                  <td><strong>{formatPrice(pkg.revenue)}</strong></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        flex: 1, 
                        height: '8px', 
                        background: 'var(--light)', 
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${pkg.percentage}%`, 
                          height: '100%', 
                          background: 'var(--primary)',
                          transition: 'width 0.3s'
                        }}></div>
                      </div>
                      <span style={{ fontWeight: '600', minWidth: '45px' }}>{pkg.percentage}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="stat-change up">↑ {Math.floor(Math.random() * 20 + 5)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Mentors */}
      <div className="table-card">
        <div className="table-header">
          <h3>Top Mentor (Tháng này)</h3>
          <button className="btn btn-secondary">Xem tất cả</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Xếp hạng</th>
                <th>Mentor</th>
                <th>Số học viên</th>
                <th>Đánh giá</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {mentorStats.map((mentor, idx) => (
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
                      <div className="user-avatar-small">{mentor.name.split(' ')[2][0]}</div>
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

      {/* Quick Stats Summary */}
      <div style={{ 
        marginTop: '32px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        borderRadius: '16px',
        border: '1px solid var(--border)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
          📊 Tóm tắt Hiệu suất
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px' 
        }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '4px' }}>
              Tỷ lệ chuyển đổi (Visitor → User)
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>
              3.2%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '4px' }}>
              Giá trị TB mỗi người dùng (ARPU)
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>
              ₫527,000
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '4px' }}>
              Tỷ lệ hài lòng
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>
              92.4%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '4px' }}>
              Thời gian phản hồi TB
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>
              2.3 giờ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;