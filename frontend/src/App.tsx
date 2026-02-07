import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InitialAssessment from "./pages/InitialAssessment";
import LearnerDashboard from "./pages/LearnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import Packages from "./pages/Packages";
import PracticePage from "./pages/PracticePage";
import Profile from "./pages/Profile";
import PackageManager from "./pages/PackageManager";
import AdminMentorApproval from "./admin/AdminMentorApproval";
import MentorProfile from "./pages/MentorProfile";
import SpeakingEvaluationForm from "./mentor/SpeakingEvaluationForm";
import Home from "./pages/Home";

// Component bảo vệ Route
function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) {
  const { user, loading } = useAuth();

  const storedValue = localStorage.getItem("hasCompletedAssessment");
  const hasCompleted =
    storedValue && storedValue !== "undefined"
      ? JSON.parse(storedValue)
      : false;

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  if (
    user.role === "LEARNER" &&
    !hasCompleted &&
    window.location.pathname !== "/initial-assessment"
  ) {
    return <Navigate to="/initial-assessment" replace />;
  }

  return children;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin/approve-mentors"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminMentorApproval />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <PackageManager />
              </ProtectedRoute>
            }
          />

          {/* Learner Routes */}
          <Route
            path="/initial-assessment"
            element={
              <ProtectedRoute roles={["LEARNER"]}>
                <InitialAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute roles={["LEARNER"]}>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packages"
            element={
              <ProtectedRoute roles={["LEARNER"]}>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute roles={["LEARNER"]}>
                <PracticePage />
              </ProtectedRoute>
            }
          />

          {/* Mentor Routes */}
          <Route
            path="/mentor/evaluate/:learnerId/:bookingId"
            element={
              <ProtectedRoute roles={["MENTOR"]}>
                <SpeakingEvaluationForm />
              </ProtectedRoute>
            }
          />

          {/* Shared/Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              user?.role === "ADMIN" ? (
                <AdminDashboard />
              ) : user?.role === "MENTOR" ? (
                <MentorDashboard />
              ) : (
                <ProtectedRoute roles={["LEARNER"]}>
                  <LearnerDashboard />
                </ProtectedRoute>
              )
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["LEARNER", "ADMIN", "MENTOR"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor-profile/:id"
            element={
              <MentorProfile
                mentorId={Number(window.location.pathname.split("/").pop())}
              />
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
