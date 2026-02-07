package com.aesp.backend.service;

import com.aesp.backend.entity.User;
import com.aesp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class StreakTask {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    // Chạy vào lúc 20:00 hàng ngày
    @Scheduled(cron = "0 0 20 * * ?")
    public void checkUserStreak() {
        LocalDate today = LocalDate.now();

        List<User> learners = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.LEARNER)
                .toList();

        for (User user : learners) {
            // Kiểm tra lastPracticeDate
            if (user.getLastPracticeDate() == null || !user.getLastPracticeDate().isEqual(today)) {
                if (user.getStreakCount() != null && user.getStreakCount() > 0) {
                    notificationService.createNotification(
                            user.getUserId(),
                            "Nhanh lên! Bạn sắp mất chuỗi Streak " + user.getStreakCount() + " ngày rồi đấy!",
                            "STREAK");
                }
            }
        }
    }
}