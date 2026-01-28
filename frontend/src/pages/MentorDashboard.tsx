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
} from "@mui/material";

const MentorDashboard = () => {
  const [learners, setLearners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/mentor/learners",
        );
        setLearners(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách học viên:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLearners();
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
        Dashboard Gia sư
      </Typography>

      <Paper sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Danh sách học viên đang hướng dẫn ({learners.length})
          </Typography>

          {learners.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
              Hiện tại bạn chưa có học viên nào. Học viên sẽ xuất hiện khi họ
              chọn bạn làm mentor.
            </Typography>
          ) : (
            <List disablePadding>
              {learners.map((learner) => (
                <React.Fragment key={learner.learnerId}>
                  <ListItem sx={{ py: 2, px: 0 }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "#4361ee",
                        mr: 3,
                      }}
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
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Điểm phát âm:{" "}
                            <strong>
                              {learner.pronunciationScore?.toFixed(1) ||
                                "Chưa có"}
                            </strong>{" "}
                            / 10
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
