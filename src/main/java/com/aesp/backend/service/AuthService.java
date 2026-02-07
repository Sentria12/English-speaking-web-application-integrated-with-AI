package com.aesp.backend.service;

import com.aesp.backend.dto.LoginRequest;
import com.aesp.backend.dto.RegisterRequest;
import com.aesp.backend.entity.User;
import com.aesp.backend.repository.UserRepository;
import com.aesp.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Xử lý đăng nhập
     */
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không chính xác"));

        if (!user.getPasswordHash().equals(request.getPassword())) {
            throw new RuntimeException("Mật khẩu không chính xác");
        }

        // ĐÃ SỬA: Truyền thêm tham số thứ 4 là user.getFullName()
        return jwtUtil.generateToken(
                user.getUserId(),
                user.getEmail(),
                user.getRole().name(),
                user.getFullName() // <--- THÊM DÒNG NÀY
        );
    }

    /**
     * Xử lý đăng ký tài khoản mới
     */
    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email đã tồn tại";
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPassword());

        user.setFullName(request.getFullName());

        user.setRole(User.Role.LEARNER);
        user.setStatus(User.Status.ACTIVE);
        userRepository.save(user); // Lưu ý: thường là userRepository.save(user)
        return "Đăng ký thành công";
    }
}
