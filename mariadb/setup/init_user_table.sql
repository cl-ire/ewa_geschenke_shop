-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS product_db;

-- Switch to the database
USE product_db;

-- Drop the table if it exists (for idempotent script execution)
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Auto-incremented ID for each user (Primary Key)
    username VARCHAR(255) NOT NULL,              -- Username of the user
    Vorname VARCHAR(255) NOT NULL,               -- First name (Vorname)
    Nachname VARCHAR(255) NOT NULL,              -- Last name (Nachname)
    Email VARCHAR(255) NOT NULL UNIQUE,          -- Email (must be unique)
    Straße VARCHAR(255) NOT NULL,                -- Street (Straße)
    Ort VARCHAR(255) NOT NULL,                   -- City (Ort)
    PLZ VARCHAR(20) NOT NULL,                    -- Postal Code (PLZ)
    Nr VARCHAR(50) NOT NULL,                    -- House number (Nr.)
    Passwort VARCHAR(255) NOT NULL,              -- Password (hashed, for security)
    Adminstatus BOOLEAN DEFAULT FALSE,           -- Admin status (true or false)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of creation
);

-- Optional: If you want to add an index for fast search by username or email
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(Email);

-- Insert a default admin user with username "admin" and password "adm24"
-- IMPORTANT: The password should be hashed, for this example, the password is inserted as plaintext

INSERT INTO users (username, Vorname, Nachname, Email, Straße, Ort, PLZ, Nr, Passwort, Adminstatus)
VALUES
('admin', 'Administrator', 'Admin', 'admin@example.com', 'Admin St', 'Admin City', '12345', '1', '$2b$10$QT1oE.xEmuTjFH/KYsvDQumVNpZcOsOvQOTfdWEriV2shFA3hrW16', TRUE);

SELECT * FROM users;