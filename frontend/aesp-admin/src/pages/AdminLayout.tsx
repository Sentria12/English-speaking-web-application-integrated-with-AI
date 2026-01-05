import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import Dashboard from './Dashboard';
import AccountManagement from './AccountManagement';
import ServiceManagement from './ServiceManagement';
import SupportModeration from './SupportModeration';
import SystemSettings from './SystemSettings';

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
    'account-management': 'Quản lý Tài khoản',
    'service-management': 'Quản lý Dịch vụ',
    'support-moderation': 'Hỗ trợ & Kiểm duyệt',
    'system-settings': 'Cài đặt Hệ thống'
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'account-management':
        return <AccountManagement />;
      case 'service-management':
        return <ServiceManagement />;
      case 'support-moderation':
        return <SupportModeration />;
      case 'system-settings':
        return <SystemSettings />;
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