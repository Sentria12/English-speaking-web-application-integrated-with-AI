import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip,
} from "@mui/material";

const LearningPath = () => {
  const [path, setPath] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API thật khi backend có
    // axios.get('http://localhost:8080/api/learning-path/current').then(res => setPath(res.data));

    // Mock data để test
    setPath({
      level: "Intermediate",
      description:
        "Lộ trình được cá nhân hóa dựa trên bài test đầu vào của bạn.",
      steps: [
        {
          title: "Tuần 1-2: Củng cố phát âm",
          status: "completed",
          desc: "Luyện âm /θ/, /ð/, /r/, /l/ và ngữ điệu",
        },
        {
          title: "Tuần 3-4: Từ vựng & Cụm từ",
          status: "current",
          desc: "Học 500 từ giao tiếp + collocations",
        },
        {
          title: "Tuần 5-8: Hội thoại thực tế",
          status: "pending",
          desc: "Luyện tình huống business, travel, daily life",
        },
        {
          title: "Tuần 9+: Chuyên ngành",
          status: "pending",
          desc: "Luyện theo ngành kinh doanh bạn chọn",
        },
      ],
    });
    setLoading(false);
  }, []);

  if (loading)
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }}>
        Đang tải lộ trình...
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Lộ trình học cá nhân hóa
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Trình độ hiện tại: <Chip label={path.level} color="primary" />
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {path.description}
        </Typography>

        <Stepper orientation="vertical">
          {path.steps.map((step: any, index: number) => (
            <Step
              key={index}
              active={step.status === "current"}
              completed={step.status === "completed"}
            >
              <StepLabel>
                {step.title}
                {step.status === "completed" && (
                  <Chip
                    label="Hoàn thành"
                    color="success"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                )}
                {step.status === "current" && (
                  <Chip
                    label="Đang học"
                    color="primary"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                )}
              </StepLabel>
              <StepContent>
                <Typography>{step.desc}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" size="small">
                    Bắt đầu học phần này
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 5 }}>
          Tiếp tục lộ trình hiện tại
        </Button>
      </Paper>
    </Box>
  );
};

export default LearningPath;
