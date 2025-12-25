import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Users from '../components/Users';
import Mentors from '../components/Mentors';
import MentorSkills from '../components/MentorSkills';
import Packages from '../components/Packages';
import Purchases from '../components/Purchases';
import Support from '../components/Support';
import Moderation from '../components/Moderation';
import Policies from '../components/Policies';
import Statistics from '../components/Statistics';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userName, setUserName] = useState('Admin');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserName(email.split('@')[0]);
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      onLogout();
    }
  };

  const pageTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    statistics: 'Thống kê & Báo cáo',
    users: 'Quản lý Tài khoản Người dùng',
    mentors: 'Quản lý Danh sách Mentor',
    'mentor-skills': 'Quản lý Kỹ năng Mentor',
    packages: 'Quản lý Gói Dịch vụ & Giá',
    purchases: 'Lịch sử Mua Gói',
    support: 'Hỗ trợ Học viên',
    moderation: 'Kiểm duyệt Feedback & Bình luận',
    policies: 'Quản lý Chính sách Hệ thống',
    settings: 'Cấu hình Hệ thống'
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'statistics':
        return <Statistics />;
      case 'users':
        return <Users />;
      case 'mentors':
        return <Mentors />;
      case 'mentor-skills':
        return <MentorSkills />;
      case 'packages':
        return <Packages />;
      case 'purchases':
        return <Purchases />;
      case 'support':
        return <Support />;
      case 'moderation':
        return <Moderation />;
      case 'policies':
        return <Policies />;
      case 'settings':
        return (
          <div className="empty-state">
            <div className="empty-icon">⚙️</div>
            <h3>Cấu hình Hệ thống</h3>
            <p>Trang này đang được phát triển</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
      />

      <div className="main-wrapper">
        <Navbar
          userName={userName}
          pageTitle={pageTitles[activePage]}
          onLogout={handleLogout}
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;