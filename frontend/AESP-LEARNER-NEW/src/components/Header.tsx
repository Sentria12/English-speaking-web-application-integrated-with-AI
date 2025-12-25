import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <header className="header">
      <div className="logo">
        <FontAwesomeIcon icon={faMicrophoneAlt} />
        <h1>AESP</h1>
      </div>
      <div className="header-actions">
        {!isLoggedIn ? (
          <>
            <Link to="/auth" className="btn-outline">Đăng nhập</Link>
            <Link to="/auth?register" className="btn-primary-header">Đăng ký miễn phí</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn-logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
