import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  hasCompletedAssessment: boolean;
  login: (username: string, password: string) => boolean;
  register: (
    username: string,
    email: string,
    password: string,
    confirm: string
  ) => { success: boolean; message: string };
  logout: () => void;
  completeAssessment: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("aesp_logged_in") === "true";
    const completed =
      localStorage.getItem("aesp_assessment_completed") === "true";

    setIsLoggedIn(loggedIn);
    setHasCompletedAssessment(completed);
  }, []);

  const register = (
    username: string,
    email: string,
    password: string,
    confirm: string
  ) => {
    let users = JSON.parse(localStorage.getItem("aesp_users") || "[]");
    if (users.find((u: any) => u.username === username))
      return { success: false, message: "Tên đăng nhập đã tồn tại!" };
    if (password !== confirm)
      return { success: false, message: "Mật khẩu xác nhận không khớp!" };
    if (password.length < 6)
      return { success: false, message: "Mật khẩu phải ít nhất 6 ký tự!" };

    users.push({ username, email, password });
    localStorage.setItem("aesp_users", JSON.stringify(users));
    return { success: true, message: "Đăng ký thành công! Hãy đăng nhập." };
  };

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("aesp_users") || "[]");
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("aesp_logged_in", "true");
      setIsLoggedIn(true);

      /* LOGIC QUAN TRỌNG: 
         Khi mới login, ta lấy trạng thái từ máy. Nếu bạn muốn LUÔN hiện trang assessment 
         mỗi khi login mới để test, hãy tạm thời sửa dòng dưới thành: 
         setHasCompletedAssessment(false); 
      */
      const completed =
        localStorage.getItem("aesp_assessment_completed") === "true";
      setHasCompletedAssessment(completed);

      return true;
    }
    return false;
  };

  const logout = () => {
    // Xóa sạch localStorage để lần sau login menu ko tự hiện [cite: 2025-12-25]
    localStorage.removeItem("aesp_logged_in");
    localStorage.removeItem("aesp_assessment_completed");
    setIsLoggedIn(false);
    setHasCompletedAssessment(false); // Ép về false để ẩn menu dọc ngay lập tức [cite: 2025-12-25]
  };

  const completeAssessment = () => {
    // Chỉ khi bấm "Hoàn tất" tại Assessment.tsx, menu mới được hiện [cite: 2025-12-25]
    setHasCompletedAssessment(true);
    localStorage.setItem("aesp_assessment_completed", "true");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        hasCompletedAssessment,
        login,
        register,
        logout,
        completeAssessment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// bản 14
