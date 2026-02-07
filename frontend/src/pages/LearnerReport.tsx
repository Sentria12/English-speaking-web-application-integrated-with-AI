import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import api from "../utils/api";

const LearnerReport = ({ learnerId }: { learnerId: number }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/mentor/reports/summary/${learnerId}`);
        const chartData = [
          { subject: 'Phát âm', A: res.data.pronunciation, fullMark: 10 },
          { subject: 'Ngữ pháp', A: res.data.grammar, fullMark: 10 },
          { subject: 'Lưu loát', A: res.data.fluency, fullMark: 10 },
        ];
        setData(chartData);
      } catch (err) {
        console.error("Lỗi tải báo cáo");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [learnerId]);

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" mb={2}>Biểu Đồ Năng Lực Của Bạn</Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Kỹ năng"
              dataKey="A"
              stroke="#1976d2"
              fill="#1976d2"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="body2" color="textSecondary" mt={2}>
        * Dữ liệu được tổng hợp từ các buổi học với Mentor.
      </Typography>
    </Paper>
  );
};

export default LearnerReport;