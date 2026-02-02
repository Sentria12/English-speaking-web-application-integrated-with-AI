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
import Profile from "./pages/Profile";
import Packages from "./pages/Packages";
import LearningPath from "./pages/LearningPath";
import PracticePage from "./pages/PracticePage";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import Reports from "./pages/Reports";
import LearnerDashboard from "./pages/LearnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import MentorFeedback from "./pages/MentorFeedback";

function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Learner routes */}
          <Route
            path="/initial-assessment"
            element={
              <ProtectedRoute roles={["learner"]}>
                <InitialAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["learner"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packages"
            element={
              <ProtectedRoute roles={["learner"]}>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning-path"
            element={
              <ProtectedRoute roles={["learner"]}>
                <LearningPath />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute roles={["learner"]}>
                <PracticePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute roles={["learner"]}>
                <ProgressAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute roles={["learner"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Admin & Mentor routes */}
          <Route
            path="/dashboard"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : user?.role === "mentor" ? (
                <MentorDashboard />
              ) : user?.role === "learner" ? (
                <LearnerDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/mentor-feedback"
            element={
              <ProtectedRoute roles={["mentor"]}>
                <MentorFeedback />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
