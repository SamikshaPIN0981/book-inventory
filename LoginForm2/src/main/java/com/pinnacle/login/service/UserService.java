package com.pinnacle.login.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pinnacle.login.model.User;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.userdto.UserDTO;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserDTO userDTO) {
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match!");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        return userRepository.save(user);
    }

//    public Optional<User> authenticate(String email, String password) {
//        Optional<User> user = userRepository.findByEmail(email);
//        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
//            return user;
//        }
//        return Optional.empty();
//    }
    
//    public Optional<Optional<User>> authenticate(String email, String password) {
//        Optional<User> user = userRepository.findByEmail(email);
//        if (user != null && passwordEncoder.matches(password, user.get().getPassword())) {
//            return Optional.of(user);
//        }
//        return Optional.empty();
//    }

    public Optional<User> authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}