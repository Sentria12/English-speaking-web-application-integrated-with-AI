package com.aesp.backend.dto;

import lombok.Data;

@Data
public class ChartDataPoint {
    private String label;
    private Double value;

    // Constructor mặc định
    public ChartDataPoint() {
    }

    // THÊM CONSTRUCTOR NÀY ĐỂ HẾT LỖI
    public ChartDataPoint(String label, Double value) {
        this.label = label;
        this.value = value;
    }
}