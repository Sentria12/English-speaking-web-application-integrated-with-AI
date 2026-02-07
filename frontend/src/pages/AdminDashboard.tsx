import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách người dùng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDisable = async (userId: number) => {
    if (!confirm("Bạn có chắc muốn vô hiệu hóa tài khoản này?")) return;
    try {
      await axios.put(
        `http://localhost:8080/api/admin/users/${userId}/disable`,
      );
      setUsers(
        users.map((u) =>
          u.userId === userId ? { ...u, status: "inactive" } : u,
        ),
      );
    } catch (err) {
      alert("Không thể vô hiệu hóa tài khoản");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, mb: 5, textAlign: "center" }}
      >
        Quản trị hệ thống AESP
      </Typography>

      <Paper sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#4361ee" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Họ tên
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Vai trò
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId} hover>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={
                        user.role === "admin"
                          ? "error"
                          : user.role === "mentor"
                            ? "primary"
                            : "success"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === "active" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {user.status === "active" && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDisable(user.userId)}
                      >
                        Vô hiệu hóa
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Hiện chưa có người dùng nào trong hệ thống
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
