package com.pinnacle.login.controller;

//import com.pinnacle.login.exception.UserNotFoundException;
//import com.pinnacle.login.service.PasswordResetService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/password-reset")
//public class PasswordResetController {
//
//    @Autowired
//    private PasswordResetService passwordResetService;
//
//    // Endpoint for sending password reset email
//    @PostMapping("/forgot")
//    public ResponseEntity<String> forgotPassword(@RequestBody EmailRequest emailRequest) {
//        try {
//            passwordResetService.createPasswordResetToken(emailRequest.getEmail());
//            return new ResponseEntity<>("Password reset link sent to your email.", HttpStatus.OK);
//        } catch (UserNotFoundException e) {
//            // Handle the case where the user is not found
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//    }
//
//    // Global exception handler for UserNotFoundException
//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
//    }
//
//    // DTO class to accept the email in request body
//    public static class EmailRequest {
//        private String email;
//
//        public String getEmail() {
//            return email;
//        }
//
//        public void setEmail(String email) {
//            this.email = email;
//        }
//    }
//}
