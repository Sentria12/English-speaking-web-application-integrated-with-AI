import React, { useState } from 'react';

interface Mentor {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  rating: number;
  students: number;
  status: 'active' | 'disabled';
  joinDate: string;
}

const Mentors: React.FC = () => {
  const [mentors] = useState<Mentor[]>([
    {
      id: '#M001',
      name: 'Nguyễn Văn Mentor A',
      email: 'mentora@aesp.com',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '5 năm',
      rating: 4.8,
      students: 45,
      status: 'active',
      joinDate: '01/01/2024'
    },
    {
      id: '#M002',
      name: 'Trần Thị Mentor B',
      email: 'mentorb@aesp.com',
      skills: ['Python', 'Django', 'Machine Learning'],
      experience: '7 năm',
      rating: 4.9,
      students: 62,
      status: 'active',
      joinDate: '15/02/2024'
    },
    {
      id: '#M003',
      name: 'Lê Văn Mentor C',
      email: 'mentorc@aesp.com',
      skills: ['Java', 'Spring Boot', 'Microservices'],
      experience: '4 năm',
      rating: 4.6,
      students: 38,
      status: 'disabled',
      joinDate: '10/03/2024'
    }
  ]);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Danh sách Mentor</h2>
        <button className="btn btn-primary">➕ Thêm Mentor</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <div className="stat-label">Tổng số Mentor</div>
            <div className="stat-value">{mentors.length}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Mentor hoạt động</div>
            <div className="stat-value">{mentors.filter(m => m.status === 'active').length}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-label">Tổng học viên</div>
            <div className="stat-value">{mentors.reduce((sum, m) => sum + m.students, 0)}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-label">Đánh giá trung bình</div>
            <div className="stat-value">
              {(mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm mentor..." />
          </div>
          <button className="btn btn-secondary">🔽 Lọc</button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Mentor</th>
                <th>Email</th>
                <th>Kỹ năng</th>
                <th>Kinh nghiệm</th>
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
                      {mentor.skills.map((skill, idx) => (
                        <span key={idx} className="badge badge-skill">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td>{mentor.experience}</td>
                  <td>
                    <div className="rating">
                      <span>⭐</span>
                      <span>{mentor.rating}</span>
                    </div>
                  </td>
                  <td>{mentor.students}</td>
                  <td>
                    <span className={`badge ${mentor.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {mentor.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết">👁️</button>
                      <button className="btn-icon" title="Chỉnh sửa">✏️</button>
                      <button className="btn-icon btn-danger" title="Khóa/Mở khóa">
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
    </div>
  );
};

export default Mentors;