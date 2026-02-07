import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  email: string;
  role: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const decodeAndSetUser = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);

      const userId = decoded.id || decoded.userId;

      const userData: User = {
        id: userId ? Number(userId) : 0,
        email: decoded.sub || "",
        role: (decoded.role || "LEARNER").toUpperCase(),

        fullName: decoded.full_name || "Học viên",
      };

      if (userData.id === 0) {
        console.error(
          "Token này không chứa ID số! Hãy kiểm tra lại Backend JwtUtil.",
        );
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      console.error("Lỗi giải mã token:", err);
      logout();
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      decodeAndSetUser(token);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    decodeAndSetUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
