package com.aesp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "speaking_evaluations")
@Data // Giữ nguyên Data cho IDE, nhưng viết thêm Getter bên dưới để Maven chắc chắn
      // build được
public class SpeakingEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluation_id")
    private Long evaluationId;

    @Column(name = "mentor_id")
    private Integer mentorId;

    @Column(name = "learner_id")
    private Integer learnerId;

    @Column(name = "booking_id")
    private Integer bookingId;

    @Column(name = "pronunciation_score")
    private Double pronunciationScore;

    @Column(name = "grammar_score")
    private Double grammarScore;

    @Column(name = "fluency_score")
    private Double fluencyScore;

    @Column(name = "feedback_details", columnDefinition = "TEXT")
    private String feedbackDetails;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // VIẾT TAY GETTER ĐỂ TRÁNH LỖI MAVEN COMPILER LOMBOK
    public Double getPronunciationScore() {
        return this.pronunciationScore;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
}