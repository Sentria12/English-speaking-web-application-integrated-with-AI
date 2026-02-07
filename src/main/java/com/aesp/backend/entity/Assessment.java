package com.aesp.backend.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "learner_id")
    private User learner;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor;

    private String topic;
    private String audioUrl; // Link bài ghi âm của học viên

    @Column(columnDefinition = "TEXT")
    private String feedback; // Mentor nhận xét lỗi phát âm, ngữ pháp

    private Double rating; // Điểm số (Khớp với MentorController của bạn)

    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    // Getter & Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getLearner() {
        return learner;
    }

    public void setLearner(User learner) {
        this.learner = learner;
    }

    public User getMentor() {
        return mentor;
    }

    public void setMentor(User mentor) {
        this.mentor = mentor;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}