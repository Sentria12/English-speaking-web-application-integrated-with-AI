package com.aesp.backend.controller;

import com.aesp.backend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/analytics")
    public ResponseEntity<String> getAnalytics(@RequestParam Integer learnerId) {
        String analytics = progressService.getAnalytics(learnerId);
        return ResponseEntity.ok(analytics);
    }
}