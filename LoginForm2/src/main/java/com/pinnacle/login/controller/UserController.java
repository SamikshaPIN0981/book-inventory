package com.pinnacle.login.controller;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.pinnacle.login.model.User;
//import com.pinnacle.login.service.UserService;
//import com.pinnacle.login.userdto.UserDTO;
//
//import jakarta.validation.Valid;
//
//@RestController
//@RequestMapping("/api/auth")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody UserDTO userDTO) {
//        Optional<User> user = userService.authenticate(userDTO.getEmail(), userDTO.getPassword());
//        if (user.isPresent()) {
//            return ResponseEntity.ok().body("Authentication successful"); // Replace with JWT token if required
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
//        try {
//            User user = userService.registerUser(userDTO);
//            return ResponseEntity.status(HttpStatus.CREATED).body(user);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pinnacle.login.model.User;
import com.pinnacle.login.service.UserService;
import com.pinnacle.login.userdto.UserDTO;
import com.pinnacle.login.util.JwtUtil;

import jakarta.validation.Valid;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;
    

    

    @Autowired
    private JwtUtil jwtUtil;

//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody UserDTO userDTO) {
//        Optional<User> user = userService.authenticate(userDTO.getEmail(), userDTO.getPassword());
//        if (user.isPresent()) {
//            return ResponseEntity.ok().body("Login sucessfully ");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }

    
//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody UserDTO userDTO) {
//        Optional<Optional<User>> user = userService.authenticate(userDTO.getEmail(), userDTO.getPassword());
//        if (user.isPresent()) {
//            return ResponseEntity.ok(Map.of(
//                "message", "Login successful",
//                "status", "success",
//                "user", user.get() // Include relevant user details or JWT token
//            ));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
//                "message", "Invalid credentials",
//                "status", "error"
//            ));
//        }
//    }
    
  //  @PostMapping("/authenticate")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDTO userDTO) {
        Optional<User> userOpt = userService.authenticate(userDTO.getEmail(), userDTO.getPassword());
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Generate JWT token with user ID
            String token = jwtUtil.generateToken(user.getId());

            // Return success response with token and user details
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "status", "success",
                    "token", token,
                    "user", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "roleId", user.getRoleId()
                    )
            ));
        } else {
            // Return error if credentials are invalid
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "Invalid credentials",
                    "status", "error"
            ));
        }
    }



//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
//        try {
//            User user = userService.registerUser(userDTO);
//            return ResponseEntity.status(HttpStatus.CREATED).body(user);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            User user = userService.registerUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (IllegalArgumentException e) {
            // Return a well-formed JSON error response
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // ErrorResponse DTO
    public class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
}
}
