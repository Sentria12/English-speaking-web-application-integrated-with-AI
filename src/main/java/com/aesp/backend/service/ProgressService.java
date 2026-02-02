package com.aesp.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    public String getAnalytics(Integer learnerId) {
        // Mock dữ liệu tiến độ - sau này lấy từ DB
        return "Streak: 14 ngày liên tiếp\nTổng giờ luyện: 25 giờ\nĐiểm trung bình phát âm: 7.8\nHeatmap hoạt động: [mock data]";
    }
}