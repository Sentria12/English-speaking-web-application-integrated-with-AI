import { useState } from "react";
import api from "../utils/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

const MentorFeedback = () => {
  const [learnerId, setLearnerId] = useState("");
  const [score, setScore] = useState<number | null>(4);
  const [grammar, setGrammar] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [expression, setExpression] = useState("");
  const [overallComment, setOverallComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!learnerId) {
      alert("Vui lòng chọn học viên");
      return;
    }

    try {
      await api.post("/mentor/feedback", {
        sessionId: 1, // thay bằng session thật
        comment: overallComment,
        rating: score,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert("Gửi thất bại");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Phản hồi cho học viên
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Chọn học viên</InputLabel>
          <Select
            value={learnerId}
            label="Chọn học viên"
            onChange={(e) => setLearnerId(e.target.value)}
          >
            <MenuItem value="">-- Chọn --</MenuItem>
            <MenuItem value="1">Hoàng Văn Nam</MenuItem>
            <MenuItem value="2">Trần Thị Lan</MenuItem>
            <MenuItem value="3">Nguyễn Minh Anh</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Đánh giá tổng thể (1-5 sao)
        </Typography>
        <Rating
          name="score"
          value={score}
          onChange={(_, val) => setScore(val)}
          precision={0.5}
          size="large"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Nhận xét về ngữ pháp & từ vựng"
          value={grammar}
          onChange={(e) => setGrammar(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Nhận xét về phát âm & ngữ điệu"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Nhận xét về cách diễn đạt & sự tự tin"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Nhận xét tổng quát & lời khuyên cải thiện"
          value={overallComment}
          onChange={(e) => setOverallComment(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 4, py: 1.5 }}
          onClick={handleSubmit}
        >
          Gửi phản hồi ngay
        </Button>

        {submitted && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Phản hồi đã được gửi thành công cho học viên!
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default MentorFeedback;
