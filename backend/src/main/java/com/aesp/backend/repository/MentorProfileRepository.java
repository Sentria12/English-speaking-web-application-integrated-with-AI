package com.aesp.backend.repository;

import com.aesp.backend.entity.MentorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MentorProfileRepository extends JpaRepository<MentorProfile, Integer> {
    List<MentorProfile> findByStatus(MentorProfile.ApprovalStatus status);
}