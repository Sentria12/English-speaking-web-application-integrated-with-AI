package com.aesp.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class ProgressResponseDTO {
    private Double avgPronunciation;

    @JsonProperty("current_streak_days")
    private Integer currentStreakDays;

    private List<ChartDataPoint> chartData;

    private List<Map<String, Object>> leaderboard;

    // Constructor mặc định (cần cho Jackson)
    public ProgressResponseDTO() {
    }

    // Constructor 4 tham số viết tay để sửa lỗi Compilation
    public ProgressResponseDTO(Double avgPronunciation, Integer currentStreakDays,
            List<ChartDataPoint> chartData, List<Map<String, Object>> leaderboard) {
        this.avgPronunciation = avgPronunciation;
        this.currentStreakDays = currentStreakDays;
        this.chartData = chartData;
        this.leaderboard = leaderboard;
    }
}