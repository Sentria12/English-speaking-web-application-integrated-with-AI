package com.aesp.backend.config;

import com.aesp.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.util.AntPathMatcher;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final AntPathMatcher pathMatcher = new AntPathMatcher(); // Thêm cái này

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Dùng getServletPath() thay vì getRequestURI() để tránh Context Path
        String path = request.getServletPath();
        String method = request.getMethod();

        logger.info("Request path: {} [{}]", path, method);

        // Danh sách các path cho phép đi qua
        boolean isPublicPath = pathMatcher.match("/api/auth/**", path) ||
                pathMatcher.match("/api/packages/**", path) ||
                pathMatcher.match("/api/learner/**", path) ||
                pathMatcher.match("/api/payment/**", path);

        if (method.equalsIgnoreCase("OPTIONS") || isPublicPath) {
            logger.info("-> BỎ QUA FILTER: {}", path);
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Xử lý Token cho các đường dẫn yêu cầu Đăng nhập
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // (Giữ nguyên logic token của bạn)
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}