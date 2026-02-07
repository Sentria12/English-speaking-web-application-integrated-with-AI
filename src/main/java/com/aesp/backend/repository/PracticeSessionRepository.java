package com.aesp.backend.repository;

import com.aesp.backend.entity.PracticeSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Integer> {
    // Query custom ví dụ:
    // List<PracticeSession> findByLearnerId(Integer learnerId);
    // List<PracticeSession> findBySessionType(SessionType sessionType);
}