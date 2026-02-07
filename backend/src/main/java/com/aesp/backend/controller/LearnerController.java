package com.aesp.backend.controller;

import com.aesp.backend.entity.Learner;
import com.aesp.backend.entity.User;
import com.aesp.backend.repository.UserRepository;
import com.aesp.backend.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.security.PermitAll;
import java.math.BigDecimal;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/learner")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LearnerController {

    @Autowired
    private LearnerService learnerService;

    @Autowired
    private UserRepository userRepository;

    public static class AssessmentRequest {
        private Integer userId;
        private String audioBase64;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public String getAudioBase64() {
            return audioBase64;
        }

        public void setAudioBase64(String audioBase64) {
            this.audioBase64 = audioBase64;
        }
    }

    @PermitAll
    @GetMapping("/dashboard-stats")
    public ResponseEntity<?> getDashboardStats(@RequestParam("userId") Integer userId) {
        try {
            if (userId == null)
                return ResponseEntity.badRequest().body("userId is required");

            Learner learner = learnerService.getProfile(userId);
            if (learner == null) {
                Map<String, Object> defaultStats = new HashMap<>();
                defaultStats.put("fullName", "Học viên mới");
                defaultStats.put("streak", 0);
                defaultStats.put("pronunciation", 0);
                defaultStats.put("progressChart", new ArrayList<>());
                return ResponseEntity.ok(defaultStats);
            }

            Map<String, Object> stats = new HashMap<>();
            stats.put("fullName", learner.getUser().getFullName());
            stats.put("streak", learner.getCurrentStreakDays());
            stats.put("pronunciation", learner.getPronunciationScore());

            List<Map<String, Object>> chart = new ArrayList<>();
            chart.add(Map.of("date", "Hôm nay", "score",
                    learner.getPronunciationScore() != null ? learner.getPronunciationScore() : 0));
            stats.put("progressChart", chart);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi server: " + e.getMessage()));
        }
    }

    @PostMapping("/initial-assessment")
    @PermitAll
    public ResponseEntity<?> initialAssessment(@RequestBody AssessmentRequest request) {
        try {
            Integer userId = request.getUserId();
            if (userId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "userId rỗng từ Frontend gửi lên"));
            }

            Learner learner = learnerService.getProfile(userId);

            if (learner == null) {
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User ID không tồn tại"));
                learner = new Learner();
                learner.setUser(user);
                learner.setTotalPracticeHours(0);
                learner.setCurrentStreakDays(0);
            }

            String level = "INTERMEDIATE";
            BigDecimal score = BigDecimal.valueOf(7.2);

            learner.setEnglishLevel(Learner.EnglishLevel.valueOf(level));
            learner.setPronunciationScore(score);
            learner.setHasCompletedInitialAssessment(true);

            learnerService.updateProfile(learner);

            return ResponseEntity.ok(Map.of(
                    "englishLevel", level,
                    "pronunciationScore", score,
                    "message", "Lưu kết quả thành công!"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/select-mentor")
    @PermitAll
    public ResponseEntity<?> selectMentor(@RequestParam Integer learnerId, @RequestParam Integer mentorId) {
        try {
            User learner = userRepository.findById(learnerId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Learner"));
            User mentor = userRepository.findById(mentorId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Mentor"));

            if (mentor.getRole() != User.Role.MENTOR) {
                return ResponseEntity.badRequest().body(Map.of("error", "User được chọn không phải là Mentor"));
            }

            learner.setMentor(mentor);
            userRepository.save(learner);

            return ResponseEntity.ok(Map.of("message", "Bạn đã chọn Mentor " + mentor.getFullName() + " thành công!"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}