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
    @Column(name = "evaluation_id") // Ánh xạ đúng với tên cột trong database
    private Long evaluationId;

    @Column(name = "mentor_id")
    private Integer mentorId;

    @Column(name = "learner_id")
    private Integer learnerId;

    @Column(name = "booking_id")
    private Integer bookingId;

    @Column(name = "pronunciation_score") // Cột chứa điểm số để vẽ biểu đồ
    private Double pronunciationScore;

    @Column(name = "grammar_score")
    private Double grammarScore;

    @Column(name = "fluency_score")
    private Double fluencyScore;

    @Column(name = "feedback_details", columnDefinition = "TEXT")
    private String feedbackDetails;

    @Column(name = "created_at") // Ánh xạ với cột thời gian để trục X hiển thị ngày
    private LocalDateTime createdAt = LocalDateTime.now();
}