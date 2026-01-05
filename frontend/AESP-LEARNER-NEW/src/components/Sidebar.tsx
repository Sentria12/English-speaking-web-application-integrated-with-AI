import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Sidebar = () => {
  const { hasCompletedAssessment } = useAuth();

  if (!hasCompletedAssessment) return null; // Tuyệt đối không vẽ gì nếu chưa xong [cite: 2025-12-25]

  const navItems = [
    { to: "/dashboard/packages", icon: "shopping-cart", label: "Gói dịch vụ" },
    { to: "/dashboard/practice", icon: "comments", label: "Luyện nói" },
    { to: "/dashboard/progress", icon: "chart-line", label: "Tiến độ" },
    { to: "/dashboard/reports", icon: "file-alt", label: "Báo cáo" },
  ];

  return (
    <aside className="sidebar">
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <i className={`fas fa-${item.icon}`}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
