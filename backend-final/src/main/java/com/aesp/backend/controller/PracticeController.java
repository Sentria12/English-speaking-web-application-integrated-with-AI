package com.aesp.backend.controller;

import com.aesp.backend.service.PracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/practice")
@CrossOrigin(origins = "*")
public class PracticeController {

    @Autowired
    private PracticeService practiceService;

    @PostMapping("/start")
    public ResponseEntity<String> startConversation(@RequestParam String topic,
            @RequestBody(required = false) String userMessage) {
        return ResponseEntity.ok(practiceService.startConversation(topic, userMessage));
    }

    @PostMapping(value = "/analyze-audio", consumes = "multipart/form-data")
    public ResponseEntity<String> analyzeAudio(
            @RequestParam String topic,
            @RequestParam Integer userId, // Đã thêm userId
            @RequestPart("audio") MultipartFile audioFile) {

        String resultJson = practiceService.analyzeAudio(audioFile, topic, userId);
        return ResponseEntity.ok(resultJson);
    }
}