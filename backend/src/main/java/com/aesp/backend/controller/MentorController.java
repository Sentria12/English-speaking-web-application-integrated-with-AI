package com.aesp.backend.controller;

import com.aesp.backend.dto.MentorRegistrationDTO;
import com.aesp.backend.service.MentorService;
import com.aesp.backend.entity.SpeakingEvaluation;
import com.aesp.backend.repository.SpeakingEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map; // QUAN TRỌNG: Thêm dòng này để sửa lỗi Map

@RestController
@RequestMapping("/api/mentor")
@CrossOrigin(origins = "http://localhost:5173")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @Autowired
    private SpeakingEvaluationRepository evaluationRepository;

    // API Đăng ký làm Mentor
    @PostMapping("/register")
    public ResponseEntity<String> registerAsMentor(
            @RequestBody MentorRegistrationDTO dto,
            Principal principal) {
        String userEmail = principal.getName();
        mentorService.registerNewMentorRequest(userEmail, dto);
        return ResponseEntity.ok("Đơn đăng ký đã được gửi, vui lòng chờ Admin phê duyệt!");
    }

    // Chấm điểm bài nói
    @PostMapping("/evaluate")
    public ResponseEntity<?> submitEvaluation(@RequestBody SpeakingEvaluation evaluation) {
        try {
            // Sửa lỗi Null type safety bằng cách kiểm tra object trước khi save
            if (evaluation == null)
                return ResponseEntity.badRequest().body("Dữ liệu trống");
            SpeakingEvaluation saved = evaluationRepository.save(evaluation);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi lưu đánh giá: " + e.getMessage());
        }
    }

    // Lấy danh sách đánh giá thô
    @GetMapping("/reports/{learnerId}")
    public ResponseEntity<?> getLearnerReport(@PathVariable Integer learnerId) {
        return ResponseEntity.ok(evaluationRepository.findByLearnerIdOrderByCreatedAtDesc(learnerId));
    }

    // Lấy tóm tắt điểm trung bình để vẽ biểu đồ
    @GetMapping("/reports/summary/{learnerId}")
    public ResponseEntity<?> getLearnerReportSummary(@PathVariable Integer learnerId) {
        List<Object[]> stats = evaluationRepository.getAverageScoresByLearner(learnerId);

        // Sửa lỗi Map cannot be resolved
        if (stats.isEmpty() || stats.get(0)[0] == null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("message", "Chưa có dữ liệu đánh giá");
            return ResponseEntity.ok(errorMap);
        }

        Map<String, Object> report = new HashMap<>();
        report.put("pronunciation", stats.get(0)[0]);
        report.put("grammar", stats.get(0)[1]);
        report.put("fluency", stats.get(0)[2]);

        return ResponseEntity.ok(report);
    }

    // --- Các phương thức cũ ---
    @PostMapping("/feedback")
    public ResponseEntity<String> submitFeedback(
            @RequestParam Integer sessionId,
            @RequestParam String comment,
            @RequestParam Double rating) {
        String result = mentorService.submitFeedback(sessionId, comment, rating);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/learners")
    public ResponseEntity<List<?>> getMyLearners() {
        return ResponseEntity.ok(mentorService.getLearnersByMentorId(1));
    }

    @PostMapping("/upload-document")
    public ResponseEntity<String> uploadDocument(@RequestBody com.aesp.backend.dto.DocumentDTO dto,
            Principal principal) {
        mentorService.uploadDocument(principal.getName(), dto);
        return ResponseEntity.ok("Tài liệu đã được gửi thành công!");
    }

    @PostMapping("/send-document")
    public ResponseEntity<String> sendDocument(
            @RequestParam Integer learnerId,
            @RequestParam String title,
            @RequestParam String url) {
        mentorService.sendDocumentToLearner(learnerId, title, url);
        return ResponseEntity.ok("Tài liệu đã được gửi thành công!");
    }
}