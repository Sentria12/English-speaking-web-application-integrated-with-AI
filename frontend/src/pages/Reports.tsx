import { useState, useEffect } from "react";
import api from "../utils/api";
import { Box, Typography, Paper, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from "@mui/material";

const Reports = () => {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState({ weekly: [], monthly: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [w, m] = await Promise.all([api.get("/reports/weekly"), api.get("/reports/monthly")]);
        setData({ weekly: w.data, monthly: m.data });
      } catch { console.error("Lỗi tải báo cáo"); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" mb={4}>Báo Cáo Hiệu Suất</Typography>
      <Paper>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Theo Tuần" />
          <Tab label="Theo Tháng" />
        </Tabs>
        <Box p={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{tab === 0 ? "Tuần" : "Tháng"}</TableCell>
                <TableCell>Giờ luyện</TableCell>
                <TableCell>Điểm TB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tab === 0 ? data.weekly : data.monthly).map((row: any, i) => (
                <TableRow key={i}>
                  <TableCell>{tab === 0 ? row.week : row.month}</TableCell>
                  <TableCell>{row.hours}h</TableCell>
                  <TableCell>{row.avgScore}/10</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};
export default Reports;