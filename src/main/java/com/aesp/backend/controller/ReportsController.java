package com.aesp.backend.controller;

import com.aesp.backend.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    private ReportsService reportsService;

    @GetMapping("/weekly")
    public ResponseEntity<String> getWeeklyReport(@RequestParam Integer learnerId) {
        String report = reportsService.getWeeklyReport(learnerId);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/monthly")
    public ResponseEntity<String> getMonthlyReport(@RequestParam Integer learnerId) {
        String report = reportsService.getMonthlyReport(learnerId);
        return ResponseEntity.ok(report);
    }
}