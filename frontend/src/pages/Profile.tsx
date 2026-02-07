import { useState, useEffect } from "react";
import api from "../utils/api"; // axios instance
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  Grid,
  Alert,
  MenuItem,
} from "@mui/material";

const topicsList = [
  "business",
  "travel",
  "daily life",
  "healthcare",
  "technology",
  "education",
  "tourism",
];

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    goals: "",
    preferredTopics: [] as string[],
    specializedIndustry: "",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/learner/profile", {
          params: { userId: 1 }, // thay bằng userId thật từ login
        });
        setProfile(res.data);
      } catch (err: any) {
        setError("Không tải được hồ sơ. Vui lòng đăng nhập lại.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await api.put("/learner/profile", profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Cập nhật thất bại");
    }
  };

  const toggleTopic = (topic: string) => {
    setProfile((prev) => ({
      ...prev,
      preferredTopics: prev.preferredTopics.includes(topic)
        ? prev.preferredTopics.filter((t) => t !== topic)
        : [...prev.preferredTopics, topic],
    }));
  };

  if (loading)
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }}>
        Đang tải hồ sơ...
      </Typography>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Hồ sơ cá nhân & Tùy chỉnh
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          {/* Các field giữ nguyên, chỉ thay onChange để cập nhật state */}
          {/* ... giữ nguyên code cũ của bạn ... */}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 5, py: 1.5 }}
            onClick={handleSave}
          >
            Lưu thông tin hồ sơ
          </Button>

          {saved && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Đã cập nhật hồ sơ thành công!
            </Alert>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
