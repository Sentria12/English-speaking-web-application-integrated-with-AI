package com.aesp.backend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Sửa lại hàm generateToken để nhận thêm Integer userId
    public String generateToken(Integer userId, String email, String role) {
        String token = Jwts.builder()
                .subject(email)
                .claim("id", userId) // Bắt buộc thêm dòng này để Frontend có ID số
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();

        logger.info("Generated token for UserID: {}, Email: {}", userId, email);
        return token;
    }

    public String getEmailFromToken(String token) {
        try {
            String email = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();

            logger.debug("Extracted email from token: {}", email);
            return email;
        } catch (Exception e) {
            logger.error("Failed to extract email from token: {}", e.getMessage());
            return null;
        }
    }

    public String getRoleFromToken(String token) {
        try {
            String role = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .get("role", String.class);

            logger.debug("Extracted role from token: {}", role);
            return role;
        } catch (Exception e) {
            logger.error("Failed to extract role from token: {}", e.getMessage());
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            logger.info("Token validated successfully");
            return true;
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getMessage());
            return false;
        }
    }
}
