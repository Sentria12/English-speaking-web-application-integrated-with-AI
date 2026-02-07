import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Container,
  Stack,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import api from "../utils/api";

const genAI = new GoogleGenerativeAI("AlzaSyAH66w7SEdi3LVkhA4NXeew-ITJtsbYk4c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const PlacementTest = ({ onComplete }: { onComplete: () => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  const sentences = [
    "I like learning English.",
    "The environment is our most precious resource.",
    "Technological advancements are reshaping the global economy.",
  ];

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        await analyzeAndNext(text);
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, [step]);

  const analyzeAndNext = async (text: string) => {
    setIsAiLoading(true);
    try {
      const prompt = `User said: "${text}" for "${sentences[step]}". Rate level 1-5. Return JSON: {"level": number, "accuracy": number}`;
      const result = await model.generateContent(prompt);
      const data = JSON.parse(
        result.response.text().replace(/```json|```/g, ""),
      );

      const stats = [{ date: "Test", score: data.accuracy }];
      localStorage.setItem("learningStats", JSON.stringify(stats));

      if (step < sentences.length - 1) {
        setStep(step + 1);
      } else {
        localStorage.setItem("userLevel", data.level.toString());
        await api.post("/user/update-level", { level: data.level });
        onComplete();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Đánh giá năng lực
        </Typography>
        <Typography color="textSecondary" mb={4}>
          Hãy đọc to câu dưới đây để AI xếp lớp
        </Typography>
        <Box sx={{ p: 4, bgcolor: "#f0f4f8", borderRadius: 4, mb: 4 }}>
          <Typography variant="h5" color="primary">
            "{sentences[step]}"
          </Typography>
        </Box>
        {isAiLoading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            size="large"
            color={isRecording ? "error" : "primary"}
            startIcon={isRecording ? <StopIcon /> : <MicIcon />}
            onClick={() =>
              isRecording
                ? recognitionRef.current.stop()
                : (setIsRecording(true), recognitionRef.current.start())
            }
            sx={{ borderRadius: 10, px: 6, py: 2 }}
          >
            {isRecording ? "ĐANG NGHE..." : "BẮT ĐẦU ĐỌC"}
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default PlacementTest;
