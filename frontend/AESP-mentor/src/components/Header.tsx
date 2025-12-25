const Header = () => {
  return (
    <header className="top-header">
      <button className="menu-toggle">
        <i className="fas fa-bars"></i>
      </button>

      <div className="header-search">
        <i className="fas fa-search"></i>
        <input placeholder="Search..." />
      </div>

      <div className="header-actions">
        <button className="btn-icon">
          <i className="fas fa-bell"></i>
        </button>
      </div>
    </header>
  )
}

export default Header
