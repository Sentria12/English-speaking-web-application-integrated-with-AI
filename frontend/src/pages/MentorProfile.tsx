import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

interface MentorProfileProps {
  mentorId: number;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ mentorId }) => {
  const { user } = useAuth();
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [bookedSlots, setBookedSlots] = useState<any[]>([]);

  const isBooked = (slot: any) => {
    return bookedSlots.some((booked) => booked.startTime === slot.startTime);
  };

  const handleBook = async (slot: any) => {
    try {
      await axios.post("http://localhost:8080/api/bookings", {
        mentorId: mentorId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        learnerId: (user as any)?.id || (user as any)?.userId,
        status: "PENDING",
      });
      alert("Đặt lịch thành công! Mentor đã được thông báo.");
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt lịch!");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Chọn khung giờ tư vấn 1-1
      </Typography>
      <Grid container spacing={2}>
        {availabilities.map((slot, index) => (
          <Grid item key={index}>
            <Button
              variant="outlined"
              onClick={() => handleBook(slot)}
              disabled={isBooked(slot)}
            >
              {slot.startTime} - {slot.endTime}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MentorProfile;
