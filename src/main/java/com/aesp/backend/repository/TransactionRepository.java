package com.aesp.backend.repository;

import com.aesp.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Tính tổng doanh thu từ các giao dịch thành công
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.status = 'SUCCESS'")
    Double sumTotalRevenue();

    List<Transaction> findByUserId(Integer userId);
}