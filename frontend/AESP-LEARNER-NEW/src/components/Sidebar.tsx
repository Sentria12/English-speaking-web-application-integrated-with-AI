import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard/assessment', icon: 'clipboard-check', label: 'Đánh giá đầu vào' },
  { to: '/dashboard/packages', icon: 'shopping-cart', label: 'Gói dịch vụ' },
  { to: '/dashboard/practice', icon: 'comments', label: 'Luyện nói' },
  { to: '/dashboard/progress', icon: 'chart-line', label: 'Tiến độ' },
  { to: '/dashboard/reports', icon: 'file-alt', label: 'Báo cáo' },
]

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <i className={`fas fa-${item.icon}`}></i>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)

export default Sidebar