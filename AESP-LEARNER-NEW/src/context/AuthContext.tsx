import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  login: (username: string, password: string) => boolean
  register: (username: string, email: string, password: string, confirm: string) => {
    success: boolean
    message: string
  }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('aesp_logged_in') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  const register = (username: string, email: string, password: string, confirm: string) => {
    const users = JSON.parse(localStorage.getItem('aesp_users') || '[]')

    if (users.find((u: any) => u.username === username)) {
      return { success: false, message: 'Tên đăng nhập đã tồn tại!' }
    }
    if (password !== confirm) {
      return { success: false, message: 'Mật khẩu xác nhận không khớp!' }
    }
    if (password.length < 6) {
      return { success: false, message: 'Mật khẩu phải ít nhất 6 ký tự!' }
    }

    users.push({ username, email, password })
    localStorage.setItem('aesp_users', JSON.stringify(users))
    return { success: true, message: 'Đăng ký thành công! Hãy đăng nhập.' }
  }

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('aesp_users') || '[]')
    const user = users.find((u: any) => u.username === username && u.password === password)

    if (user) {
      localStorage.setItem('aesp_logged_in', 'true')
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('aesp_logged_in')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}