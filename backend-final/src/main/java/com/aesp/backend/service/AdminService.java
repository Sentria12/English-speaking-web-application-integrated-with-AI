package com.aesp.backend.service;

import com.aesp.backend.entity.MentorProfile;
import com.aesp.backend.entity.User;
import com.aesp.backend.repository.MentorProfileRepository;
import com.aesp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private MentorProfileRepository mentorProfileRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Lấy danh sách hồ sơ đang chờ duyệt
     */
    public List<MentorProfile> getPendingMentors() {
        return mentorProfileRepository.findByStatus(MentorProfile.ApprovalStatus.PENDING);
    }

    /**
     * PHÊ DUYỆT MENTOR
     * Logic: Cập nhật Profile sang APPROVED và đổi Role của User sang MENTOR
     */
    @Transactional
    public void approveMentor(Integer profileId) {
        MentorProfile profile = mentorProfileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ Mentor với ID: " + profileId));

        // 1. Cập nhật trạng thái hồ sơ thành APPROVED
        profile.setStatus(MentorProfile.ApprovalStatus.APPROVED);
        mentorProfileRepository.save(profile);

        // 2. Nâng cấp quyền hạn cho User liên quan
        User user = profile.getUser();
        if (user != null) {
            user.setRole(User.Role.MENTOR);
            user.setStatus(User.Status.ACTIVE);
            userRepository.save(user);
        }
    }

    /**
     * TỪ CHỐI HỒ SƠ MENTOR (Thêm mới)
     * Logic: Admin không đồng ý, profile chuyển sang REJECTED, User vẫn giữ role
     * LEARNER
     */
    @Transactional
    public void rejectMentor(Integer profileId) {
        MentorProfile profile = mentorProfileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ Mentor để từ chối"));

        profile.setStatus(MentorProfile.ApprovalStatus.REJECTED);
        mentorProfileRepository.save(profile);
    }

    /**
     * XÓA HỒ SƠ (Thêm mới - Dùng khi cần dọn dẹp data)
     */
    @Transactional
    public void deleteProfile(Integer profileId) {
        if (!mentorProfileRepository.existsById(profileId)) {
            throw new RuntimeException("Hồ sơ không tồn tại");
        }
        mentorProfileRepository.deleteById(profileId);
    }
}