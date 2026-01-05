import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.tsx";
import Packages from "../components/Packages.tsx";
import Practice from "../components/Practice.tsx";
import Progress from "../components/Progress.tsx";
import Reports from "../components/Reports.tsx";
import Assessment from "../components/Assessment.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const DashboardPage = () => {
  const { isLoggedIn, hasCompletedAssessment } = useAuth();

  // 1. Nếu chưa đăng nhập, đá về trang Auth [cite: 2025-12-25]
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Điều hướng mặc định khi vào /dashboard [cite: 2025-12-25] */}
        <Route
          index
          element={
            <Navigate
              to={hasCompletedAssessment ? "practice" : "assessment"}
              replace
            />
          }
        />

        {/* Luôn cho phép vào trang Assessment nếu chưa xong [cite: 2025-12-25] */}
        <Route path="assessment" element={<Assessment />} />

        {/* Các trang khác chỉ cho vào nếu đã xong đánh giá, nếu không thì ép về assessment [cite: 2025-12-25] */}
        <Route
          path="packages"
          element={
            hasCompletedAssessment ? (
              <Packages />
            ) : (
              <Navigate to="/dashboard/assessment" replace />
            )
          }
        />
        <Route
          path="practice"
          element={
            hasCompletedAssessment ? (
              <Practice />
            ) : (
              <Navigate to="/dashboard/assessment" replace />
            )
          }
        />
        <Route
          path="progress"
          element={
            hasCompletedAssessment ? (
              <Progress />
            ) : (
              <Navigate to="/dashboard/assessment" replace />
            )
          }
        />
        <Route
          path="reports"
          element={
            hasCompletedAssessment ? (
              <Reports />
            ) : (
              <Navigate to="/dashboard/assessment" replace />
            )
          }
        />
      </Route>
    </Routes>
  );
};

export default DashboardPage;
// bản 10
