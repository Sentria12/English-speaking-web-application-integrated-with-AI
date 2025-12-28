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
        { id: 'dashboard', icon: '📊', label: 'Dashboard' }
      ]
    },
    {
      title: 'QUẢN LÝ TÀI KHOẢN',
      items: [
        { id: 'account-management', icon: '👥', label: 'Quản lý Tài khoản' }
      ]
    },
    {
      title: 'QUẢN LÝ DỊCH VỤ',
      items: [
        { id: 'service-management', icon: '📦', label: 'Quản lý Dịch vụ' }
      ]
    },
    {
      title: 'HỖ TRỢ & KIỂM DUYỆT',
      items: [
        { id: 'support-moderation', icon: '💬', label: 'Hỗ trợ & Kiểm duyệt' }
      ]
    },
    {
      title: 'HỆ THỐNG',
      items: [
        { id: 'system-settings', icon: '⚙️', label: 'Cài đặt Hệ thống' }
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