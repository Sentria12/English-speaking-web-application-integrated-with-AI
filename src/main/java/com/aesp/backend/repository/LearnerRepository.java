package com.aesp.backend.repository;

import com.aesp.backend.entity.Learner;
import com.aesp.backend.entity.User; // THÊM DÒNG NÀY
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Integer> {
    Learner findByUser(User user);
}