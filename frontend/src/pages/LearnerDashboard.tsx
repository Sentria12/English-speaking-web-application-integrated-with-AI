import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { ProgressResponse } from "../types/progress";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimerIcon from "@mui/icons-material/Timer";

const LearnerDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Hỗ trợ cả hai cách đặt tên ID phổ biến
        const currentId = user.id || (user as any).userId;

        const response = await api.get<ProgressResponse>(
          `/progress/${currentId}/analytics`,
        );

        if (response.data) {
          setData(response.data);
          console.log("Dữ liệu Dashboard tải thành công:", response.data);
        }
        setError(null);
      } catch (err: any) {
        console.error("Lỗi Dashboard:", err);
        setError("Không thể tải dữ liệu tiến trình.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [user]);

  if (loading)
    return (
      <Box
        sx={{
          p: 5,
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );

  // Đảm bảo leaderboard luôn là mamlng để tránh lỗi .map()
  const leaderboardList = Array.isArray(data?.leaderboard)
    ? data.leaderboard
    : [];

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Chào {(user as any)?.full_name || (user as any)?.fullName || "Học viên"}{" "}
        ! 👋
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Card 1: Chuỗi học tập */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #2af598 0%, #009efd 80%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                p: 2,
                borderRadius: 3,
                mr: 3,
              }}
            >
              <TimerIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ opacity: 0.8, fontWeight: 500 }}
              >
                Chuỗi học tập
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {/* Khớp với @JsonProperty("current_streak_days") của Backend */}
                {data?.current_streak_days || 0}
                <small style={{ fontSize: "20px", marginLeft: "8px" }}>
                  Ngày
                </small>
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Card 2: Điểm phát âm */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                p: 2,
                borderRadius: 3,
                mr: 3,
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ opacity: 0.8, fontWeight: 500 }}
              >
                Điểm phát âm trung bình
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {Number(data?.avgPronunciation || 0).toFixed(1)}
                <small style={{ fontSize: "30px", marginLeft: "8px" }}>
                  /10
                </small>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Biểu đồ tiến trình */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #f1f5f9",
              minHeight: 450,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Tiến trình học tập chi tiết
            </Typography>
            <Box sx={{ width: "100%", height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.chartData || []}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2196f3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eee"
                  />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2196f3"
                    fill="url(#colorScore)"
                    strokeWidth={4}
                    dot={{ r: 4, fill: "#2196f3" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Bảng Xếp Hạng */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #f1f5f9",
              height: "100%",
              bgcolor: "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Bảng Xếp Hạng 🏆
            </Typography>
            <TableContainer sx={{ maxHeight: 380 }}>
              <Table size="small">
                <TableBody>
                  {leaderboardList.length > 0 ? (
                    leaderboardList.map((student, index) => (
                      <TableRow
                        key={index}
                        sx={{ "&:hover": { bgcolor: "#fcfcfd" } }}
                      >
                        <TableCell
                          sx={{
                            width: 40,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {index === 0
                            ? "🥇"
                            : index === 1
                              ? "🥈"
                              : index === 2
                                ? "🥉"
                                : index + 1}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              src={(student as any).avatar_url}
                              sx={{ width: 30, height: 30 }}
                            >
                              {((student as any).full_name || "U")[0]}
                            </Avatar>
                            <Typography
                              variant="body2"
                              fontWeight="600"
                              noWrap
                              sx={{ maxWidth: 110 }}
                            >
                              {(student as any).full_name ||
                                `Học viên ${index + 1}`}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1.5,
                              bgcolor: "#f0fdf4",
                              color: "#166534",
                              display: "inline-block",
                            }}
                          >
                            <Typography variant="caption" fontWeight="bold">
                              {Number(
                                (student as any).pronunciation_score || 0,
                              ).toFixed(1)}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={3}
                        sx={{ py: 3, color: "#94a3b8" }}
                      >
                        Chưa có dữ liệu xếp hạng
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LearnerDashboard;
