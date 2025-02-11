package com.pinnacle.login.repository;

import com.pinnacle.login.model.User;
import com.pinnacle.login.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long userId);
    
    Optional<UserProfile> findByUser(User user);
}
