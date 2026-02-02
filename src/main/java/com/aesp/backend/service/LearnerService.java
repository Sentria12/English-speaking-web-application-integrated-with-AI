package com.aesp.backend.service;

import com.aesp.backend.entity.Learner;
import com.aesp.backend.entity.User;
import com.aesp.backend.repository.LearnerRepository;
import com.aesp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LearnerService {

    @Autowired
    private LearnerRepository learnerRepository;

    @Autowired
    private UserRepository userRepository;

    public Learner getProfile(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        Learner learner = learnerRepository.findByUser(user);
        if (learner == null) {
            throw new RuntimeException("Không tìm thấy profile learner");
        }
        return learner;
    }

    public String updateProfile(Learner updatedLearner) {
        Learner learner = learnerRepository.findById(updatedLearner.getLearnerId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy learner"));

        learner.setEnglishLevel(updatedLearner.getEnglishLevel());
        learner.setPronunciationScore(updatedLearner.getPronunciationScore());
        learner.setLearningGoals(updatedLearner.getLearningGoals());
        learner.setPreferredTopics(updatedLearner.getPreferredTopics());

        learnerRepository.save(learner);
        return "Cập nhật profile thành công";
    }
}