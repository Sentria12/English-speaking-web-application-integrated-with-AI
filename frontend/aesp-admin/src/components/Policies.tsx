import React, { useState } from 'react';

interface Policy {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  createdDate: string;
  lastUpdate: string;
  updatedBy: string;
}

const Policies: React.FC = () => {
  const [policies] = useState<Policy[]>([
    {
      id: 'POL001',
      title: 'Chính sách Bảo mật Thông tin',
      category: 'Bảo mật',
      description: 'Quy định về thu thập, lưu trữ và bảo vệ thông tin cá nhân người dùng',
      content: 'Nội dung chi tiết chính sách bảo mật...',
      version: '2.1',
      status: 'active',
      createdDate: '01/01/2024',
      lastUpdate: '15/12/2025',
      updatedBy: 'Admin A'
    },
    {
      id: 'POL002',
      title: 'Điều khoản Sử dụng Dịch vụ',
      category: 'Điều khoản',
      description: 'Các điều khoản và điều kiện khi sử dụng nền tảng AESP',
      content: 'Nội dung điều khoản sử dụng...',
      version: '3.0',
      status: 'active',
      createdDate: '01/01/2024',
      lastUpdate: '20/12/2025',
      updatedBy: 'Admin B'
    },
    {
      id: 'POL003',
      title: 'Chính sách Hoàn tiền',
      category: 'Thanh toán',
      description: 'Quy định về điều kiện và quy trình hoàn tiền cho học viên',
      content: 'Nội dung chính sách hoàn tiền...',
      version: '1.5',
      status: 'active',
      createdDate: '15/02/2024',
      lastUpdate: '10/12/2025',
      updatedBy: 'Admin A'
    },
    {
      id: 'POL004',
      title: 'Quy tắc Ứng xử Cộng đồng',
      category: 'Cộng đồng',
      description: 'Quy định về cách ứng xử và tương tác trong cộng đồng AESP',
      content: 'Nội dung quy tắc ứng xử...',
      version: '2.0',
      status: 'active',
      createdDate: '01/03/2024',
      lastUpdate: '05/12/2025',
      updatedBy: 'Admin C'
    },
    {
      id: 'POL005',
      title: 'Chính sách Mentor',
      category: 'Mentor',
      description: 'Quy định về tiêu chuẩn, trách nhiệm và quyền lợi của Mentor',
      content: 'Nội dung chính sách mentor...',
      version: '1.8',
      status: 'draft',
      createdDate: '10/11/2024',
      lastUpdate: '20/12/2025',
      updatedBy: 'Admin B'
    },
    {
      id: 'POL006',
      title: 'Chính sách Cookie',
      category: 'Bảo mật',
      description: 'Thông tin về việc sử dụng cookie trên website',
      content: 'Nội dung chính sách cookie...',
      version: '1.0',
      status: 'archived',
      createdDate: '01/01/2024',
      lastUpdate: '01/06/2024',
      updatedBy: 'Admin A'
    }
  ]);

  const activeCount = policies.filter(p => p.status === 'active').length;
  const draftCount = policies.filter(p => p.status === 'draft').length;
  const categories = Array.from(new Set(policies.map(p => p.category)));

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý Chính sách Hệ thống</h2>
        <button className="btn btn-primary">➕ Tạo chính sách mới</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <div className="stat-label">Tổng chính sách</div>
            <div className="stat-value">{policies.length}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Đang áp dụng</div>
            <div className="stat-value">{activeCount}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <div className="stat-label">Bản nháp</div>
            <div className="stat-value">{draftCount}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <div className="stat-label">Danh mục</div>
            <div className="stat-value">{categories.length}</div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm chính sách..." />
          </div>
          <div className="filter-group">
            <select>
              <option value="">Tất cả danh mục</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select>
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang áp dụng</option>
              <option value="draft">Bản nháp</option>
              <option value="archived">Đã lưu trữ</option>
            </select>
          </div>
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
                <th>Cập nhật lần cuối</th>
                <th>Người cập nhật</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id}>
                  <td><strong>{policy.id}</strong></td>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {policy.title}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                        {policy.description}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{policy.category}</span>
                  </td>
                  <td>
                    <span className="badge badge-secondary">v{policy.version}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      policy.status === 'active' ? 'badge-success' :
                      policy.status === 'draft' ? 'badge-warning' :
                      'badge-secondary'
                    }`}>
                      {policy.status === 'active' ? 'Đang áp dụng' :
                       policy.status === 'draft' ? 'Bản nháp' :
                       'Đã lưu trữ'}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px' }}>
                      <div>{policy.lastUpdate}</div>
                      <div style={{ color: 'var(--gray)', marginTop: '2px' }}>
                        Tạo: {policy.createdDate}
                      </div>
                    </div>
                  </td>
                  <td>{policy.updatedBy}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem">👁️</button>
                      <button className="btn-icon" title="Chỉnh sửa">✏️</button>
                      <button className="btn-icon" title="Lịch sử">📜</button>
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
          Chính sách theo Danh mục
        </h3>
        <div className="packages-grid">
          {categories.map((category) => {
            const categoryPolicies = policies.filter(p => p.category === category);
            const activeInCategory = categoryPolicies.filter(p => p.status === 'active').length;
            
            return (
              <div key={category} className="package-card">
                <div className="package-header">
                  <div>
                    <h3>{category}</h3>
                    <p className="package-id">
                      {categoryPolicies.length} chính sách • {activeInCategory} đang áp dụng
                    </p>
                  </div>
                  <span className="badge badge-info">{activeInCategory}/{categoryPolicies.length}</span>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {categoryPolicies.map(policy => (
                      <li key={policy.id} style={{ 
                        padding: '12px 0', 
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>
                            {policy.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>
                            v{policy.version} • {policy.lastUpdate}
                          </div>
                        </div>
                        <span className={`badge ${
                          policy.status === 'active' ? 'badge-success' :
                          policy.status === 'draft' ? 'badge-warning' :
                          'badge-secondary'
                        }`}>
                          {policy.status === 'active' ? '✓' :
                           policy.status === 'draft' ? '📝' : '📦'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="package-actions" style={{ marginTop: '16px' }}>
                  <button className="btn btn-secondary btn-block">
                    Xem tất cả chính sách {category}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Policies;