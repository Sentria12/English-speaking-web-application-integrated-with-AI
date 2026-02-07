package com.aesp.backend.repository;

import com.aesp.backend.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Integer> {
    // Tìm danh sách bài chấm theo ID của học viên
    List<Assessment> findByLearner_UserId(Integer learnerId);

    // Tìm danh sách bài chấm theo ID của Mentor
    List<Assessment> findByMentor_UserId(Integer mentorId);
}