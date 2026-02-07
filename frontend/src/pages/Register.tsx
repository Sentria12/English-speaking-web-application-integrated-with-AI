import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("LEARNER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !fullName) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
        fullName,
        role,
      });

      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      navigate("/login");
    } catch (err: any) {
      // Lấy thông báo lỗi chi tiết từ backend
      const serverError =
        err.response?.data?.message ||
        err.response?.data ||
        "Đăng ký thất bại.";
      setError(serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 10,
        p: 5,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        borderRadius: 4,
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 800, mb: 4, color: "#1a1a2e" }}
      >
        Tạo tài khoản
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Bạn là...?</InputLabel>
          <Select
            value={role}
            label="Bạn là...?"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="LEARNER">Người học (Learner)</MenuItem>
            <MenuItem value="MENTOR">Người hướng dẫn (Mentor)</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            background: "linear-gradient(45deg, #4361ee 30%, #4cc9f0 90%)",
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Đăng ký ngay"
          )}
        </Button>
      </form>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3, color: "text.secondary" }}
      >
        Bạn đã tham gia AESP?{" "}
        <Link
          href="/login"
          underline="always"
          sx={{ fontWeight: 700, color: "#4361ee", cursor: "pointer" }}
        >
          Đăng nhập
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
