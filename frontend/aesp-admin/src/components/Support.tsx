import React, { useState } from 'react';

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
}

const Support: React.FC = () => {
  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TKT001',
      userId: '#101',
      userName: 'Nguyễn Văn A',
      subject: 'Không thể truy cập khóa học',
      category: 'Kỹ thuật',
      priority: 'high',
      status: 'open',
      createdDate: '25/12/2025 10:30',
      lastUpdate: '25/12/2025 10:30'
    },
    {
      id: 'TKT002',
      userId: '#102',
      userName: 'Trần Thị B',
      subject: 'Hỏi về gói Premium',
      category: 'Tư vấn',
      priority: 'medium',
      status: 'in-progress',
      createdDate: '24/12/2025 14:20',
      lastUpdate: '25/12/2025 09:15',
      assignedTo: 'Admin A'
    },
    {
      id: 'TKT003',
      userId: '#104',
      userName: 'Phạm Thị D',
      subject: 'Yêu cầu hoàn tiền',
      category: 'Thanh toán',
      priority: 'high',
      status: 'in-progress',
      createdDate: '24/12/2025 11:00',
      lastUpdate: '24/12/2025 16:30',
      assignedTo: 'Admin B'
    },
    {
      id: 'TKT004',
      userId: '#105',
      userName: 'Hoàng Văn E',
      subject: 'Lỗi video không phát được',
      category: 'Kỹ thuật',
      priority: 'medium',
      status: 'resolved',
      createdDate: '23/12/2025 09:45',
      lastUpdate: '23/12/2025 15:20',
      assignedTo: 'Admin A'
    },
    {
      id: 'TKT005',
      userId: '#106',
      userName: 'Võ Thị F',
      subject: 'Muốn thay đổi mentor',
      category: 'Mentor',
      priority: 'low',
      status: 'closed',
      createdDate: '22/12/2025 16:00',
      lastUpdate: '23/12/2025 10:00',
      assignedTo: 'Admin C'
    }
  ]);

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Hỗ trợ Học viên</h2>
        <button className="btn btn-primary">➕ Tạo ticket mới</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">🎧</div>
          <div className="stat-info">
            <div className="stat-label">Tổng yêu cầu</div>
            <div className="stat-value">{tickets.length}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">🆕</div>
          <div className="stat-info">
            <div className="stat-label">Yêu cầu mới</div>
            <div className="stat-value">{openTickets}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <div className="stat-label">Đang xử lý</div>
            <div className="stat-value">{inProgressTickets}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Đã giải quyết</div>
            <div className="stat-value">{resolvedTickets}</div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm ticket..." />
          </div>
          <div className="filter-group">
            <select>
              <option value="">Tất cả danh mục</option>
              <option value="Kỹ thuật">Kỹ thuật</option>
              <option value="Tư vấn">Tư vấn</option>
              <option value="Thanh toán">Thanh toán</option>
              <option value="Mentor">Mentor</option>
            </select>
            <select>
              <option value="">Tất cả ưu tiên</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
            <select>
              <option value="">Tất cả trạng thái</option>
              <option value="open">Mới</option>
              <option value="in-progress">Đang xử lý</option>
              <option value="resolved">Đã giải quyết</option>
              <option value="closed">Đã đóng</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã ticket</th>
                <th>Học viên</th>
                <th>Tiêu đề</th>
                <th>Danh mục</th>
                <th>Ưu tiên</th>
                <th>Trạng thái</th>
                <th>Phân công</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td><strong>{ticket.id}</strong></td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{ticket.userName[0]}</div>
                      <div>
                        <div>{ticket.userName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                          {ticket.userId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '250px' }}>
                      <div style={{ fontWeight: '600' }}>{ticket.subject}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>
                        Cập nhật: {ticket.lastUpdate}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-secondary">{ticket.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      ticket.priority === 'high' ? 'badge-danger' :
                      ticket.priority === 'medium' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {ticket.priority === 'high' ? '🔴 Cao' :
                       ticket.priority === 'medium' ? '🟡 TB' :
                       '🔵 Thấp'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      ticket.status === 'open' ? 'badge-warning' :
                      ticket.status === 'in-progress' ? 'badge-info' :
                      ticket.status === 'resolved' ? 'badge-success' :
                      'badge-secondary'
                    }`}>
                      {ticket.status === 'open' ? 'Mới' :
                       ticket.status === 'in-progress' ? 'Đang xử lý' :
                       ticket.status === 'resolved' ? 'Đã giải quyết' :
                       'Đã đóng'}
                    </span>
                  </td>
                  <td>{ticket.assignedTo || <span style={{ color: 'var(--gray)' }}>Chưa phân công</span>}</td>
                  <td>{ticket.createdDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết">👁️</button>
                      <button className="btn-icon" title="Phản hồi">💬</button>
                      <button className="btn-icon btn-success" title="Giải quyết">✅</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="pagination-info">
            Hiển thị {tickets.length} yêu cầu
          </div>
          <div className="pagination">
            <button className="btn-page">‹</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">2</button>
            <button className="btn-page">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;