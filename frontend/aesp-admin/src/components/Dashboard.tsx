import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { icon: '👥', label: 'Tổng người dùng', value: '2,847', change: '↑ 12% so với tháng trước', color: 'blue' },
    { icon: '✅', label: 'Người học hoạt động', value: '1,923', change: '↑ 8% so với tháng trước', color: 'green' },
    { icon: '💰', label: 'Doanh thu tháng', value: '₫45.2M', change: '↑ 23% so với tháng trước', color: 'purple' },
    { icon: '🎓', label: 'Mentor hoạt động', value: '127', change: '↑ 5% so với tháng trước', color: 'orange' }
  ];

  const activities = [
    { id: '#001', user: 'Nguyễn Văn A', action: 'Đăng ký gói Premium', time: '5 phút trước', status: 'success', badge: 'Thành công' },
    { id: '#002', user: 'Trần Thị B', action: 'Hoàn thành bài kiểm tra', time: '12 phút trước', status: 'success', badge: 'Hoàn thành' },
    { id: '#003', user: 'Lê Văn C', action: 'Yêu cầu hỗ trợ', time: '25 phút trước', status: 'warning', badge: 'Đang xử lý' },
    { id: '#004', user: 'Phạm Thị D', action: 'Đăng ký mentor mới', time: '1 giờ trước', status: 'success', badge: 'Thành công' },
    { id: '#005', user: 'Hoàng Văn E', action: 'Gửi feedback', time: '2 giờ trước', status: 'warning', badge: 'Chờ duyệt' }
  ];

  const quickStats = [
    { label: 'Yêu cầu hỗ trợ chờ xử lý', value: '12', color: 'orange', link: 'support' },
    { label: 'Feedback chờ kiểm duyệt', value: '8', color: 'purple', link: 'moderation' },
    { label: 'Gói dịch vụ đang hoạt động', value: '4', color: 'green', link: 'packages' },
    { label: 'Chính sách cần cập nhật', value: '3', color: 'blue', link: 'policies' }
  ];

  return (
    <div className="page-content">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--dark)', marginBottom: '8px' }}>
          Dashboard
        </h2>
        <p style={{ color: 'var(--gray)', fontSize: '15px' }}>
          Chào mừng trở lại! Đây là tổng quan về hệ thống AESP.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change up">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Người dùng mới (30 ngày)</h3>
            <select className="chart-filter">
              <option>7 ngày</option>
              <option selected>30 ngày</option>
              <option>90 ngày</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-icon">📊</div>
            <p>Kết nối database để hiển thị biểu đồ</p>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Doanh thu theo gói</h3>
            <select className="chart-filter">
              <option>Tháng này</option>
              <option selected>Quý này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-icon">📈</div>
            <p>Kết nối database để hiển thị biểu đồ</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="table-card">
        <div className="table-header">
          <h3>Cần xử lý</h3>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px' 
          }}>
            {quickStats.map((stat, idx) => (
              <div 
                key={idx}
                style={{ 
                  padding: '20px',
                  background: 'var(--light)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '13px', color: 'var(--gray)' }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: '20px' }}>→</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--dark)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="table-card">
        <div className="table-header">
          <h3>Hoạt động gần đây</h3>
          <button className="btn btn-secondary">Xem tất cả</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Người dùng</th>
                <th>Hoạt động</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{activity.id}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{activity.user[0]}</div>
                      <span>{activity.user}</span>
                    </div>
                  </td>
                  <td>{activity.action}</td>
                  <td>{activity.time}</td>
                  <td>
                    <span className={`badge ${
                      activity.status === 'success' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {activity.badge}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon" title="Xem chi tiết">👁️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div style={{ 
        marginTop: '32px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        borderRadius: '16px',
        border: '1px solid var(--border)'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚡</span>
          <span>Trạng thái Hệ thống</span>
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: 'var(--success)',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
            }}></div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Server Status</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark)' }}>Online</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: 'var(--success)',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
            }}></div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Database</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark)' }}>Connected</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: 'var(--success)',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
            }}></div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--gray)' }}>API</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark)' }}>Healthy</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: 'var(--warning)',
              boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)'
            }}></div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Backup</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--dark)' }}>Scheduled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;