package com.aesp.backend.service;

import com.aesp.backend.dto.*;
import com.aesp.backend.entity.Learner;
import com.aesp.backend.entity.SpeakingEvaluation;
import com.aesp.backend.repository.LearnerRepository;
import com.aesp.backend.repository.SpeakingEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProgressService {

        @Autowired
        private SpeakingEvaluationRepository evaluationRepository;

        @Autowired
        private LearnerRepository learnerRepository;

        public ProgressResponseDTO getAnalytics(Integer userId) {
                // 1. Lấy điểm trung bình tổng quát (Stats card)
                List<Object[]> avgScores = evaluationRepository.getAverageScoresByLearner(userId);
                Double currentAvg = (avgScores != null && !avgScores.isEmpty() && avgScores.get(0)[0] != null)
                                ? ((Number) avgScores.get(0)[0]).doubleValue()
                                : 0.0;

                // 2. Lấy Streak (Chuỗi học tập)
                Integer currentStreak = learnerRepository.findByUserId(userId)
                                .map(Learner::getCurrentStreakDays)
                                .orElse(0);

                // biểu đồ
                List<SpeakingEvaluation> evaluations = evaluationRepository
                                .findByLearnerIdOrderByCreatedAtDesc(userId)
                                .stream()
                                .limit(7)
                                .collect(Collectors.toList());

                Collections.reverse(evaluations);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");
                List<ChartDataPoint> chartData = evaluations.stream()
                                .map(e -> new ChartDataPoint(
                                                e.getCreatedAt().toString(),
                                                e.getPronunciationScore()))
                                .collect(java.util.stream.Collectors.toList());

                List<Object[]> leaderboardRaw = evaluationRepository.getTopLearnersByPronunciation();

                List<Map<String, Object>> leaderboard = leaderboardRaw.stream()
                                .map(row -> {
                                        Map<String, Object> map = new HashMap<>();

                                        map.put("full_name", row[0] != null ? row[0].toString() : "Học viên ẩn danh");

                                        map.put("pronunciation_score",
                                                        row[1] != null ? ((Number) row[1]).doubleValue() : 0.0);
                                        return map;
                                })
                                .collect(Collectors.toList());

                // 5. Trả về kết quả tổng hợp
                return new ProgressResponseDTO(currentAvg, currentStreak, chartData, leaderboard);
        }
}