import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Chip,
  Alert,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";

const AdminDashboard = () => {
  // 1. States cho dữ liệu
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [pendingMentors, setPendingMentors] = useState<any[]>([]);

  // 2. States cho UI
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  // --- HÀM LẤY DỮ LIỆU ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes, mentorsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/stats"),
        api.get("/admin/pending-mentors"),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
      setPendingMentors(mentorsRes.data);
      setError(null);
    } catch (err: any) {
      setError("Không thể đồng bộ dữ liệu với Backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- XỬ LÝ NGƯỜI DÙNG ---
  const handleToggleStatus = async (userId: number) => {
    if (!window.confirm("Xác nhận thay đổi trạng thái người dùng này?")) return;
    try {
      await api.put(`/admin/users/${userId}/toggle-status`);
      fetchData();
    } catch (err) {
      alert("Cập nhật thất bại.");
    }
  };

  // --- XỬ LÝ DUYỆT MENTOR ---
  const handleApproveMentor = async (profileId: number) => {
    try {
      await api.put(`/admin/approve-mentor/${profileId}`);
      alert("Đã duyệt Mentor thành công!");
      fetchData();
    } catch (err) {
      alert("Lỗi khi duyệt hồ sơ.");
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}
      >
        Admin Control Panel
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* --- PHẦN 1: THẺ THỐNG KÊ (WIDGETS) --- */}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderTop: "4px solid #1976d2" }}
          >
            <Typography color="textSecondary">Tổng Người Dùng</Typography>
            <Typography variant="h3">{stats?.totalUsers || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderTop: "4px solid #2e7d32" }}
          >
            <Typography color="textSecondary">Doanh Thu Hệ Thống</Typography>
            <Typography variant="h3" sx={{ color: "#2e7d32" }}>
              ${stats?.totalRevenue?.toLocaleString() || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderTop: "4px solid #ed6c02" }}
          >
            <Typography color="textSecondary">Gói Học Hoạt Động</Typography>
            <Typography variant="h3">{stats?.totalPackages || 0}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* --- PHẦN 2: TABS ĐIỀU KHIỂN --- */}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={(_, v) => setCurrentTab(v)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Quản Lý Người Dùng" />
          <Tab label={`Duyệt Mentor (${pendingMentors.length})`} />
        </Tabs>
      </Paper>

      {/* --- PHẦN 3: NỘI DUNG TỪNG TAB --- */}
      {currentTab === 0 ? (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Họ Tên</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId} hover>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === "ACTIVE" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={user.status === "ACTIVE" ? "warning" : "success"}
                      onClick={() => handleToggleStatus(user.userId)}
                      size="small"
                    >
                      {user.status === "ACTIVE" ? "Khóa" : "Kích hoạt"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: "#fff3e0" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kinh Nghiệm</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Lĩnh Vực</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingMentors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không có hồ sơ nào chờ duyệt
                  </TableCell>
                </TableRow>
              ) : (
                pendingMentors.map((m) => (
                  <TableRow key={m.profileId}>
                    <TableCell>{m.profileId}</TableCell>
                    <TableCell>{m.experienceYears} năm</TableCell>
                    <TableCell>{m.specialization}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApproveMentor(m.profileId)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Duyệt
                      </Button>
                      <Button variant="outlined" color="error" size="small">
                        Từ chối
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashboard;
