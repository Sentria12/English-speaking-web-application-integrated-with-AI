import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  LinearProgress,
  Box,
  Stack,
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
import api from "../utils/api";

interface ProgressData {
  date: string;
  score: number;
}

const DashboardPage = () => {
  const [data, setData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const userLevel = localStorage.getItem("userLevel") || "1";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/learning-stats");
        setData(res.data);
      } catch (error) {
        const localData = localStorage.getItem("learningStats");
        if (localData) {
          setData(JSON.parse(localData));
        } else {
          setData([{ date: "Chưa có dữ liệu", score: 0 }]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Bảng Tiến Độ Học Tập
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 5,
              textAlign: "center",
              bgcolor: "#1a237e",
              color: "#fff",
              height: "100%",
            }}
          >
            <Typography variant="h6">Trình độ Adaptive</Typography>
            <Typography variant="h1" fontWeight="900">
              Lvl {userLevel}
            </Typography>
            <Box mt={2}>
              <Typography variant="body2" mb={1}>
                Tiến độ lên Level tiếp theo
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Number(userLevel) * 20}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: "rgba(255,255,255,0.2)",
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 5, height: 550 }}>
            <Typography variant="h6" mb={3}>
              Biểu đồ tăng trưởng Accuracy (%)
            </Typography>
            {loading ? (
              <Stack alignItems="center" justifyContent="center" height="100%">
                <CircularProgress />
              </Stack>
            ) : (
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#1976d2"
                    fill="#bbdefb"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
