package com.aesp.backend.controller;

import com.aesp.backend.dto.ProgressResponseDTO;
import com.aesp.backend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/{learnerId}/analytics")
    public ResponseEntity<ProgressResponseDTO> getAnalytics(@PathVariable Integer learnerId) {

        ProgressResponseDTO analytics = progressService.getAnalytics(learnerId);

        // Trả về đối tượng DTO đã lấy từ service
        return ResponseEntity.ok(analytics);
    }
}