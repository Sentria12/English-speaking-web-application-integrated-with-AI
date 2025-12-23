import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  register: (
    username: string,
    email: string,
    password: string,
    confirm: string
  ) => {
    success: boolean;
    message: string;
  };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login: AuthContextType["login"] = (_username, _password) => {
    setIsLoggedIn(true);
    return true;
  };

  const register: AuthContextType["register"] = (
    _username,
    _email,
    _password,
    _confirm
  ) => {
    return {
      success: true,
      message: "Đăng ký thành công",
    };
  };

  const logout: AuthContextType["logout"] = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
