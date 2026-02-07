package com.aesp.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressResponseDTO {
    private Double avgPronunciation;

    // Đổi tên ở đây để khớp với cột trong Database
    @JsonProperty("current_streak_days")
    private Integer currentStreakDays;

    private List<ChartDataPoint> chartData;
    private List<Map<String, Object>> leaderboard;
}