package com.aesp.backend.controller;

import com.aesp.backend.entity.Subscription;
import com.aesp.backend.entity.SubscriptionStatus;
import com.aesp.backend.entity.Learner;
import com.aesp.backend.entity.LearningPackage;
import com.aesp.backend.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Map;

/**
 * Controller xử lý việc đăng ký gói học (Subscription)
 */
@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*") // Hỗ trợ gọi API từ Frontend khác Port
public class SubscriptionController {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Map<String, Object> payload) {
        try {
            // 1. Kiểm tra dữ liệu đầu vào từ Frontend
            if (payload.get("userId") == null || payload.get("packageId") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Thiếu thông tin userId hoặc packageId"));
            }

            // 2. Ép kiểu an toàn (tránh lỗi ClassCastException giữa Double/Integer/String)
            Integer userId = Integer.valueOf(payload.get("userId").toString());
            Integer packageId = Integer.valueOf(payload.get("packageId").toString());

            // 3. Khởi tạo đối tượng Subscription mới
            Subscription sub = new Subscription();

            // Thiết lập Learner (Người học)
            Learner learner = new Learner();
            learner.setLearnerId(userId);
            sub.setLearner(learner);

            // Thiết lập Gói học
            LearningPackage pkg = new LearningPackage();
            pkg.setPackageId(packageId);
            sub.setLearningPackage(pkg);

            // Thiết lập trạng thái
            sub.setStatus(SubscriptionStatus.ACTIVE);

            // 4. Xử lý thời gian (StartDate & EndDate)
            Timestamp now = new Timestamp(System.currentTimeMillis());
            sub.setStartDate(now);

            // Logic tính ngày: Dựa trên ảnh thực tế của bạn
            // Gói 1 & 2: 30 ngày | Gói 3: 90 ngày
            int daysToAdd = 30;
            if (packageId == 3) {
                daysToAdd = 90;
            }

            Calendar c = Calendar.getInstance();
            c.setTimeInMillis(now.getTime());
            c.add(Calendar.DAY_OF_MONTH, daysToAdd);
            sub.setEndDate(new Timestamp(c.getTimeInMillis()));

            // 5. Lưu xuống Database
            subscriptionRepository.save(sub);

            // 6. Trả về kết quả cho Frontend
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Kích hoạt thành công! Hạn dùng đến: " + sub.getEndDate(),
                    "endDate", sub.getEndDate()));

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "ID người dùng hoặc gói học không hợp lệ."));
        } catch (Exception e) {
            // Log lỗi chi tiết để debug trong Docker/IDE
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Lỗi máy chủ: " + e.getMessage()));
        }
    }
}