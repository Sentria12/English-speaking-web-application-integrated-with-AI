import { useState, useEffect } from "react";
import api from "../utils/api";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Reports = () => {
  const [tab, setTab] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const weekly = await api.get("/reports/weekly", {
          params: { learnerId: 1 },
        });
        const monthly = await api.get("/reports/monthly", {
          params: { learnerId: 1 },
        });
        setWeeklyData(weekly.data);
        setMonthlyData(monthly.data);
      } catch (err) {
        console.error("Lỗi tải báo cáo");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading)
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }}>
        Đang tải báo cáo...
      </Typography>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Báo cáo hiệu suất học tập
      </Typography>

      <Paper sx={{ width: "100%", borderRadius: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Báo cáo tuần" />
          <Tab label="Báo cáo tháng" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tuần</TableCell>
                <TableCell>Giờ luyện</TableCell>
                <TableCell>Số buổi</TableCell>
                <TableCell>Điểm trung bình</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weeklyData.map((row: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{row.week}</TableCell>
                  <TableCell>{row.hours} giờ</TableCell>
                  <TableCell>{row.sessions} buổi</TableCell>
                  <TableCell>{row.avgScore}/10</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tháng</TableCell>
                <TableCell>Giờ luyện</TableCell>
                <TableCell>Số buổi</TableCell>
                <TableCell>Điểm trung bình</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyData.map((row: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.hours} giờ</TableCell>
                  <TableCell>{row.sessions} buổi</TableCell>
                  <TableCell>{row.avgScore}/10</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Reports;
