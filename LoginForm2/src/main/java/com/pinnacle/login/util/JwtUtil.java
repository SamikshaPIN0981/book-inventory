package com.pinnacle.login.util;

import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;

@Component // Mark this class as a Spring Bean
public class JwtUtil {

    private final String secretKey = "yourSecretKey"; // You should use a more secure way of managing the secret key, e.g., environment variables

    // Method to generate JWT token
    public String generateToken(Long userId) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey); // HMAC256 for HS256 signature algorithm
        return JWT.create()
                .withSubject(String.valueOf(userId)) // Store user ID as the subject
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiry
                .sign(algorithm);
    }

    // Method to validate JWT token, can be added as needed
    public boolean validateToken(String token) {
        try {
            JWT.require(Algorithm.HMAC256(secretKey))
                    .build()
                    .verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Method to extract user ID from the token, can be added as needed
    public Long extractUserId(String token) {
        return Long.valueOf(JWT.require(Algorithm.HMAC256(secretKey))
                .build()
                .verify(token)
                .getSubject());
    }
}
