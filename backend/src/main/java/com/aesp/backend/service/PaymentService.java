package com.aesp.backend.service;

import com.aesp.backend.entity.*;
import com.aesp.backend.repository.PaymentRepository;
import com.aesp.backend.repository.SubscriptionRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    // HÀM MỚI: Xử lý tạo Intent cho Frontend
    public Map<String, Object> createIntent(Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long amount = Long.parseLong(data.get("amount").toString());

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("vnd")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true).build())
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);
            response.put("clientSecret", intent.getClientSecret());
            return response;
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return response;
        }
    }

    // HÀM MỚI: Xác nhận và Lưu Database
    public Map<String, Object> confirmPayment(Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        try {
            Integer packageId = (Integer) data.get("packageId");
            String intentId = (String) data.get("paymentIntentId");

            // Tận dụng hàm processPayment có sẵn của bạn để lưu DB
            processPayment(packageId, new BigDecimal(850000), "CREDIT_CARD");

            response.put("status", "success");
            return response;
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return response;
        }
    }

    // HÀM CŨ CỦA BẠN (Giữ nguyên logic lưu DB)
    public String processPayment(Integer subscriptionId, BigDecimal amount, String method) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Số tiền phải lớn hơn 0");
        }

        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy subscription"));

        Payment payment = new Payment();
        payment.setSubscription(subscription);
        payment.setAmount(amount);
        payment.setPaymentMethod("CREDIT_CARD".equalsIgnoreCase(method)
                ? PaymentMethod.CREDIT_CARD
                : PaymentMethod.BANK_TRANSFER);
        payment.setTransactionId("TRANS_" + System.currentTimeMillis());
        payment.setStatus(PaymentStatus.PAID);

        paymentRepository.save(payment);

        subscription.setPaymentStatus(PaymentStatus.PAID);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscriptionRepository.save(subscription);

        return "Thanh toán thành công. Transaction ID: " + payment.getTransactionId();
    }
}