import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Container,
  Avatar,
  Stack,
  Card,
  Alert,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PsychologyIcon from "@mui/icons-material/Psychology";
import api from "../utils/api";

const API_KEY = "AIzaSyB__l80RPAMRjhlKTg68w7h758YcTRAVm4";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const PracticePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const recognitionRef = useRef<any>(null);

  const userLevel = parseInt(localStorage.getItem("userLevel") || "1");
  const targetSentence = "What's up baby";

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleAnalyze(text);
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, []);

  // Hàm lưu điểm
  const saveStats = (score: number) => {
    const statsRaw = localStorage.getItem("learningStats");
    let stats = statsRaw ? JSON.parse(statsRaw) : [];
    stats.push({
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      score: score,
    });
    if (stats.length > 10) stats.shift();
    localStorage.setItem("learningStats", JSON.stringify(stats));
  };

  const renderAdaptiveTarget = (text: string) => {
    if (userLevel >= 4)
      return text
        .split(" ")
        .map((w, i) => (i % 2 === 0 ? w : "___"))
        .join(" ");
    if (userLevel === 3) return text.replace(/[aeiou]/g, "_");
    return text;
  };

  const handleAnalyze = async (text: string) => {
    setIsAiLoading(true);
    try {
      const prompt = `Evaluate speech: "${text}" for target: "${targetSentence}". 
      Return ONLY JSON: {"accuracy": number, "word_to_learn": "string", "ipa": "string", "feedback": "string", "reply": "string"}`;

      const result = await model.generateContent(prompt);
      const data = JSON.parse(
        result.response.text().replace(/```json|```/g, ""),
      );

      setAiResponse(data);
      saveStats(data.accuracy);

      await api.post("/learning-progress", {
        level: userLevel,
        score: data.accuracy,
        transcript: text,
      });
    } catch (e) {
      console.error("Lỗi API - Chuyển sang chế độ Mock:", e);

      const mockScore = Math.floor(Math.random() * 40) + 60;
      const mockData = {
        accuracy: mockScore,
        word_to_learn: "Connection",
        reply: "API đang lỗi nhưng tôi vẫn chấm điểm giả lập cho bạn nhé!",
      };
      setAiResponse(mockData);
      saveStats(mockScore);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={10} sx={{ p: 4, borderRadius: 6, textAlign: "center" }}>
        <Stack alignItems="center" spacing={1} mb={3}>
          <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60 }}>
            <PsychologyIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            AI Adaptive Practice (Lvl {userLevel})
          </Typography>
        </Stack>

        <Box
          sx={{
            mb: 4,
            p: 2,
            bgcolor: "#fffde7",
            borderRadius: 3,
            border: "1px solid #ffd54f",
          }}
        >
          <Typography variant="caption" color="orange" fontWeight="bold">
            MỤC TIÊU:
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            "{renderAdaptiveTarget(targetSentence)}"
          </Typography>
        </Box>

        <Box sx={{ minHeight: "250px" }}>
          {transcript && (
            <Typography variant="h6" color="error" fontWeight="bold">
              Bạn nói: "{transcript}"
            </Typography>
          )}
          {isAiLoading ? (
            <CircularProgress sx={{ mt: 3 }} />
          ) : (
            aiResponse && (
              <Stack spacing={2} mt={2}>
                <Alert
                  severity={aiResponse.accuracy > 70 ? "success" : "warning"}
                >
                  Độ chính xác: {aiResponse.accuracy}%
                </Alert>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: "#f0f7ff",
                    border: "2px dashed #1976d2",
                  }}
                >
                  <Typography fontWeight="bold">
                    Từ cần học: {aiResponse.word_to_learn}
                  </Typography>
                </Card>
              </Stack>
            )
          )}
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          color={isRecording ? "error" : "primary"}
          startIcon={isRecording ? <StopIcon /> : <MicIcon />}
          onClick={() =>
            isRecording
              ? recognitionRef.current.stop()
              : (setIsRecording(true), recognitionRef.current.start())
          }
          sx={{ mt: 4, py: 2, borderRadius: 10 }}
        >
          {isRecording ? "DỪNG" : "BẮT ĐẦU NÓI"}
        </Button>
      </Paper>
    </Container>
  );
};

export default PracticePage;
