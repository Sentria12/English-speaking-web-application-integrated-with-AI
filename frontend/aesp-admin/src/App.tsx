import React, { useState, useEffect } from 'react';
import AdminLayout from './pages/AdminLayout';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    if (email === 'admin@aesp.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
    } else {
      alert('❌ Email hoặc mật khẩu không đúng!\n\nVui lòng sử dụng:\nEmail: admin@aesp.com\nMật khẩu: 123456');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-background">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-circle">A</div>
            </div>
            <h1 className="login-title">AESP Admin</h1>
            <p className="login-subtitle">Đăng nhập vào hệ thống quản trị</p>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">✉️</span>
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="form-input"
                placeholder="admin@aesp.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔒</span>
                <span>Mật khẩu</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <button onClick={handleLogin} className="btn-login">
              <span>Đăng nhập</span>
              <span className="btn-arrow">→</span>
            </button>

            <div className="login-footer">
              <div className="demo-info">
                <span className="info-icon">ℹ️</span>
                <span>Demo: <strong>admin@aesp.com</strong> / <strong>123456</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AdminLayout onLogout={handleLogout} />;
};

export default App;