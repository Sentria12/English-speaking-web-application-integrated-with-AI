import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          AESP
        </Typography>

        {/* Desktop menu (lớn hơn 600px) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>

              {/* Learner menu */}
              {user.role === "learner" && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/initial-assessment"
                  >
                    Test đầu vào
                  </Button>
                  <Button color="inherit" component={Link} to="/profile">
                    Hồ sơ
                  </Button>
                  <Button color="inherit" component={Link} to="/packages">
                    Gói dịch vụ
                  </Button>
                  <Button color="inherit" component={Link} to="/learning-path">
                    Lộ trình học
                  </Button>
                  <Button color="inherit" component={Link} to="/practice">
                    Luyện nói
                  </Button>
                  <Button color="inherit" component={Link} to="/progress">
                    Tiến độ
                  </Button>
                  <Button color="inherit" component={Link} to="/reports">
                    Báo cáo
                  </Button>
                </>
              )}

              {/* Mentor menu */}
              {user.role === "mentor" && (
                <Button color="inherit" component={Link} to="/mentor-feedback">
                  Phản hồi học viên
                </Button>
              )}

              {/* Admin menu (nếu cần thêm) */}
              {user.role === "admin" && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/manage-users"
                >
                  Quản lý người dùng
                </Button>
              )}

              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  "&:hover": { background: "rgba(255,255,255,0.25)" },
                }}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
              >
                Đăng ký
              </Button>
            </>
          )}
        </Box>

        {/* Mobile menu (nhỏ hơn 600px) */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </MenuItem>

                {user.role === "learner" && (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/initial-assessment");
                      }}
                    >
                      Test đầu vào
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/profile");
                      }}
                    >
                      Hồ sơ
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/packages");
                      }}
                    >
                      Gói dịch vụ
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/learning-path");
                      }}
                    >
                      Lộ trình học
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/practice");
                      }}
                    >
                      Luyện nói
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/progress");
                      }}
                    >
                      Tiến độ
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/reports");
                      }}
                    >
                      Báo cáo
                    </MenuItem>
                  </>
                )}

                {user.role === "mentor" && (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/mentor-feedback");
                    }}
                  >
                    Phản hồi học viên
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/register");
                  }}
                >
                  Đăng ký
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
