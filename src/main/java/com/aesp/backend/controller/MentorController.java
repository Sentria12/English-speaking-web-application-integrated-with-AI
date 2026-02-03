package com.aesp.backend.controller;

import com.aesp.backend.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @PostMapping("/feedback")
    public ResponseEntity<String> submitFeedback(
            @RequestParam Integer sessionId,
            @RequestParam String comment,
            @RequestParam Double rating) {
        String result = mentorService.submitFeedback(sessionId, comment, rating);
        return ResponseEntity.ok(result);
    }
}