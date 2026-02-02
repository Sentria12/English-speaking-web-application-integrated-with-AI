package com.aesp.backend.controller;

import com.aesp.backend.service.PracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/practice")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173", "http://localhost:5174" })
public class PracticeController {

    @Autowired
    private PracticeService practiceService;

    @PostMapping("/start")
    public ResponseEntity<String> startConversation(
            @RequestParam String topic,
            @RequestBody(required = false) String userMessage) {

        // Fallback nếu không có body
        String input = (userMessage == null || userMessage.trim().isEmpty())
                ? "Hello, let's practice!"
                : userMessage.trim();

        String reply = practiceService.startConversation(topic, input);
        return ResponseEntity.ok(reply);
    }

    @PostMapping(value = "/analyze-audio", consumes = "multipart/form-data")
    public ResponseEntity<String> analyzeAudio(
            @RequestParam String topic,
            @RequestPart("audio") MultipartFile audioFile) {

        if (audioFile == null || audioFile.isEmpty()) {
            return ResponseEntity.badRequest().body("File audio rỗng hoặc không hợp lệ");
        }

        String feedback = practiceService.analyzeAudio(audioFile, topic);
        return ResponseEntity.ok(feedback);
    }
}