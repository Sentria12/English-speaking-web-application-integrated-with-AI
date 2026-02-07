import React, { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      const { token, role, hasCompletedAssessment, userId } = res.data;

      if (!token) throw new Error("Server không trả về token hợp lệ.");

      // 1. Lưu session
      login(token);

      if (userId) {
        localStorage.setItem("userId", userId.toString());
      }

      localStorage.setItem(
        "hasCompletedAssessment",
        JSON.stringify(hasCompletedAssessment),
      );

      // 2. Điều hướng dựa trên trạng thái
      if (role === "LEARNER") {
        if (hasCompletedAssessment) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/initial-assessment", { replace: true });
        }
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 12,
        p: 5,
        boxShadow: 6,
        borderRadius: 4,
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 700, mb: 4 }}
      >
        Đăng nhập AESP
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.8,
            background: "linear-gradient(90deg, #4361ee, #3f37c9)",
            fontWeight: 600,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
