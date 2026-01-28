import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LearnerDashboard = () => {
  const [data, setData] = useState<any>({
    streak: 0,
    totalHours: 0,
    pronunciation: 0,
    progressChart: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/progress/my");
        setData(res.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu tiến độ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        sx={{ fontWeight: 700, textAlign: "center", mb: 5 }}
      >
        Dashboard Học viên
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{ p: 4, textAlign: "center", borderRadius: 3, boxShadow: 4 }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Chuỗi ngày học liên tục
            </Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
              {data.streak}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ngày
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{ p: 4, textAlign: "center", borderRadius: 3, boxShadow: 4 }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Tổng thời gian luyện
            </Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
              {data.totalHours}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              giờ
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{ p: 4, textAlign: "center", borderRadius: 3, boxShadow: 4 }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Điểm phát âm trung bình
            </Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
              {data.pronunciation?.toFixed(1) || "Chưa có"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              / 10
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 3, color: "#4361ee" }}
            >
              Biểu đồ tiến bộ gần đây
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.progressChart || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4361ee"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 10 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearnerDashboard;
