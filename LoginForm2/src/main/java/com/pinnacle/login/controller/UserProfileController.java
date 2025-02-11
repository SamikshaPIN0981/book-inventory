package com.pinnacle.login.controller;

import java.time.LocalDate;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pinnacle.login.model.User;
import com.pinnacle.login.model.UserProfile;
import com.pinnacle.login.repository.UserProfileRepository;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.util.JwtUtil;

//@RestController
//@RequestMapping("/api/profile")
//public class UserProfileController {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private UserRepository userRepo;
//
//    @Autowired
//    private UserProfileRepository userProfileRepo;
//
//    // ✅ Fetch user profile using JWT token
////    @GetMapping
////    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
////        try {
////            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
////            Optional<UserProfile> userProfileOpt = userProfileRepo.findByUserId(userId);
////
////            if (userProfileOpt.isPresent()) {
////                return ResponseEntity.ok(userProfileOpt.get());
////            } else {
////                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
////            }
////        } catch (Exception e) {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
////        }
////    }
//    
//    @GetMapping
//    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
//        try {
//            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
//            Optional<UserProfile> userProfileOpt = userProfileRepo.findByUserId(userId);
//
//            if (userProfileOpt.isPresent()) {
//                UserProfile userProfile = userProfileOpt.get();
//                
//                // Convert BLOB (profile image) to Base64 string if it exists
//                if (userProfile.getProfileImage() != null) {
//                    String base64Image = Base64.getEncoder().encodeToString(userProfile.getProfileImage());
//                    userProfile.setProfileImageBase64(base64Image);
//                }
//
//                return ResponseEntity.ok(userProfile);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
//        }
//    }
//
//
//
//    // ✅ Create or Update User Profile
//    @PostMapping("/create")
//    public ResponseEntity<?> createUserProfile(
//            @RequestHeader("Authorization") String token,
//            @RequestPart("userProfile") UserProfileRequestDto userProfileRequestDto, 
//            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
//
//        try {
//            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
//            Optional<User> userOpt = userRepo.findById(userId);
//
//            if (userOpt.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
//            }
//
//            Optional<UserProfile> existingProfile = userProfileRepo.findByUserId(userId);
//
//            if (existingProfile.isPresent()) {
//                return ResponseEntity.status(HttpStatus.CONFLICT).body("Profile already exists.");
//            }
//
//            // Map DTO to Entity
//            UserProfile userProfile = new UserProfile();
//            userProfile.setUser(userOpt.get());
//            userProfile.setFirstName(userProfileRequestDto.getFirstName());
//            userProfile.setLastName(userProfileRequestDto.getLastName());
//            userProfile.setDateOfBirth(userProfileRequestDto.getDateOfBirth());
//            userProfile.setGender(userProfileRequestDto.getGender());
//            userProfile.setAddress(userProfileRequestDto.getAddress());
//            userProfile.setPhone(userProfileRequestDto.getPhone());
//            userProfile.setNationality(userProfileRequestDto.getNationality());
//            userProfile.setMaritalStatus(userProfileRequestDto.getMaritalStatus());
//            userProfile.setOccupation(userProfileRequestDto.getOccupation());
//
//            if (profileImage != null) {
//                userProfile.setProfileImage(profileImage.getBytes());
//            }
//
//            UserProfile savedProfile = userProfileRepo.save(userProfile);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedProfile);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating profile: " + e.getMessage());
//        }
//    }
//
//}

//@RestController
//@RequestMapping("/api/profile")
//public class UserProfileController {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private UserProfileRepository userProfileRepo;
//
//    // ✅ Fetch user profile using JWT token
//    @GetMapping
//    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
//        try {
//            if (!token.startsWith("Bearer ")) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format.");
//            }
//
//            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
//            Optional<UserProfile> userProfileOpt = userProfileRepo.findByUserId(userId);
//
//            if (userProfileOpt.isPresent()) {
//                UserProfile userProfile = userProfileOpt.get();
//
//                // Convert BLOB (profile image) to Base64 string if it exists
//                if (userProfile.getProfileImage() != null) {
//                    String base64Image = Base64.getEncoder().encodeToString(userProfile.getProfileImage());
//                    userProfile.setProfileImageBase64(base64Image);
//                }
//
//                return ResponseEntity.ok(userProfile);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
//        }
//    }
//
//    // ✅ Create or Update User Profile (Using @RequestBody for JSON data)
//    @PutMapping("/update")
//    public ResponseEntity<?> updateProfile(
//            @RequestHeader("Authorization") String token,
//            @RequestPart("userProfile") UserProfileRequestDto userProfileRequestDto, // JSON data part
//            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) { // File part
//
//        try {
//            // Token validation
//            if (!token.startsWith("Bearer ")) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format.");
//            }
//
//            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
//            Optional<UserProfile> userProfileOpt = userProfileRepo.findByUserId(userId);
//
//            if (userProfileOpt.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
//            }
//
//            UserProfile userProfile = userProfileOpt.get();
//
//            // Update user profile with the fields from userProfileRequestDto
//            userProfile.setFirstName(userProfileRequestDto.getFirstName());
//            userProfile.setLastName(userProfileRequestDto.getLastName());
//            userProfile.setDateOfBirth(userProfileRequestDto.getDateOfBirth());
//            userProfile.setGender(userProfileRequestDto.getGender());
//            userProfile.setAddress(userProfileRequestDto.getAddress());
//            userProfile.setPhone(userProfileRequestDto.getPhone());
//            userProfile.setNationality(userProfileRequestDto.getNationality());
//            userProfile.setMaritalStatus(userProfileRequestDto.getMaritalStatus());
//            userProfile.setOccupation(userProfileRequestDto.getOccupation());
//
//            // Handle profile image upload (if present)
//            if (profileImage != null) {
//                if (profileImage.getSize() > 5000000) { // 5MB size limit
//                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile image size is too large.");
//                }
//                userProfile.setProfileImage(profileImage.getBytes());
//            }
//
//            // Save the updated profile
//            UserProfile updatedProfile = userProfileRepo.save(userProfile);
//            return ResponseEntity.status(HttpStatus.OK).body(updatedProfile);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating profile: " + e.getMessage());
//        }
//    }
//
//}




@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepo;

    // ✅ Fetch user profile using JWT token
    @GetMapping
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format.");
            }

            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            Optional<UserProfile> userProfileOpt = userProfileRepo.findByUserId(userId);

            if (userProfileOpt.isPresent()) {
                UserProfile userProfile = userProfileOpt.get();

                // Convert BLOB (profile image) to Base64 string if it exists
                if (userProfile.getProfileImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(userProfile.getProfileImage());
                    userProfile.setProfileImageBase64(base64Image);
                }

                return ResponseEntity.ok(userProfile);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    // ✅ Create or Update User Profile (Using form-data)
    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String token,
            @RequestPart("firstName") String firstName,
            @RequestPart("lastName") String lastName,
            @RequestPart("dateOfBirth") String dateOfBirth,
            @RequestPart("gender") String gender,
            @RequestPart("address") String address,
            @RequestPart("phone") String phone,
            @RequestPart("nationality") String nationality,
            @RequestPart("maritalStatus") String maritalStatus,
            @RequestPart("occupation") String occupation,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {

        try {
            // Token validation
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format.");
            }

            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            Optional<UserProfile> userProfileOpt = userProfileRepo.findByUserId(userId);

            if (userProfileOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User profile not found.");
            }
            
            LocalDate dob = LocalDate.parse(dateOfBirth);
//            userProfile.setDateOfBirth(dob);

            UserProfile userProfile = userProfileOpt.get();

            // Update user profile with form-data fields
            userProfile.setFirstName(firstName);
            userProfile.setLastName(lastName);
            userProfile.setDateOfBirth(dob);
            userProfile.setGender(gender);
            userProfile.setAddress(address);
            userProfile.setPhone(phone);
            userProfile.setNationality(nationality);
            userProfile.setMaritalStatus(maritalStatus);
            userProfile.setOccupation(occupation);

            // Handle profile image upload (if present)
            if (profileImage != null) {
                if (profileImage.getSize() > 5000000) { // 5MB size limit
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile image size is too large.");
                }
                userProfile.setProfileImage(profileImage.getBytes());
            }

            // Save the updated profile
            UserProfile updatedProfile = userProfileRepo.save(userProfile);
            return ResponseEntity.ok(updatedProfile);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating profile: " + e.getMessage());
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createProfile(
            @RequestHeader("Authorization") String token,
            @RequestPart("firstName") String firstName,
            @RequestPart("lastName") String lastName,
            @RequestPart("dateOfBirth") String dateOfBirth,
            @RequestPart("gender") String gender,
            @RequestPart("address") String address,
            @RequestPart("phone") String phone,
            @RequestPart("nationality") String nationality,
            @RequestPart("maritalStatus") String maritalStatus,
            @RequestPart("occupation") String occupation,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {

        try {
            // Token validation
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format.");
            }

            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));

            // Fetch User from DB
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            
            // Check if profile already exists
            if (userProfileRepo.findByUserId(userId).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile already exists.");
            }

            // Convert dateOfBirth to LocalDate
            LocalDate dob = LocalDate.parse(dateOfBirth);

            // Create a new UserProfile object
            UserProfile newUserProfile = new UserProfile();
            newUserProfile.setUser(userOptional.get()); // ✅ Set User correctly
            newUserProfile.setFirstName(firstName);
            newUserProfile.setLastName(lastName);
            newUserProfile.setDateOfBirth(dob);
            newUserProfile.setGender(gender);
            newUserProfile.setAddress(address);
            newUserProfile.setPhone(phone);
            newUserProfile.setNationality(nationality);
            newUserProfile.setMaritalStatus(maritalStatus);
            newUserProfile.setOccupation(occupation);

            // Handle profile image upload (if present)
            if (profileImage != null) {
                if (profileImage.getSize() > 5000000) { // 5MB size limit
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile image size is too large.");
                }
                newUserProfile.setProfileImage(profileImage.getBytes());
            }

            // Save the new profile
            UserProfile createdProfile = userProfileRepo.save(newUserProfile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating profile: " + e.getMessage());
        }
    }

}



