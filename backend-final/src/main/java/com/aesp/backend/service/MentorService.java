package com.aesp.backend.service;

import com.aesp.backend.entity.Document;
import com.aesp.backend.entity.User;
import com.aesp.backend.entity.MentorProfile; // Thêm dòng này
import com.aesp.backend.dto.MentorRegistrationDTO; // Thêm dòng này
import com.aesp.backend.repository.DocumentRepository;
import com.aesp.backend.repository.UserRepository;
import com.aesp.backend.repository.MentorProfileRepository; // Thêm dòng này
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.transaction.annotation.Transactional; // Thêm dòng này

@Service
public class MentorService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorProfileRepository mentorProfileRepository; // Thêm repository này

    // Trong file MentorService.java
    // Thêm vào file MentorService.java
    @Autowired
    private NotificationService notificationService;

    public void submitFeedback(Integer learnerId, String comment) {
        // ... Logic lưu feedback của bạn ...

        // Bắn thông báo cho học viên
        notificationService.createNotification(
                learnerId,
                "Mentor của bạn đã hoàn thành nhận xét bài nói!",
                "FEEDBACK");
    }

    @Transactional
    public void uploadDocument(String mentorEmail, com.aesp.backend.dto.DocumentDTO dto) {
        User mentor = userRepository.findByEmail(mentorEmail)
                .orElseThrow(() -> new RuntimeException("Mentor không tồn tại"));

        User learner = userRepository.findById(dto.getLearnerId())
                .orElseThrow(() -> new RuntimeException("Học viên không tồn tại"));

        Document doc = new Document();
        doc.setTitle(dto.getTitle());
        doc.setFileUrl(dto.getUrl());
        doc.setDescription(dto.getDescription());
        doc.setMentor(mentor);
        doc.setLearner(learner);

        documentRepository.save(doc);
    }

    public void registerNewMentorRequest(String email, MentorRegistrationDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email: " + email));

        MentorProfile profile = new MentorProfile();
        profile.setUser(user);
        profile.setExperienceSummary(dto.getExperienceSummary());
        profile.setCertificatesUrl(dto.getCertificatesUrl());

        // FIX LỖI Ở ĐÂY: Sử dụng Enum thay vì String
        profile.setStatus(MentorProfile.ApprovalStatus.PENDING);

        mentorProfileRepository.save(profile);
    }

    // --- Các hàm cũ của bạn giữ nguyên ---
    public List<User> getLearnersByMentorId(Integer mentorId) {
        return userRepository.findByMentor_UserId(mentorId);
    }

    public String submitFeedback(Integer sessionId, String comment, Double rating) {
        return "Phản hồi đã được gửi thành công cho session " + sessionId +
                ". Rating: " + rating + ", Comment: " + comment;
    }

    public void sendDocumentToLearner(Integer learnerId, String title, String url) {
        Document doc = new Document();
        doc.setTitle(title);
        doc.setFileUrl(url);

        userRepository.findById(learnerId).ifPresent(user -> {
            doc.setLearner(user);
            documentRepository.save(doc);
        });
    }
}