import React, { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  mentorCount: number;
  status: 'active' | 'inactive';
}

const MentorSkills: React.FC = () => {
  const [skills] = useState<Skill[]>([
    { id: 'SKL001', name: 'JavaScript', category: 'Programming', mentorCount: 25, status: 'active' },
    { id: 'SKL002', name: 'React', category: 'Frontend', mentorCount: 18, status: 'active' },
    { id: 'SKL003', name: 'Node.js', category: 'Backend', mentorCount: 15, status: 'active' },
    { id: 'SKL004', name: 'Python', category: 'Programming', mentorCount: 22, status: 'active' },
    { id: 'SKL005', name: 'Django', category: 'Backend', mentorCount: 12, status: 'active' },
    { id: 'SKL006', name: 'Machine Learning', category: 'AI/ML', mentorCount: 8, status: 'active' },
    { id: 'SKL007', name: 'Java', category: 'Programming', mentorCount: 20, status: 'active' },
    { id: 'SKL008', name: 'Spring Boot', category: 'Backend', mentorCount: 14, status: 'active' },
    { id: 'SKL009', name: 'Angular', category: 'Frontend', mentorCount: 10, status: 'inactive' },
    { id: 'SKL010', name: 'Docker', category: 'DevOps', mentorCount: 16, status: 'active' }
  ]);

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Kỹ năng Mentor</h2>
        <button className="btn btn-primary">➕ Thêm kỹ năng</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-label">Tổng kỹ năng</div>
            <div className="stat-value">{skills.length}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Kỹ năng hoạt động</div>
            <div className="stat-value">{skills.filter(s => s.status === 'active').length}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <div className="stat-label">Danh mục</div>
            <div className="stat-value">{categories.length}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <div className="stat-label">Mentor trung bình/kỹ năng</div>
            <div className="stat-value">
              {Math.round(skills.reduce((sum, s) => sum + s.mentorCount, 0) / skills.length)}
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Danh sách Kỹ năng</h3>
          <div className="filter-group">
            <select>
              <option value="">Tất cả danh mục</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select>
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên kỹ năng</th>
                <th>Danh mục</th>
                <th>Số mentor</th>
                <th>Trạng thái</th>
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
                  <td>
                    <strong>{skill.mentorCount}</strong> mentor
                  </td>
                  <td>
                    <span className={`badge ${skill.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {skill.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem mentor">👁️</button>
                      <button className="btn-icon" title="Chỉnh sửa">✏️</button>
                      <button className="btn-icon btn-danger" title="Xóa">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
          Kỹ năng theo Danh mục
        </h3>
        <div className="packages-grid">
          {categories.map((category) => {
            const categorySkills = skills.filter(s => s.category === category);
            return (
              <div key={category} className="package-card">
                <div className="package-header">
                  <div>
                    <h3>{category}</h3>
                    <p className="package-id">{categorySkills.length} kỹ năng</p>
                  </div>
                </div>
                <div className="skills-list" style={{ marginTop: '16px' }}>
                  {categorySkills.map(skill => (
                    <span key={skill.id} className="badge badge-skill">
                      {skill.name} ({skill.mentorCount})
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorSkills;