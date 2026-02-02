package com.aesp.backend.repository;

import com.aesp.backend.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Integer> {
    // Nếu cần thêm query custom sau này, ví dụ:
    // Mentor findByUserId(Integer userId);
}