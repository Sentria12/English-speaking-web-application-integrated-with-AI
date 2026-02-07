package com.aesp.backend.repository;

import com.aesp.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    // Query custom ví dụ:
    // Payment findByTransactionId(String transactionId);
    // List<Payment> findBySubscriptionId(Integer subscriptionId);
}