import React from 'react';

interface NavbarProps {
  userName: string;
  pageTitle: string;
  onLogout: () => void;
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, pageTitle, onLogout, onMenuToggle }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button onClick={onMenuToggle} className="btn-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="navbar-right">
        <div className="user-menu">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">Quản trị viên</div>
          </div>
        </div>
        <button onClick={onLogout} className="btn-logout">
          <span>🚪</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;