package com.aesp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "speaking_evaluations")
@Data
public class SpeakingEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;

    private Integer mentorId;
    private Integer learnerId;
    private Integer bookingId; // Liên kết với buổi đặt lịch cụ thể

    private Double pronunciationScore; // Điểm phát âm
    private Double grammarScore; // Điểm ngữ pháp
    private Double fluencyScore; // Điểm lưu loát

    @Column(columnDefinition = "TEXT")
    private String feedbackDetails; // Chỉ ra lỗi sai cụ thể

    private LocalDateTime createdAt = LocalDateTime.now();
}
