-- 1. Tạo Database (xóa cũ nếu có)
DROP DATABASE IF EXISTS aesp;
CREATE DATABASE aesp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aesp;

-- 2. Bảng User (Gốc cho mọi tài khoản)
CREATE TABLE `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100),
  `phone` VARCHAR(20),
  `role` ENUM('ADMIN', 'MENTOR', 'LEARNER') NOT NULL DEFAULT 'LEARNER',
  `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  `avatar_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  INDEX idx_email (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Bảng Learner (Chi tiết cho Học viên)
CREATE TABLE `learner` (
  `learner_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `english_level` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
  `pronunciation_score` DECIMAL(3,1) DEFAULT 0.0,
  `total_practice_hours` INT DEFAULT 0,
  `current_streak_days` INT DEFAULT 0,
  `learning_goals` TEXT,
  `preferred_topics` JSON,
  `last_practice_date` DATE,
  PRIMARY KEY (`learner_id`),
  CONSTRAINT `fk_learner_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  INDEX idx_user_id (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Bảng Mentor (Chi tiết cho Gia sư)
CREATE TABLE `mentor` (
  `mentor_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `specialization` VARCHAR(255),
  `years_of_experience` INT DEFAULT 0,
  `rating` DECIMAL(2,1) DEFAULT 0.0,
  `is_verified` TINYINT(1) DEFAULT 0,
  `hourly_rate` DECIMAL(10,2),
  PRIMARY KEY (`mentor_id`),
  CONSTRAINT `fk_mentor_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  INDEX idx_user_id (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Bảng Learning Packages (Gói dịch vụ)
CREATE TABLE `learning_packages` (
  `package_id` INT NOT NULL AUTO_INCREMENT,
  `package_name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(12,2) NOT NULL,
  `duration_days` INT NOT NULL,
  `has_mentor` TINYINT(1) DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`package_id`),
  INDEX idx_is_active (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Bảng Subscription (Đăng ký gói)
CREATE TABLE `subscription` (
  `subscription_id` INT NOT NULL AUTO_INCREMENT,
  `learner_id` INT NOT NULL,
  `package_id` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('ACTIVE', 'EXPIRED', 'CANCELLED') DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`subscription_id`),
  FOREIGN KEY (`learner_id`) REFERENCES `learner`(`learner_id`) ON DELETE CASCADE,
  FOREIGN KEY (`package_id`) REFERENCES `learning_packages`(`package_id`) ON DELETE RESTRICT,
  INDEX idx_learner_id (`learner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Bảng Payment (Thanh toán)
CREATE TABLE `payment` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `subscription_id` INT NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `payment_method` VARCHAR(50),
  `status` ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
  `payment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  FOREIGN KEY (`subscription_id`) REFERENCES `subscription`(`subscription_id`) ON DELETE CASCADE,
  INDEX idx_subscription_id (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ====================
-- DỮ LIỆU MẪU (TEST DASHBOARD & PACKAGES)
-- ====================

-- 1. Tạo User Learner (password: 12345678 - bcrypt hash)
INSERT INTO `user` (email, password_hash, full_name, role, status) 
VALUES ('learner@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8Kn.2ndfWCcLQEEYnW2HJuqEG6QH07.d9L6', 'Nguyễn Văn Học', 'LEARNER', 'ACTIVE');

-- Lấy user_id vừa insert (giả sử 1)
SET @learner_user_id = LAST_INSERT_ID();

-- 2. Tạo Profile Learner
INSERT INTO `learner` (user_id, english_level, pronunciation_score, current_streak_days, total_practice_hours)
VALUES (@learner_user_id, 'INTERMEDIATE', 7.8, 15, 45);

-- 3. Tạo 3 gói dịch vụ mẫu
INSERT INTO `learning_packages` (package_name, description, price, duration_days, has_mentor, is_active)
VALUES 
('Gói AI Cơ Bản', 'Luyện tập phát âm với trí tuệ nhân tạo 24/7', 250000.00, 30, 0, 1),
('Gói Mentor Pro', 'Luyện tập cùng AI và 4 buổi/tháng cùng Mentor', 850000.00, 30, 1, 1),
('Gói Siêu Cấp 90 Ngày', 'Tiết kiệm hơn với lộ trình dài hạn + Mentor 1-1', 1500000.00, 90, 1, 1);

-- 4. Tạo 1 subscription mẫu (để test dashboard)
INSERT INTO `subscription` (learner_id, package_id, start_date, end_date, status)
VALUES 
(@learner_user_id, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'ACTIVE');

-- 5. Tạo 1 payment mẫu
INSERT INTO `payment` (subscription_id, amount, payment_method, status)
VALUES 
(LAST_INSERT_ID(), 250000.00, 'VNPAY', 'PAID');