package com.aesp.backend.repository;

import com.aesp.backend.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    // Query custom ví dụ:
    // List<Subscription> findByLearnerId(Integer learnerId);
    // List<Subscription> findByStatus(SubscriptionStatus status);
}