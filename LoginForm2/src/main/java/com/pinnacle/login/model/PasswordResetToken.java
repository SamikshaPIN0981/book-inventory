//// PasswordResetToken.java
//package com.pinnacle.login.model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToOne;
//
//@Entity
//public class PasswordResetToken {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String token;
//    
//    @ManyToOne
//    private User user;
//    
//    // Constructor
//    public PasswordResetToken(User user) {
//        this.user = user;
//        this.token = generateToken();  // Implement token generation logic
//    }
//
//    // Generate a token (this can be customized as needed)
//    private String generateToken() {
//        return java.util.UUID.randomUUID().toString();
//    }
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getToken() {
//		return token;
//	}
//
//	public void setToken(String token) {
//		this.token = token;
//	}
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
//
//    // other fields, getters, and setters
//}
