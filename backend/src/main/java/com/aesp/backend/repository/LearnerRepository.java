package com.aesp.backend.repository;

import com.aesp.backend.entity.Learner;
import com.aesp.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface LearnerRepository extends JpaRepository<Learner, Integer> {

    Learner findByUser(User user);

    @Query("SELECT l FROM Learner l WHERE l.user.id = :userId")
    Optional<Learner> findByUserId(@Param("userId") Integer userId);

    // top 10 bang xep hang
    @Query("SELECT l FROM Learner l JOIN FETCH l.user WHERE l.pronunciationScore > 0 ORDER BY l.pronunciationScore DESC")
    List<Learner> findTop10ByOrderByPronunciationScoreDesc();
}