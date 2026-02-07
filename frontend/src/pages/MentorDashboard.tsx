import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";

const MentorDashboard = () => {
  const [learners, setLearners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLearners = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/mentor/learners");
      setLearners(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách học viên:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearners();
  }, []);

  //  Xử lý Chấm bài
  const handleGrade = async (learnerId: number) => {
    const comment = prompt("Nhập nhận xét bài nói:");
    const rating = prompt("Nhập điểm số (1-5):");
    if (comment && rating) {
      try {
        await axios.post(`http://localhost:8080/api/mentor/feedback`, null, {
          params: { sessionId: learnerId, comment, rating: parseFloat(rating) },
        });
        alert("Chấm bài thành completion!");
      } catch (e) {
        alert("Lỗi gửi feedback");
      }
    }
  };

  // Xử lý Gửi tài liệu
  const handleSendDoc = async (learnerId: number) => {
    const title = prompt("Tên tài liệu:");
    const url = prompt("Link tài liệu (URL):");
    if (title && url) {
      try {
        await axios.post(
          `http://localhost:8080/api/mentor/send-document`,
          null,
          {
            params: { learnerId, title, url },
          },
        );
        alert("Đã gửi tài liệu!");
      } catch (e) {
        alert("Lỗi gửi tài liệu");
      }
    }
  };

  if (loading)
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center", mb: 5 }}
      >
        Dashboard Gia sư
      </Typography>
      <Paper sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Danh sách học viên đang hướng dẫn ({learners.length})
          </Typography>
          {learners.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
              Hiện tại bạn chưa có học viên nào.
            </Typography>
          ) : (
            <List disablePadding>
              {learners.map((learner) => (
                <React.Fragment key={learner.learnerId}>
                  <ListItem
                    sx={{ py: 2, px: 0 }}
                    secondaryAction={
                      <Box>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                          onClick={() => handleGrade(learner.learnerId)}
                        >
                          Chấm bài
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleSendDoc(learner.learnerId)}
                        >
                          Gửi tài liệu
                        </Button>
                      </Box>
                    }
                  >
                    <Avatar
                      sx={{ width: 56, height: 56, bgcolor: "#4361ee", mr: 3 }}
                    >
                      {learner.user?.fullName?.[0] || "?"}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {learner.user?.fullName || "Học viên mới"}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Trình độ: <strong>{learner.englishLevel}</strong>
                          </Typography>
                          <br />
                          <Chip
                            label={`Streak: ${learner.currentStreakDays} ngày`}
                            size="small"
                            color="success"
                            sx={{ mt: 1 }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MentorDashboard;
