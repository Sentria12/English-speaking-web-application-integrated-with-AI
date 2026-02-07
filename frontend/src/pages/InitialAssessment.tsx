import { useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
} from "@mui/material";

const steps = ["Hướng dẫn", "Ghi âm", "Kết quả"];

const InitialAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setRecording(true);
      setError("");
    } catch (err) {
      setError("Không thể truy cập micro. Vui lòng cấp quyền.");
    }
  };

  const stopAndSubmit = async () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setRecording(false);
    setAnalyzing(true);

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      audioChunksRef.current = []; // reset

      try {
        const formData = new FormData();
        formData.append("audio", audioBlob, "initial-test.wav");

        const res = await axios.post(
          "http://localhost:8080/api/assessment/initial-test",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );

        setResult(res.data);
        setActiveStep(2);
      } catch (err: any) {
        setError(err.response?.data?.error || "Lỗi phân tích bài test");
      } finally {
        setAnalyzing(false);
      }
    };
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Bài kiểm tra trình độ đầu vào
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Đọc to đoạn văn sau trong 60 giây. Hệ thống sẽ đánh giá level và
              phát âm để tạo lộ trình phù hợp.
            </Typography>
            <Button variant="contained" size="large" onClick={handleNext}>
              Bắt đầu
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Đọc to đoạn văn sau:
            </Typography>
            <Paper sx={{ p: 4, mb: 4, bgcolor: "#f8fafc", borderRadius: 3 }}>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
              >
                "Hello, my name is Linh. I live in Ho Chi Minh City, Vietnam. I
                am learning English to improve my career opportunities and
                travel more confidently. My favorite activities are reading
                books, watching movies, and talking with friends. I hope to
                speak English fluently one day."
              </Typography>
            </Paper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Button
                variant={recording ? "outlined" : "contained"}
                color={recording ? "error" : "primary"}
                size="large"
                onClick={recording ? stopAndSubmit : startRecording}
                disabled={analyzing}
              >
                {recording ? "Dừng & Gửi" : "Bắt đầu ghi âm"}
              </Button>
              {analyzing && <CircularProgress />}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom color="primary">
              Kết quả bài kiểm tra
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Trình độ</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {result?.englishLevel || "Intermediate"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Phát âm</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {result?.pronunciationScore?.toFixed(1) || "7.5"} / 10
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{ mt: 4 }}>
                {result?.feedback ||
                  "Bạn có nền tảng tốt, cần luyện thêm phát âm và ngữ điệu."}
              </Typography>
            </Paper>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => (window.location.href = "/learning-path")}
            >
              Xem lộ trình học
            </Button>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Kiểm tra trình độ đầu vào
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 4 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default InitialAssessment;
