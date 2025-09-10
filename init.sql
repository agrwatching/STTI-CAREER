-- init.sql
CREATE DATABASE IF NOT EXISTS stti_career
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE stti_career;

-- Table users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'hr', 'pelamar') NOT NULL DEFAULT 'pelamar',
    address TEXT,
    date_of_birth DATE,
    phone VARCHAR(20),
    company_name VARCHAR(255),
    company_address TEXT,
    position VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table job_posts
CREATE TABLE job_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hr_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    salary_range VARCHAR(100),
    location VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_jobposts_hr FOREIGN KEY (hr_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table applications
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT,
    pelamar_id INT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    cover_letter TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_apps_job FOREIGN KEY (job_id) REFERENCES job_posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_apps_pelamar FOREIGN KEY (pelamar_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin (password bcrypt untuk 'P@ssw0rd123')
INSERT INTO users (full_name, email, password, role) VALUES 
('Administrator', 'admin@stti.ac.id', '$2b$12$3RpE3bM/UnQopxqyr9J0FOrBxz2y2C6w5W7r3K3T1sVgDcq2rHB6i', 'admin');