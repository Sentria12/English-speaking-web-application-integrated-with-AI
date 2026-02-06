// File: ChartDataPoint.java
package com.aesp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartDataPoint {
    private String label;
    private Double score;
}