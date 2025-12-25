import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

const AuthCard = () => {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    setIsRegister(location.search.includes('register'))
  }, [location])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (isRegister) {
      const result = register(username, email, password, confirm)
      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          setIsRegister(false)
          setEmail('')
          setConfirm('')
        }, 1500)
      } else {
        setError(result.message)
      }
    } else {
      if (login(username, password)) {
        navigate('/dashboard/assessment')
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu!')
      }
    }
  }

  return (
    <div className="auth-card">
      <h2>{isRegister ? 'Tạo tài khoản mới' : 'Chào mừng trở lại'}</h2>
      <p className="auth-subtitle">Luyện nói tiếng Anh tự tin với AI</p>
      <div className="auth-toggle">
        <button className={!isRegister ? 'tab-active' : ''} onClick={() => setIsRegister(false)}>Đăng nhập</button>
        <button className={isRegister ? 'tab-active' : ''} onClick={() => setIsRegister(true)}>Đăng ký</button>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <input type="text" placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        {isRegister && (
          <div className="input-group">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        )}
        <div className="input-group password-group">
          <input type={showPass ? 'text' : 'password'} placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required />
          <i className={`fas fa-eye${showPass ? '-slash' : ''} toggle-password`} onClick={() => setShowPass(!showPass)}></i>
        </div>
        {isRegister && (
          <div className="input-group password-group">
            <input type={showConfirm ? 'text' : 'password'} placeholder="Xác nhận mật khẩu" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            <i className={`fas fa-eye${showConfirm ? '-slash' : ''} toggle-password`} onClick={() => setShowConfirm(!showConfirm)}></i>
          </div>
        )}
        <button type="submit" className="btn-primary">
          {isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  )
}

export default AuthCard