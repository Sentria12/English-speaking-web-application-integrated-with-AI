import React, { useState } from "react";
import api from "../utils/api";
import { 
  Box, Typography, TextField, Button, Paper, 
  Rating, Alert, Stack, FormControl, InputLabel, Select, MenuItem 
} from "@mui/material";

const MentorFeedback = () => {
  const [form, setForm] = useState({ learnerId: "", rating: 5, comment: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.learnerId || !form.comment) return alert("Vui lòng điền đầy đủ thông tin!");
    
    try {
      await api.post("/mentor/feedback", form);
      setSuccess(true);
      setForm({ learnerId: "", rating: 5, comment: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      alert("Không thể gửi phản hồi lúc này.");
    }
  };

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", p: 4 }}>
      <Paper sx={{ p: 5, borderRadius: 4, boxShadow: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Đánh Giá Kết Quả Học Tập</Typography>
        {success && <Alert severity="success" sx={{ mb: 3 }}>Phản hồi của bạn đã được gửi tới học viên!</Alert>}
        
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Chọn mã học viên</InputLabel>
            <TextField 
              placeholder="Ví dụ: 101" 
              value={form.learnerId} 
              onChange={(e) => setForm({...form, learnerId: e.target.value})} 
            />
          </FormControl>

          <Box>
            <Typography component="legend">Mức độ hoàn thành bài học:</Typography>
            <Rating size="large" value={form.rating} onChange={(_, val) => setForm({...form, rating: val || 5})} />
          </Box>

          <TextField 
            fullWidth label="Nhận xét chi tiết" multiline rows={5}
            placeholder="Hãy viết lời khuyên giúp học viên cải thiện..."
            value={form.comment} onChange={(e) => setForm({...form, comment: e.target.value})}
          />

          <Button variant="contained" size="large" onClick={handleSubmit} sx={{ py: 1.5, fontWeight: "bold" }}>
            Gửi Nhận Xét
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default MentorFeedback;