package com.aesp.backend.controller;

import com.aesp.backend.entity.User;
import com.aesp.backend.entity.MentorProfile;
import com.aesp.backend.repository.UserRepository;
import com.aesp.backend.repository.MentorProfileRepository; // Import thêm cái này
import com.aesp.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aesp.backend.entity.Transaction;
import com.aesp.backend.repository.TransactionRepository;
import com.aesp.backend.repository.LearningPackageRepository;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép Frontend gọi API
public class AdminController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private LearningPackageRepository learningPackageRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminService adminService;

    @Autowired // CỰC KỲ QUAN TRỌNG: Phải inject Repository này thì mới dùng được ở dưới
    private MentorProfileRepository mentorProfileRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getSystemStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalUsers", userRepository.count());
            stats.put("totalMentors", mentorProfileRepository.count());

            Double revenue = transactionRepository.sumTotalRevenue();
            stats.put("totalRevenue", revenue != null ? revenue : 0.0);

            stats.put("totalPackages", learningPackageRepository.count());

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi thống kê: " + e.getMessage());
        }
    }

    // 3. Thêm hàm lấy danh sách giao dịch
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionRepository.findAll());
    }

    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Integer id) {
        return userRepository.findById(id).map(user -> {
            try {
                // Logic chuyển đổi trạng thái User
                String current = String.valueOf(user.getStatus());
                String target = "ACTIVE".equals(current) ? "INACTIVE" : "ACTIVE";
                user.setStatus(Enum.valueOf(user.getStatus().getDeclaringClass(), target));
                userRepository.save(user);
                return ResponseEntity.ok(Map.of("message", "Cập nhật trạng thái thành công"));
            } catch (Exception e) {
                return ResponseEntity.internalServerError().body(Map.of("error", "Lỗi: " + e.getMessage()));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- TÍNH NĂNG DUYỆT MENTOR ---

    @GetMapping("/pending-mentors")
    public ResponseEntity<List<MentorProfile>> getPendingMentors() {
        // Lấy danh sách hồ sơ có trạng thái PENDING
        return ResponseEntity.ok(mentorProfileRepository.findByStatus(MentorProfile.ApprovalStatus.PENDING));
    }

    @PutMapping("/approve-mentor/{profileId}")
    public ResponseEntity<?> approveMentor(@PathVariable Integer profileId) {
        try {
            // Gọi service để đổi trạng thái Profile và nâng Role của User
            adminService.approveMentor(profileId);
            return ResponseEntity.ok(Map.of("message", "Đã duyệt Mentor và nâng cấp quyền thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/reject-mentor/{profileId}")
    public ResponseEntity<?> rejectMentor(@PathVariable Integer profileId) {
        adminService.rejectMentor(profileId);
        return ResponseEntity.ok(Map.of("message", "Đã từ chối hồ sơ Mentor này"));
    }
}