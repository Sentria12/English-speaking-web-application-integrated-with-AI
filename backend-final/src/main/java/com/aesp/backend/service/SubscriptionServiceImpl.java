package com.aesp.backend.service;

import com.aesp.backend.entity.*;
import com.aesp.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private LearnerRepository learnerRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Override
    @Transactional
    public Subscription activateSubscription(Integer userId, Integer packageId) {
        // 1. Tìm thông tin người học (Learner)
        Learner learner = learnerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Learner not found with ID: " + userId));

        // 2. Tìm thông tin gói học (Package)
        com.aesp.backend.entity.Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found with ID: " + packageId));

        // 3. Kiểm tra xem có subscription nào đang ACTIVE không
        // Sử dụng learner.learnerId để truy vấn chính xác
        Optional<Subscription> existingSub = subscriptionRepository.findByLearnerLearnerIdAndStatus(userId,
                SubscriptionStatus.ACTIVE);

        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        Timestamp startDate = now;

        // 4. Nếu đã có gói đang chạy, cộng dồn ngày bắt đầu từ ngày hết hạn của gói cũ
        if (existingSub.isPresent() && existingSub.get().getEndDate().after(now)) {
            startDate = existingSub.get().getEndDate();
            // Chuyển gói cũ thành EXPIRED để gói mới thay thế trạng thái ACTIVE
            existingSub.get().setStatus(SubscriptionStatus.EXPIRED);
            subscriptionRepository.save(existingSub.get());
        }

        // 5. Tính toán ngày hết hạn dựa trên durationDays từ Package.java
        LocalDateTime endLDT = startDate.toLocalDateTime().plusDays(pkg.getDurationDays());
        Timestamp endDate = Timestamp.valueOf(endLDT);

        // 6. Tạo đối tượng Subscription mới
        Subscription newSub = new Subscription();
        newSub.setLearner(learner);

        // Nếu trong file Subscription.java bạn muốn gán Package, hãy dùng hàm
        // setLearningPackage
        // Lưu ý: Đảm bảo pkg kiểu Package có thể ép kiểu hoặc khớp với LearningPackage
        // newSub.setLearningPackage(pkg);

        newSub.setStartDate(startDate);
        newSub.setEndDate(endDate);
        newSub.setStatus(SubscriptionStatus.ACTIVE);
        newSub.setPaymentStatus(PaymentStatus.COMPLETED);
        newSub.setCreatedAt(now);
        newSub.setUpdatedAt(now);

        return subscriptionRepository.save(newSub);
    }

    @Override
    public boolean isSubscriptionValid(Integer userId) {
        // Kiểm tra xem có bản ghi nào còn hạn sử dụng không
        return subscriptionRepository.findByLearnerLearnerIdAndStatus(userId, SubscriptionStatus.ACTIVE)
                .map(sub -> sub.getEndDate().after(Timestamp.valueOf(LocalDateTime.now())))
                .orElse(false);
    }

    @Override
    public Optional<Subscription> getCurrentSubscription(Integer userId) {
        // Lấy thông tin gói hiện tại của người dùng
        return subscriptionRepository.findByLearnerLearnerIdAndStatus(userId, SubscriptionStatus.ACTIVE);
    }
}