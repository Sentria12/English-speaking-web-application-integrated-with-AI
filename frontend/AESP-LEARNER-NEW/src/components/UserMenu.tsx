import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAssessmentPage = location.pathname === "/initial-assessment";

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <FontAwesomeIcon icon={faMicrophoneAlt} />
        <h1>AESP</h1>
      </div>
      <div className="header-actions">
        {!isLoggedIn ? (
          <>
            <Link to="/auth" className="btn-outline">
              Đăng nhập
            </Link>
            <Link to="/auth?register" className="btn-primary-header">
              Đăng ký miễn phí
            </Link>
          </>
        ) : (
          !isAssessmentPage && (
            <div
              style={{ position: "relative" }}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Avatar + Tên + Mũi tên */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "600",
                  padding: "8px 12px",
                  borderRadius: "50px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "background 0.3s",
                }}
                onMouseEnter={() => setShowDropdown(true)}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#ddd",
                    borderRadius: "50%",
                    backgroundImage: "ur[](https://via.placeholder.com/40)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <span>Phạm Trọng Linh</span>
                <i className="fas fa-caret-down"></i>
              </div>

              {/* Dropdown - hiện khi showDropdown = true */}
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "70px",
                    right: "0",
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    minWidth: "240px",
                    overflow: "hidden",
                    zIndex: 1000,
                    animation: "fadeInUp 0.3s ease-out",
                  }}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "#ddd",
                        borderRadius: "50%",
                        margin: "0 auto 15px",
                        backgroundImage: "ur[](https://via.placeholder.com/80)",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <h4 style={{ margin: "0 0 5px", color: "#333" }}>
                      Phạm Trọng Linh
                    </h4>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.9em" }}>
                      linhiop@example.com
                    </p>
                    <p
                      style={{
                        margin: "10px 0 0",
                        color: "#667eea",
                        fontWeight: "600",
                      }}
                    >
                      Trình độ: Beginner
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      color: "#e53e3e",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fed7d7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
