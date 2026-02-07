package com.aesp.backend.repository;

import com.aesp.backend.entity.SpeakingEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SpeakingEvaluationRepository extends JpaRepository<SpeakingEvaluation, Long> {

        // Tìm danh sách đánh giá của học viên theo thời gian mới nhất
        List<SpeakingEvaluation> findByLearnerIdOrderByCreatedAtDesc(Integer learnerId);

        // Lấy điểm trung bình các kỹ năng
        @Query("SELECT AVG(e.pronunciationScore), AVG(e.grammarScore), AVG(e.fluencyScore) " +
                        "FROM SpeakingEvaluation e WHERE e.learnerId = ?1")
        List<Object[]> getAverageScoresByLearner(Integer learnerId);

        // Lấy top 10 học viên có điểm phát âm cao nhất (Native Query)
        @Query(value = "SELECT u.full_name, l.pronunciation_score " +
                        "FROM learner l " +
                        "JOIN user u ON l.user_id = u.user_id " +
                        "WHERE l.pronunciation_score IS NOT NULL " +
                        "ORDER BY l.pronunciation_score DESC LIMIT 10", nativeQuery = true)
        List<Object[]> getTopLearnersByPronunciation();
}