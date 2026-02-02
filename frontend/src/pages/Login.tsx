import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data; // token từ backend
      localStorage.setItem("token", token);
      alert("Đăng nhập thành công!");
      navigate("/dashboard"); // hoặc trang chính
    } catch (err: any) {
      setError(
        err.response?.data || "Đăng nhập thất bại. Kiểm tra lại thông tin.",
      );
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
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            py: 1.8,
            background: "linear-gradient(90deg, #4361ee, #3f37c9)",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          Đăng nhập
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          underline="hover"
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          Đăng ký ngay
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
