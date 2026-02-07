import React, { useState, useRef } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const InitialAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const uploadAudio = async (base64Data: string) => {
    setIsUploading(true);
    setError(null);
    try {
      const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
      let finalId = user?.id || storageUser.id;

      if (
        !finalId ||
        finalId === 0 ||
        (typeof finalId === "string" && finalId.includes("@"))
      ) {
        setError(
          "Không tìm thấy ID người dùng hợp lệ. Vui lòng đăng xuất và đăng nhập lại.",
        );
        setIsUploading(false);
        return;
      }

      const response = await api.post("/learner/initial-assessment", {
        userId: Number(finalId),
        audioBase64: base64Data,
      });

      setAssessmentResult(response.data);
      localStorage.setItem("hasCompletedAssessment", "true");
      setActiveStep(2);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        "Lỗi server (400). Hãy kiểm tra lại ID người dùng.";
      setError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Data = (reader.result as string).split(",")[1];
          uploadAudio(base64Data);
        };
      };
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError("Không thể mở micro.");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, p: 3 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {["Giới thiệu", "Kiểm tra", "Kết quả"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 && (
          <Box textAlign="center">
            <Button variant="contained" onClick={() => setActiveStep(1)}>
              Bắt đầu
            </Button>
          </Box>
        )}

        {activeStep === 1 && (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Đọc: "English is a global language..."
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              {!isRecording ? (
                <Button
                  variant="contained"
                  startIcon={<MicIcon />}
                  onClick={handleStartRecording}
                >
                  Bắt đầu ghi âm
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<StopIcon />}
                  onClick={handleStopRecording}
                >
                  Dừng & Gửi
                </Button>
              )}
            </Stack>
            {isUploading && <CircularProgress size={24} sx={{ mt: 2 }} />}
          </Box>
        )}

        {activeStep === 2 && assessmentResult && (
          <Box textAlign="center">
            <Typography variant="h5" color="success.main">
              Trình độ: {assessmentResult.englishLevel}
            </Typography>
            <Typography>
              Điểm: {assessmentResult.pronunciationScore}/10
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default InitialAssessment;
