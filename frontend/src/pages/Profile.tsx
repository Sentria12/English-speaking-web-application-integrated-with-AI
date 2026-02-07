import { useState, useEffect } from "react";
import api from "../utils/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  MenuItem,
} from "@mui/material";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    goals: "",
    preferredTopics: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api
      .get("/learner/profile")
      .then((res) => setProfile(res.data))
      .catch(() => setError("Không tải được hồ sơ. Kiểm tra đăng nhập."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      await api.put("/learner/profile", profile);
      setSuccess(true);
    } catch {
      setError("Cập nhật thất bại.");
    }
  };

  if (loading)
    return (
      <Typography align="center" mt={10}>
        Đang tải...
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Hồ Sơ Cá Nhân
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Đã lưu thành công!
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Họ Tên"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Số điện thoại"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Mục tiêu học tập"
              value={profile.goals}
              onChange={(e) =>
                setProfile({ ...profile, goals: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" onClick={handleSave}>
              Lưu thông tin
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default Profile;
