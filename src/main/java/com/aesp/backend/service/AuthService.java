package com.aesp.backend.service;

import com.aesp.backend.dto.LoginRequest;
import com.aesp.backend.dto.RegisterRequest;
import com.aesp.backend.entity.Role;
import com.aesp.backend.entity.Status;
import com.aesp.backend.entity.User;
import com.aesp.backend.repository.UserRepository;
import com.aesp.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            return "Email đã tồn tại";
        }

        Role role = Role.LEARNER;
        if (request.getRole() != null) {
            try {
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                role = Role.LEARNER;
            }
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus(Status.ACTIVE);

        userRepository.save(user);
        return "Đăng ký thành công";
    }

    public String login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu sai"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Email hoặc mật khẩu sai");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }
}