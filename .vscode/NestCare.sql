-- NestCare Adoption Management System Database
-- Created: 2025-11-11

-- Create Database
CREATE DATABASE IF NOT EXISTS nestcare_db;
USE nestcare_db;

-- Children Table
CREATE TABLE children (
    child_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    location VARCHAR(200) NOT NULL,
    bio TEXT,
    status ENUM('available', 'in_process', 'adopted') DEFAULT 'available',
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Caregivers Table
CREATE TABLE caregivers (
    caregiver_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    bio TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Adoption Applications Table
CREATE TABLE adoption_applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    caregiver_id INT NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    notes TEXT,
    decision_date TIMESTAMP NULL,
    FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE CASCADE,
    FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id) ON DELETE CASCADE
);

-- Placement History Table (tracks child-caregiver assignments)
CREATE TABLE placement_history (
    placement_id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    caregiver_id INT NOT NULL,
    placement_date DATE NOT NULL,
    end_date DATE NULL,
    placement_type ENUM('foster', 'adoption', 'temporary') NOT NULL,
    notes TEXT,
    FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE CASCADE,
    FOREIGN KEY (caregiver_id) REFERENCES caregivers(caregiver_id) ON DELETE CASCADE
);

-- User/Admin Table (for system access control)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'viewer') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Activity Log Table (audit trail)
CREATE TABLE activity_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_affected VARCHAR(50),
    record_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Create Indexes for better query performance
CREATE INDEX idx_child_status ON children(status);
CREATE INDEX idx_caregiver_status ON caregivers(status);
CREATE INDEX idx_application_status ON adoption_applications(status);
CREATE INDEX idx_child_name ON children(name);
CREATE INDEX idx_caregiver_name ON caregivers(name);

-- Sample Data Insert Examples

-- Insert sample children
INSERT INTO children (name, age, gender, location, bio, status) VALUES
('Emma Johnson', 5, 'Female', 'Nairobi', 'A cheerful and energetic girl who loves drawing and playing outdoors.', 'available'),
('Michael Ochieng', 8, 'Male', 'Kisumu', 'Intelligent boy who enjoys reading and playing football.', 'available'),
('Grace Wanjiru', 3, 'Female', 'Nakuru', 'Sweet toddler who loves music and dancing.', 'available');

-- Insert sample caregivers
INSERT INTO caregivers (name, age, gender, phone, bio, status) VALUES
('Sarah Kimani', 35, 'Female', '+254712345678', 'Experienced social worker with 10 years in child care. Married with stable income.', 'active'),
('James Mwangi', 42, 'Male', '+254723456789', 'Teacher and father of two. Looking to provide a loving home to another child.', 'active'),
('Mary Njeri', 38, 'Female', '+254734567890', 'Nurse with a passion for helping children. Single but financially stable.', 'active');

-- Insert sample admin user (password should be hashed in production)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@nestcare.org', 'hashed_password_here', 'admin');

-- Useful Queries

-- Find all available children
-- SELECT * FROM children WHERE status = 'available' ORDER BY age;

-- Find all active caregivers
-- SELECT * FROM caregivers WHERE status = 'active' ORDER BY name;

-- Find pending adoption applications
-- SELECT a.application_id, c.name as child_name, cg.name as caregiver_name, a.application_date
-- FROM adoption_applications a
-- JOIN children c ON a.child_id = c.child_id
-- JOIN caregivers cg ON a.caregiver_id = cg.caregiver_id
-- WHERE a.status = 'pending';

-- Get placement history for a specific child
-- SELECT ph.*, cg.name as caregiver_name
-- FROM placement_history ph
-- JOIN caregivers cg ON ph.caregiver_id = cg.caregiver_id
-- WHERE ph.child_id = 1;