package com.aesp.backend.repository;

import com.aesp.backend.entity.Subscription;
import com.aesp.backend.entity.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    // Phương thức này sẽ tìm Subscription dựa trên Learner ID và Trạng thái
    Optional<Subscription> findByLearnerLearnerIdAndStatus(Integer learnerId, SubscriptionStatus status);
}