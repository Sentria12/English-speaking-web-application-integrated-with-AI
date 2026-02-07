package com.aesp.backend.controller;

import com.aesp.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // FIX 403: Thêm endpoint mà Frontend (PaymentForm.tsx) đang gọi
    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> request) {
        // Log để bạn kiểm tra trong Docker console xem request có vào được đây không
        System.out.println(">>> Backend: Nhận request tạo Payment Intent cho gói ID: " + request.get("packageId"));

        // Gọi Service xử lý (Bạn cần đảm bảo PaymentService có hàm createIntent)
        // Nếu PaymentService chưa có, bạn cần thêm nó vào service
        Map<String, Object> response = paymentService.createIntent(request);
        return ResponseEntity.ok(response);
    }

    // Endpoint xác nhận sau khi thanh toán thành công
    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, Object> request) {
        System.out.println(">>> Backend: Xác nhận thanh toán thành công");
        // Gọi service xử lý logic lưu Database
        return ResponseEntity.ok(paymentService.confirmPayment(request));
    }

    @PostMapping("/process")
    public String processPayment(
            @RequestParam Integer subscriptionId,
            @RequestParam BigDecimal amount,
            @RequestParam String method) {
        return paymentService.processPayment(subscriptionId, amount, method);
    }
}