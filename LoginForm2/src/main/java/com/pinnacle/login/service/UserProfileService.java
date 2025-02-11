package com.pinnacle.login.service;


import com.pinnacle.login.model.User;
import com.pinnacle.login.model.UserProfile;
import com.pinnacle.login.repository.UserProfileRepository;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.userdto.UserProfileRequestDto;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    public UserProfileService(UserProfileRepository userProfileRepository, UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    public UserProfile createUserProfile(UserProfileRequestDto request) throws IOException {
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setUser(userOptional.get());
        userProfile.setFirstName(request.getFirstName());
        userProfile.setLastName(request.getLastName());
        userProfile.setDateOfBirth(request.getDateOfBirth());
        userProfile.setGender(request.getGender());
        userProfile.setAddress(request.getAddress());
        userProfile.setPhone(request.getPhone());
        userProfile.setNationality(request.getNationality());
        userProfile.setMaritalStatus(request.getMaritalStatus());
        userProfile.setOccupation(request.getOccupation());

        String imageBase64 = request.getProfileImageBase64();
        if (imageBase64 != null) {
            // Convert Base64 string back to byte[] for storage
            byte[] imageBytes = Base64.getDecoder().decode(imageBase64);
            userProfile.setProfileImage(imageBytes);
        }

        return userProfileRepository.save(userProfile);
    }
}
