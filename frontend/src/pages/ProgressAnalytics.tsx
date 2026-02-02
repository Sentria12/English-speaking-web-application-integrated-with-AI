import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ProgressAnalytics = () => {
  const [data, setData] = useState({
    streak: 14,
    heatmap: {} as Record<string, number>,
    leaderboard: [] as Array<{ rank: number; name: string; score: number }>,
    challenges: [] as Array<{
      title: string;
      completed: boolean;
      reward: string;
    }>,
    rewards: [] as string[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        streak: 14,
        heatmap: {
          "2026-01-10": 50,
          "2026-01-11": 70,
          "2026-01-12": 90,
          "2026-01-13": 100,
          "2026-01-14": 85,
          "2026-01-15": 95,
        },
        leaderboard: [
          { rank: 1, name: "Linh", score: 980 },
          { rank: 2, name: "Nam", score: 940 },
          { rank: 3, name: "Lan", score: 910 },
        ],
        challenges: [
          {
            title: "Nói 10 phút/ngày",
            completed: true,
            reward: "Huy hiệu Vàng",
          },
          {
            title: "Hoàn thành 5 chủ đề kinh doanh",
            completed: false,
            reward: "100 điểm thưởng",
          },
        ],
        rewards: ["Huy hiệu Vàng", "100 điểm thưởng", "Sticker đặc biệt"],
      });
      setLoading(false);
    }, 800);
  }, []);

  const getHeatmapClass = (value?: number) => {
    if (!value) return "";
    if (value >= 90) return "heatmap-cell max";
    if (value >= 70) return "heatmap-cell high";
    if (value >= 50) return "heatmap-cell medium";
    return "heatmap-cell low";
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Phân tích tiến độ & Thành tích
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="h6">Chuỗi ngày học</Typography>
            <Typography variant="h3" color="primary">
              {data.streak}
            </Typography>
            <Typography>ngày liên tiếp</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Bảng xếp hạng
            </Typography>
            {data.leaderboard.map((item) => (
              <Box
                key={item.rank}
                sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
              >
                <Typography>
                  {item.rank}. {item.name}
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  {item.score} điểm
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Phần thưởng
            </Typography>
            {data.rewards.map((r, i) => (
              <Chip key={i} label={r} color="success" sx={{ m: 0.5, mb: 1 }} />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Thử thách
            </Typography>
            {data.challenges.map((ch, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Chip
                  label={ch.title}
                  color={ch.completed ? "success" : "warning"}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2">{ch.reward}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Heatmap hoạt động luyện tập
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Calendar
                tileClassName={({ date }) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const value = data.heatmap[dateStr];
                  return getHeatmapClass(value);
                }}
                tileContent={({ date }) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const value = data.heatmap[dateStr];
                  return value ? (
                    <span style={{ fontSize: "0.7em", color: "#fff" }}>
                      {value}
                    </span>
                  ) : null;
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressAnalytics;
