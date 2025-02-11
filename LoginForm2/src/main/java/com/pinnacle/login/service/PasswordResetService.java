// PasswordResetService.java
//package com.pinnacle.login.service;
//
//import com.pinnacle.login.exception.UserNotFoundException;
//import com.pinnacle.login.model.User;
//import com.pinnacle.login.model.PasswordResetToken;
//import com.pinnacle.login.repository.UserRepository;
//import com.pinnacle.login.repository.PasswordResetTokenRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class PasswordResetService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordResetTokenRepository passwordResetTokenRepository;
//
//    public void createPasswordResetToken(String email) {
//        // Find user by email
//        User user = userRepository.findByEmail(email);
//        
//        // If user is not found, throw custom exception
//        if (user == null) {
//            throw new UserNotFoundException("User not found for email: " + email);
//        }
//
//        // Create a password reset token
//        PasswordResetToken token = new PasswordResetToken(user);
//        
//        // Save token to the database
//        passwordResetTokenRepository.save(token);
//    }
//}
