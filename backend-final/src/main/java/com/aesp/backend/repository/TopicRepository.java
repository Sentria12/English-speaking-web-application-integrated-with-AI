package com.aesp.backend.repository;

import com.aesp.backend.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {
    // Query custom ví dụ:
    // Topic findByTopicName(String topicName);
}