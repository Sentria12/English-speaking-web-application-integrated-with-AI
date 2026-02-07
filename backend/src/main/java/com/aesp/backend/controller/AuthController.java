package com.aesp.backend.controller;

import com.aesp.backend.dto.LoginRequest;
import com.aesp.backend.dto.RegisterRequest;
import com.aesp.backend.service.AuthService;
import com.aesp.backend.entity.User;
import com.aesp.backend.entity.Learner;
import com.aesp.backend.repository.UserRepository;
import com.aesp.backend.repository.LearnerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LearnerRepository learnerRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        String result = authService.register(request);
        if ("Đăng ký thành công".equals(result)) {
            // Trả về Map để Spring tự convert sang JSON {"message": "..."}
            return ResponseEntity.ok(Map.of("message", result));
        }
        return ResponseEntity.badRequest().body(Map.of("message", result));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("role", user.getRole().name());

            // FIX LỖI .map(): Kiểm tra Learner an toàn hơn
            if ("LEARNER".equals(user.getRole().name())) {
                // Cách 1: Nếu findByUser trả về Optional<Learner>
                // boolean hasCompleted = learnerRepository.findByUser(user)
                // .map(Learner::getHasCompletedInitialAssessment)
                // .orElse(false);

                // Cách 2: Nếu findByUser trả về Learner trực tiếp (Dùng cách này cho chắc chắn)
                Learner learner = learnerRepository.findByUser(user);
                boolean hasCompleted = (learner != null)
                        && Boolean.TRUE.equals(learner.getHasCompletedInitialAssessment());

                response.put("hasCompletedAssessment", hasCompleted);
            }

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}