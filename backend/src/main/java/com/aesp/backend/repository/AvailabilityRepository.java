package com.aesp.backend.repository;

import com.aesp.backend.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    // Thêm dòng này để Frontend có thể lấy lịch của riêng từng Mentor
    List<Availability> findByMentorId(Integer mentorId);
}