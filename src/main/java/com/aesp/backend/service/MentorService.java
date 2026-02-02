package com.aesp.backend.service;

import org.springframework.stereotype.Service;

@Service
public class MentorService {

    public String submitFeedback(Integer sessionId, String comment, Double rating) {
        // Mock gửi feedback - sau này kết nối với PracticeSession
        return "Phản hồi đã được gửi thành công cho session " + sessionId + ". Rating: " + rating + ", Comment: " + comment;
    }
}