import React from 'react';

interface NavItem {
  id: string;
  icon: string;
  label: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, collapsed }) => {
  const navSections: NavSection[] = [
    {
      title: 'TỔNG QUAN',
      items: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'statistics', icon: '📈', label: 'Thống kê & Báo cáo' }
      ]
    },
    {
      title: 'QUẢN LÝ TÀI KHOẢN',
      items: [
        { id: 'users', icon: '👥', label: 'Tài khoản người dùng' },
        { id: 'mentors', icon: '🎓', label: 'Danh sách Mentor' },
        { id: 'mentor-skills', icon: '⭐', label: 'Kỹ năng Mentor' }
      ]
    },
    {
      title: 'QUẢN LÝ DỊCH VỤ',
      items: [
        { id: 'packages', icon: '📦', label: 'Gói dịch vụ & Giá' },
        { id: 'purchases', icon: '💳', label: 'Lịch sử mua gói' },
        { id: 'support', icon: '🎧', label: 'Hỗ trợ học viên' }
      ]
    },
    {
      title: 'KIỂM DUYỆT',
      items: [
        { id: 'moderation', icon: '💬', label: 'Feedback & Bình luận' }
      ]
    },
    {
      title: 'CÀI ĐẶT',
      items: [
        { id: 'policies', icon: '📋', label: 'Chính sách hệ thống' },
        { id: 'settings', icon: '⚙️', label: 'Cấu hình' }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">A</div>
          <div className="logo-text">
            <h2>AESP</h2>
            <p>Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="nav-menu">
        {navSections.map((section, idx) => (
          <div key={idx} className="nav-section">
            <div className="nav-section-title">{section.title}</div>
            {section.items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;