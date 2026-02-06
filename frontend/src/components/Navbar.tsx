import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 10,
        padding: "20px",
        paddingTop: "10px",
        marginTop: "10px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: 800,
            fontSize: 50,
          }}
        >
          AESP
        </Typography>

        {/* Desktop menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{ fontSize: 18, fontWeight: 500 }}
              >
                Dashboard
              </Button>
              {user.role === "LEARNER" && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/packages"
                    sx={{ fontSize: 18, fontWeight: 500 }}
                  >
                    Gói dịch vụ
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/practice"
                    sx={{ fontSize: 18, fontWeight: 500 }}
                  >
                    Luyện nói
                  </Button>
                </>
              )}
              {user.role === "MENTOR" && (
                <Button color="inherit" component={Link} to="/mentor/documents">
                  Tài liệu
                </Button>
              )}

              {/* Chuông thông báo - Click vào dropdown sẽ xem nhanh */}
              <NotificationBell
                userId={(user as any).userId || (user as any).id}
              />

              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                sx={{
                  padding: "10px 24px",
                  borderRadius: "30px",
                  border: "2px solid white",
                  background: "white",
                  color: "blue",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  transition: "0.3s",
                  boxShadow: "none",

                  "&:hover": {
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
                    color: "white",
                    filter: "brightness(1.1)",
                    background:
                      "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                    border: "2px solid transparent",
                  },
                }}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  padding: "10px 24px",
                  borderRadius: "30px",
                  border: "2px solid white",
                  background: "white",
                  color: "blue",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  transition: "0.3s",
                  boxShadow: "none",

                  "&:hover": {
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
                    color: "white",
                    filter: "brightness(1.1)",
                    background:
                      "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                    border: "2px solid transparent",
                  },
                }}
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
                sx={{
                  ml: 1,
                  padding: "10px 24px",
                  borderRadius: "30px",
                  background: "white",
                  color: "#667eea",
                  fontWeight: 700,
                  transition: "0.3s",
                  border: "none",
                  boxShadow: "none",

                  "&:hover": {
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
                    color: "white",
                    filter: "brightness(1.1)",
                    background:
                      "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                  },
                }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu (Cho điện thoại) */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {user && (
            <NotificationBell
              userId={(user as any).userId || (user as any).id}
            />
          )}
          <IconButton onClick={handleMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/dashboard");
              }}
            >
              Dashboard
            </MenuItem>
            {user && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/notifications");
                }}
              >
                Thông báo
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
