import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {
  Box, Typography, Stepper, Step, StepLabel, StepContent,
    Paper, Button, Chip, CircularProgress, Alert
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LearningPath = () => {
  const [path, setPath] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/learning-path/current")
      .then(res => setPath(res.data))
      .catch(() => setPath(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Lộ Trình Học Của Tôi</Typography>
      {!path ? (
        <Alert severity="info">Bạn cần hoàn thành bài đánh giá đầu vào để nhận lộ trình.</Alert>
      ) : (
        <Paper elevation={0} sx={{ p: 4, bgcolor: "transparent" }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Cấp độ hiện tại: <Chip label={path.level} color="secondary" /></Typography>
          </Box>
          <Stepper orientation="vertical">
            {path.steps?.map((step: any, index: number) => (
              <Step key={index} active={step.status === "current"} completed={step.status === "completed"}>
                <StepLabel 
                  StepIconComponent={() => step.status === "completed" ? <CheckCircleIcon color="success" /> : null}
                >
                  <Typography variant="h6">{step.title}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography sx={{ mb: 2, color: "text.secondary" }}>{step.description}</Typography>
                  <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>Vào bài học</Button>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      )}
    </Box>
  );
};

export default LearningPath;