import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: "fa-tachometer-alt", path: "/dashboard" },
    { name: "Assessments", icon: "fa-clipboard-check", path: "/assessments" },
    { name: "Feedback", icon: "fa-comment-dots", path: "/feedback", badge: 0 },
    { name: "Teaching Materials", icon: "fa-book-open", path: "/materials" },
  ];

  return (
    <nav className="sidebar" id="sidebar">
      {/* Logo */}
      <div className="logo">
        <h2>
          <i className="fas fa-comments"></i> AESP Mentor
        </h2>
        <p className="role-tag">Mentor Portal</p>
      </div>

      {/* User Info */}
      <div className="user-info">
        <div className="avatar">
          <i className="fas fa-user-tie"></i>
        </div>
        <div className="user-details">
          <h4>Mentor Name</h4>
          <p>
            <i className="fas fa-circle status-active"></i> Online
          </p>
        </div>
      </div>

      {/* Menu */}
      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.name}</span>
              {item.badge !== undefined && (
                <span className="notification-badge">{item.badge}</span>
              )}
            </NavLink>
          </li>
        ))}

        {/* Logout */}
        <li className="nav-item">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>© 2024 AESP Platform</p>
        <p>v1.0.0</p>
      </div>
    </nav>
  );
};

export default Sidebar;
