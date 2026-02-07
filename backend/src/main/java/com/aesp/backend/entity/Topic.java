package com.aesp.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "topic")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Integer topicId;

    @Column(name = "topic_name", nullable = false)
    private String topicName;

    private String category;

    @Column(name = "vocabulary_list", columnDefinition = "JSON")
    private String vocabularyList; // JSON string, ví dụ ["hello", "goodbye"]

    // Getter và Setter thủ công
    public Integer getTopicId() { return topicId; }
    public void setTopicId(Integer topicId) { this.topicId = topicId; }

    public String getTopicName() { return topicName; }
    public void setTopicName(String topicName) { this.topicName = topicName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getVocabularyList() { return vocabularyList; }
    public void setVocabularyList(String vocabularyList) { this.vocabularyList = vocabularyList; }
}