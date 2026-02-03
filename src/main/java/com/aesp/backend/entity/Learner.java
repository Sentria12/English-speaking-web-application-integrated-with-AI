package com.aesp.backend.entity;

import jakarta.persistence.*;
import java.sql.Date;
import java.math.BigDecimal;

@Entity
@Table(name = "learner")
public class Learner {

    // ĐỊNH NGHĨA ENUM PUBLIC ĐỂ CONTROLLER TRUY CẬP ĐƯỢC
    public enum EnglishLevel {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "learner_id")
    private Integer learnerId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "english_level")
    private EnglishLevel englishLevel; // Để null mặc định cho người mới

    @Column(name = "pronunciation_score", precision = 3, scale = 1)
    private BigDecimal pronunciationScore;

    @Column(name = "total_practice_hours")
    private Integer totalPracticeHours = 0;

    @Column(name = "current_streak_days")
    private Integer currentStreakDays = 0;

    @Column(name = "learning_goals", columnDefinition = "TEXT")
    private String learningGoals;

    @Column(name = "preferred_topics", columnDefinition = "JSON")
    private String preferredTopics;

    @Column(name = "last_practice_date")
    private Date lastPracticeDate;

    @Column(name = "has_completed_initial_assessment", nullable = false)
    private Boolean hasCompletedInitialAssessment = false;

    // --- GETTERS & SETTERS ---
    public Integer getLearnerId() {
        return learnerId;
    }

    public void setLearnerId(Integer learnerId) {
        this.learnerId = learnerId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EnglishLevel getEnglishLevel() {
        return englishLevel;
    }

    public void setEnglishLevel(EnglishLevel englishLevel) {
        this.englishLevel = englishLevel;
    }

    public BigDecimal getPronunciationScore() {
        return pronunciationScore;
    }

    public void setPronunciationScore(BigDecimal pronunciationScore) {
        this.pronunciationScore = pronunciationScore;
    }

    public Integer getTotalPracticeHours() {
        return totalPracticeHours;
    }

    public void setTotalPracticeHours(Integer totalPracticeHours) {
        this.totalPracticeHours = totalPracticeHours;
    }

    public Integer getCurrentStreakDays() {
        return currentStreakDays;
    }

    public void setCurrentStreakDays(Integer currentStreakDays) {
        this.currentStreakDays = currentStreakDays;
    }

    public String getLearningGoals() {
        return learningGoals;
    }

    public void setLearningGoals(String learningGoals) {
        this.learningGoals = learningGoals;
    }

    public String getPreferredTopics() {
        return preferredTopics;
    }

    public void setPreferredTopics(String preferredTopics) {
        this.preferredTopics = preferredTopics;
    }

    public Date getLastPracticeDate() {
        return lastPracticeDate;
    }

    public void setLastPracticeDate(Date lastPracticeDate) {
        this.lastPracticeDate = lastPracticeDate;
    }

    public Boolean getHasCompletedInitialAssessment() {
        return hasCompletedInitialAssessment;
    }

    public void setHasCompletedInitialAssessment(Boolean hasCompletedInitialAssessment) {
        this.hasCompletedInitialAssessment = hasCompletedInitialAssessment;
    }
}