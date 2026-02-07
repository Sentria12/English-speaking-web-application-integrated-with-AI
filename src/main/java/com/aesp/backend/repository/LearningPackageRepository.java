package com.aesp.backend.repository;

import com.aesp.backend.entity.LearningPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningPackageRepository extends JpaRepository<LearningPackage, Integer> {
    // Có thể thêm sau nếu cần:
    // List<LearningPackage> findByIsActive(Boolean isActive);
}