package com.aesp.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ReportsService {

    public String getWeeklyReport(Integer learnerId) {
        return "Báo cáo tuần: 5.2 giờ luyện\nĐiểm trung bình: 7.4\nSố buổi luyện: 6 buổi";
    }

    public String getMonthlyReport(Integer learnerId) {
        return "Báo cáo tháng: 24 giờ luyện\nĐiểm trung bình: 7.3\nSố buổi luyện: 28 buổi";
    }
}