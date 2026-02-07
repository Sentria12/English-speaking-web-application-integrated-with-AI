package com.aesp.backend.repository;

import com.aesp.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    // UserDetailsServiceImpl
    Optional<User> findByEmail(String email);

    List<User> findByMentor_UserId(Integer mentorId);
}
