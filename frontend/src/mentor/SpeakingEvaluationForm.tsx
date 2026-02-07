import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  Paper,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import api from "../utils/api";

const SpeakingEvaluationForm = () => {
  const { learnerId, bookingId } = useParams<{
    learnerId: string;
    bookingId: string;
  }>();
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    pronunciation: 5,
    grammar: 5,
    fluency: 5,
  });
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.post("/mentor/evaluate", {
        mentorId: 1,
        learnerId: Number(learnerId),
        bookingId: Number(bookingId),
        pronunciationScore: scores.pronunciation,
        grammarScore: scores.grammar,
        fluencyScore: scores.fluency,
        feedbackDetails: feedback,
      });
      setSuccess(true);
      //
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      alert("Lỗi: Không thể gửi đánh giá bài nói.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{ p: { xs: 2, md: 4 }, display: "flex", justifyContent: "center" }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, maxWidth: 800, width: "100%" }}
      >
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Chấm Điểm & Nhận Xét Bài Nói
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Mã học viên: {learnerId} | Mã buổi học: {bookingId}
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Đã gửi báo cáo đánh giá thành công cho học viên!
          </Alert>
        )}

        <Stack spacing={4}>
          <Box>
            <Typography
              gutterBottom
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Phát âm (Pronunciation)</span>
              <b style={{ color: "#1976d2" }}>{scores.pronunciation}/10</b>
            </Typography>
            <Slider
              value={scores.pronunciation}
              min={0}
              max={10}
              step={0.5}
              onChange={(_, v) =>
                setScores({ ...scores, pronunciation: v as number })
              }
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography
              gutterBottom
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Ngữ pháp (Grammar)</span>
              <b style={{ color: "#1976d2" }}>{scores.grammar}/10</b>
            </Typography>
            <Slider
              value={scores.grammar}
              min={0}
              max={10}
              step={0.5}
              onChange={(_, v) =>
                setScores({ ...scores, grammar: v as number })
              }
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography
              gutterBottom
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Lưu loát (Fluency)</span>
              <b style={{ color: "#1976d2" }}>{scores.fluency}/10</b>
            </Typography>
            <Slider
              value={scores.fluency}
              min={0}
              max={10}
              step={0.5}
              onChange={(_, v) =>
                setScores({ ...scores, fluency: v as number })
              }
              valueLabelDisplay="auto"
            />
          </Box>

          <Divider />

          <TextField
            fullWidth
            label="Chi tiết lỗi sai & Hướng dẫn cải thiện"
            multiline
            rows={6}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Ví dụ: Bạn cần chú ý âm đuôi 's' và 'ed'..."
            variant="outlined"
          />

          <Button
            variant="contained"
            size="large"
            disabled={isSubmitting || success}
            onClick={handleSubmit}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            {isSubmitting ? "Đang gửi..." : "Hoàn Tất & Gửi Báo Cáo"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SpeakingEvaluationForm;
