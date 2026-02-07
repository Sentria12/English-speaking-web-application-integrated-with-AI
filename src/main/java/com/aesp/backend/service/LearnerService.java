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
        User user = userRepository.findById(userId).orElse(null);
        if (user == null)
            return null;

        return learnerRepository.findByUser(user);
    }

    public void updateProfile(Learner learner) {
        learnerRepository.save(learner);
    }
}
