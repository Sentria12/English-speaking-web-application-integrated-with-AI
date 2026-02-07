import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api"; // dùng instance axios từ utils/api.ts (đã có interceptor)

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.id || decoded.sub || 0, // backend có thể dùng sub thay id
          email: decoded.email || decoded.sub,
          role: decoded.role || "LEARNER",
        });
      } catch (err) {
        console.error("Token invalid or expired:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser({
      id: decoded.id || decoded.sub || 0,
      email: decoded.email || decoded.sub,
      role: decoded.role || "LEARNER",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Không cần xóa header vì interceptor sẽ tự xử lý
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
