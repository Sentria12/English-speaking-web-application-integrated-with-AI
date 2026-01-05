import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login (sau này thay bằng API)
    if (email && password) {
      localStorage.setItem("token", "demo-token");
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginHeader />
        <LoginCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleSubmit={handleSubmit}
        />
        <LoginFeatures />
      </div>
    </div>
  );
}

/* ===== LOGIN HEADER ===== */
const LoginHeader = () => (
  <div className="login-header">
    <div className="login-logo">
      <i className="fas fa-comments"></i>
      <h1>AESP Mentor Portal</h1>
    </div>
    <p>AI English Speaking Practice Platform</p>
  </div>
);

/* ===== LOGIN CARD ===== */
interface LoginCardProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginCard = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleSubmit,
}: LoginCardProps) => (
  <div className="login-card">
    <h2>Mentor Login</h2>
    <p className="login-subtitle">
      Enter your credentials to access the mentor dashboard
    </p>

    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="form-group">
        <label>Email Address</label>
        <div className="input-with-icon">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="mentor@aesp.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <i className="fas fa-lock"></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="form-options">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Remember me</span>
        </label>
        <a href="#" className="forgot-password">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary btn-block">
        <i className="fas fa-sign-in-alt"></i> Login to Dashboard
      </button>

      <div className="login-footer">
        <p>
          Not a mentor? <a href="#">Contact administrator</a>
        </p>
        <p>
          By logging in, you agree to our <a href="#">Terms of Service</a>
        </p>
      </div>
    </form>
  </div>
);

/* ===== LOGIN FEATURES ===== */
const LoginFeatures = () => (
  <div className="login-features">
    <h3>Mentor Platform Features</h3>
    <div className="features-grid">
      {[
        {
          icon: "fa-clipboard-check",
          title: "Organize Assessments",
          desc: "Evaluate and level learners based on proficiency",
        },
        {
          icon: "fa-comment-medical",
          title: "Provide Feedback",
          desc: "Give immediate corrections and suggestions",
        },
        {
          icon: "fa-book-open",
          title: "Share Materials",
          desc: "Upload documents and learning resources",
        },
        {
          icon: "fa-chart-line",
          title: "Track Progress",
          desc: "Monitor learner improvement over time",
        },
      ].map((feature) => (
        <div className="feature" key={feature.title}>
          <i className={`fas ${feature.icon}`}></i>
          <h4>{feature.title}</h4>
          <p>{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
);
