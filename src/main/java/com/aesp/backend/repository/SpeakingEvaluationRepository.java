package com.aesp.backend.repository;

import com.aesp.backend.entity.SpeakingEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SpeakingEvaluationRepository extends JpaRepository<SpeakingEvaluation, Long> {

    // Lấy danh sách đánh giá của một học viên để vẽ biểu đồ tiến độ
    List<SpeakingEvaluation> findByLearnerIdOrderByCreatedAtDesc(Integer learnerId);

    // Tính điểm trung bình các kỹ năng của học viên
    @Query("SELECT AVG(e.pronunciationScore), AVG(e.grammarScore), AVG(e.fluencyScore) " +
            "FROM SpeakingEvaluation e WHERE e.learnerId = ?1")
    List<Object[]> getAverageScoresByLearner(Integer learnerId);
}
