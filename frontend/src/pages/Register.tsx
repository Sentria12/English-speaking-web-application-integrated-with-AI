import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // import axios instance
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("LEARNER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !fullName) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        fullName,
        role,
      });

      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data || "Đăng ký thất bại. Email có thể đã tồn tại.",
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
        Đăng ký AESP
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
          label="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />
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
        <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
          <InputLabel>Vai trò</InputLabel>
          <Select
            value={role}
            label="Vai trò"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="LEARNER">Học viên (Learner)</MenuItem>
            <MenuItem value="MENTOR">Gia sư (Mentor)</MenuItem>
          </Select>
        </FormControl>
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
          Đăng ký
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          underline="hover"
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          Đăng nhập ngay
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
