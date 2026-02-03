package com.aesp.backend.controller;

import com.aesp.backend.entity.Learner;
import com.aesp.backend.service.LearnerService;
// Xóa import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.security.PermitAll;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/learner")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LearnerController {

    private static final Logger logger = LoggerFactory.getLogger(LearnerController.class);

    @Autowired
    private LearnerService learnerService;

    // Viết thủ công để tránh lỗi TypeTag UNKNOWN
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

    // Thêm vào trong LearnerController.java
    @PermitAll
    @GetMapping("/profile-info")
    public ResponseEntity<?> getProfileInfo(@RequestParam Integer userId) {
        Learner learner = learnerService.getProfile(userId);
        if (learner == null)
            return ResponseEntity.status(404).body("Profile not found");

        Map<String, Object> info = new HashMap<>();
        info.put("level", learner.getEnglishLevel()); // Trả về BEGINNER/ADVANCED
        info.put("hasCompleted", learner.getHasCompletedInitialAssessment());
        return ResponseEntity.ok(info);
    }

    @PermitAll
    @PostMapping("/initial-assessment")
    public ResponseEntity<Map<String, Object>> initialAssessment(@RequestBody AssessmentRequest request) {
        logger.info("Nhận initial-assessment request cho userId: {}", request.getUserId());
        try {
            if (request.getUserId() == null)
                return ResponseEntity.badRequest().body(Map.of("error", "userId null"));

            Learner learner = learnerService.getProfile(request.getUserId());
            if (learner == null)
                return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy learner"));

            BigDecimal pronunciationScore = BigDecimal.valueOf(8.5);
            String englishLevel = "ADVANCED";

            learner.setPronunciationScore(pronunciationScore);
            learner.setEnglishLevel(Learner.EnglishLevel.valueOf(englishLevel));
            learner.setHasCompletedInitialAssessment(true);
            learnerService.updateProfile(learner);

            Map<String, Object> result = new HashMap<>();
            result.put("englishLevel", englishLevel);
            result.put("pronunciationScore", pronunciationScore);
            result.put("message", "Test đầu vào hoàn tất.");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Các phương thức khác giữ nguyên nhưng phải đảm bảo không gọi đến các field
    // thiếu Getter/Setter
    @PermitAll
    @GetMapping("/dashboard-stats")
    public ResponseEntity<?> getDashboardStats(@RequestParam Integer userId) {
        try {
            Learner learner = learnerService.getProfile(userId);
            if (learner == null)
                return ResponseEntity.status(404).body("Không tìm thấy");
            Map<String, Object> stats = new HashMap<>();
            stats.put("streak", learner.getCurrentStreakDays());
            stats.put("pronunciation", learner.getPronunciationScore());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}