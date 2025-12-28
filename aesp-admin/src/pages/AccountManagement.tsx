import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Learner' | 'Mentor';
  status: 'active' | 'disabled';
  date: string;
  packages?: string;
  skills?: string[];
  rating?: number;
  students?: number;
}

const AccountManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'mentors' | 'skills'>('users');
  const [users, setUsers] = useState<User[]>([
    { id: '#101', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Learner', status: 'active', date: '15/01/2025', packages: 'Premium' },
    { id: '#102', name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Learner', status: 'active', date: '10/01/2025', packages: 'Basic' },
    { id: '#M001', name: 'Lê Văn Mentor C', email: 'mentorc@email.com', role: 'Mentor', status: 'active', date: '05/01/2025', skills: ['JavaScript', 'React'], rating: 4.8, students: 45 },
    { id: '#M002', name: 'Phạm Thị Mentor D', email: 'mentord@email.com', role: 'Mentor', status: 'active', date: '01/01/2025', skills: ['Python', 'Django'], rating: 4.9, students: 62 }
  ]);

  const skills = [
    { id: 'SKL001', name: 'JavaScript', category: 'Programming', mentorCount: 25 },
    { id: 'SKL002', name: 'React', category: 'Frontend', mentorCount: 18 },
    { id: 'SKL003', name: 'Python', category: 'Programming', mentorCount: 22 },
    { id: 'SKL004', name: 'Django', category: 'Backend', mentorCount: 12 }
  ];

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'active' ? 'disabled' : 'active' } : user
    ));
  };

  const renderUsers = () => {
    const learners = users.filter(u => u.role === 'Learner');
    return (
      <div className="table-card">
        <div className="table-header">
          <h3>Danh sách Người dùng</h3>
          <div className="filter-group">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Tìm kiếm..." />
            </div>
            <select>
              <option>Tất cả trạng thái</option>
              <option>Hoạt động</option>
              <option>Đã khóa</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Gói dịch vụ</th>
                <th>Trạng thái</th>
                <th>Ngày tham gia</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {learners.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{user.name[0]}</div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.packages || '-'}</td>
                  <td>
                    <span className={`badge badge-${user.status === 'active' ? 'success' : 'danger'}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td>{user.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem">👁️</button>
                      <button className="btn-icon" title="Sửa">✏️</button>
                      <button 
                        className={`btn-icon ${user.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleUserStatus(user.id)}
                        title={user.status === 'active' ? 'Khóa' : 'Kích hoạt'}
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
      </div>
    );
  };

  const renderMentors = () => {
    const mentors = users.filter(u => u.role === 'Mentor');
    return (
      <div className="table-card">
        <div className="table-header">
          <h3>Danh sách Mentor</h3>
          <button className="btn btn-primary">➕ Thêm Mentor</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Mentor</th>
                <th>Email</th>
                <th>Kỹ năng</th>
                <th>Đánh giá</th>
                <th>Học viên</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.id}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{mentor.name[0]}</div>
                      <span>{mentor.name}</span>
                    </div>
                  </td>
                  <td>{mentor.email}</td>
                  <td>
                    <div className="skills-list">
                      {mentor.skills?.map((skill, idx) => (
                        <span key={idx} className="badge badge-skill">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="rating">
                      <span>⭐</span>
                      <span>{mentor.rating}</span>
                    </div>
                  </td>
                  <td>{mentor.students}</td>
                  <td>
                    <span className={`badge badge-${mentor.status === 'active' ? 'success' : 'danger'}`}>
                      {mentor.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem">👁️</button>
                      <button className="btn-icon" title="Sửa">✏️</button>
                      <button 
                        className={`btn-icon ${mentor.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleUserStatus(mentor.id)}
                      >
                        {mentor.status === 'active' ? '🔒' : '🔓'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    return (
      <div className="table-card">
        <div className="table-header">
          <h3>Kỹ năng Mentor</h3>
          <button className="btn btn-primary">➕ Thêm kỹ năng</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên kỹ năng</th>
                <th>Danh mục</th>
                <th>Số mentor</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>
                    <span className="badge badge-skill" style={{ fontSize: '14px', padding: '8px 16px' }}>
                      {skill.name}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-secondary">{skill.category}</span>
                  </td>
                  <td><strong>{skill.mentorCount}</strong> mentor</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem">👁️</button>
                      <button className="btn-icon" title="Sửa">✏️</button>
                      <button className="btn-icon btn-danger" title="Xóa">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Tài khoản</h2>
        <button className="btn btn-primary">➕ Thêm tài khoản</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-label">Tổng người dùng</div>
            <div className="stat-value">{users.length}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <div className="stat-label">Learners</div>
            <div className="stat-value">{users.filter(u => u.role === 'Learner').length}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <div className="stat-label">Mentors</div>
            <div className="stat-value">{users.filter(u => u.role === 'Mentor').length}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-label">Kỹ năng</div>
            <div className="stat-value">{skills.length}</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', borderBottom: '2px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('users')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'users' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'users' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'users' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          👤 Người dùng
        </button>
        <button 
          onClick={() => setActiveTab('mentors')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'mentors' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'mentors' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'mentors' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          🎓 Mentors
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'skills' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'skills' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: activeTab === 'skills' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          ⭐ Kỹ năng
        </button>
      </div>

      {activeTab === 'users' && renderUsers()}
      {activeTab === 'mentors' && renderMentors()}
      {activeTab === 'skills' && renderSkills()}
    </div>
  );
};

export default AccountManagement;