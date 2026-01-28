import { useState, useRef } from "react";
import api from "../utils/api"; // axios instance với baseURL và token tự động
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

const PracticePage = () => {
  const [topic, setTopic] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setFeedback("Đang ghi âm... Hãy nói tự nhiên!");
      setError("");
    } catch (err) {
      setError("Không thể truy cập microphone. Vui lòng cấp quyền.");
    }
  };

  const stopAndAnalyze = async () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setLoading(true);
    setError("");

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      audioChunksRef.current = []; // reset

      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "practice.webm");
        formData.append("topic", topic);

        // Gọi API backend thật
        const res = await api.post("/conversation/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSuggestions(res.data.suggestions || []);
        setFeedback(res.data.feedback || "Không nhận được phản hồi từ AI");
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Lỗi khi phân tích âm thanh. Kiểm tra backend.",
        );
      } finally {
        setLoading(false);
      }
    };
  };

  const getAISuggestions = async () => {
    if (!topic.trim()) {
      setError("Vui lòng nhập chủ đề trước");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Gọi API backend thật
      const res = await api.post("/conversation/start", { topic });

      setSuggestions(res.data.suggestions || []);
    } catch (err: any) {
      setError(err.response?.data || "Không lấy được gợi ý từ AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 700, color: "#1a1a2e" }}
      >
        Luyện Nói Tiếng Anh cùng AI
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{ mb: 4, color: "text.secondary" }}
      >
        Chọn chủ đề, luyện nói và nhận phản hồi tức thì từ AI
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <TextField
          fullWidth
          label="Chủ đề luyện nói (ví dụ: du lịch, phỏng vấn xin việc, giao tiếp hàng ngày)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          variant="outlined"
          multiline
          rows={2}
          sx={{ mb: 3 }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={getAISuggestions}
            disabled={loading || !topic.trim()}
            sx={{ minWidth: 180 }}
          >
            Nhận gợi ý câu nói
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={startRecording}
            disabled={loading}
            sx={{ minWidth: 180 }}
          >
            Bắt đầu ghi âm
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={stopAndAnalyze}
            disabled={loading || !mediaRecorderRef.current}
            sx={{ minWidth: 180 }}
          >
            Dừng & Phân tích
          </Button>
        </Box>

        {loading && (
          <Box sx={{ textAlign: "center", my: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Đang xử lý...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {suggestions.length > 0 && (
          <Paper sx={{ p: 3, mb: 4, bgcolor: "#f8f9fa", borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#4361ee" }}>
              Gợi ý câu nói từ AI:
            </Typography>
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: "white",
                    mb: 1,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {feedback && (
          <Paper
            sx={{ p: 4, bgcolor: "#e3f2fd", borderRadius: 3, boxShadow: 3 }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#1e88e5" }}>
              Phản hồi chi tiết từ AI:
            </Typography>
            <Typography whiteSpace="pre-wrap" sx={{ lineHeight: 1.8 }}>
              {feedback}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default PracticePage;
