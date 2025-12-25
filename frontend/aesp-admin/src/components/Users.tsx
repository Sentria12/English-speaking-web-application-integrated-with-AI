import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Learner' | 'Mentor';
  status: 'active' | 'disabled';
  date: string;
  packages?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '#101', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Learner', status: 'active', date: '15/01/2025', packages: 'Premium' },
    { id: '#102', name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Learner', status: 'active', date: '10/01/2025', packages: 'Basic' },
    { id: '#103', name: 'Lê Văn C', email: 'levanc@email.com', role: 'Mentor', status: 'active', date: '05/01/2025' },
    { id: '#104', name: 'Phạm Thị D', email: 'phamthid@email.com', role: 'Learner', status: 'disabled', date: '01/01/2025', packages: 'Standard' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'Learner' | 'Mentor'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'disabled'>('all');

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'active' ? 'disabled' : 'active' };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    const matchStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Tài khoản Người dùng</h2>
        <button className="btn btn-primary">➕ Thêm tài khoản</button>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value as any)}>
              <option value="all">Tất cả vai trò</option>
              <option value="Learner">Learner</option>
              <option value="Mentor">Mentor</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="disabled">Đã khóa</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Gói dịch vụ</th>
                <th>Trạng thái</th>
                <th>Ngày tham gia</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{user.name[0]}</div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'Mentor' ? 'badge-info' : 'badge-secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.packages || '-'}</td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td>{user.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết">👁️</button>
                      <button className="btn-icon" title="Chỉnh sửa">✏️</button>
                      <button 
                        className={`btn-icon ${user.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                        title={user.status === 'active' ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === 'active' ? '🔒' : '🔓'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="pagination-info">
            Hiển thị {filteredUsers.length} trên tổng số {users.length} tài khoản
          </div>
          <div className="pagination">
            <button className="btn-page">‹</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">2</button>
            <button className="btn-page">3</button>
            <button className="btn-page">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;