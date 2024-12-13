-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS product_db;

-- Switch to the database
USE product_db;

-- Drop the table if it exists (for idempotent script execution)
DROP TABLE IF EXISTS products;

-- Create the products table
CREATE TABLE products (
    ProduktID INT AUTO_INCREMENT PRIMARY KEY,   -- Auto-increment for ProduktID
    Produktcode VARCHAR(50) NOT NULL,           -- Produktcode as a string (max length 50)
    Produkttitel VARCHAR(255) NOT NULL,         -- Produkttitel as a string (max length 255)
    Autorname VARCHAR(255),                     -- Autorname as a string (max length 255)
    Verlagsname VARCHAR(255),                   -- Verlagsname as a string (max length 255)
    PreisID VARCHAR(255),                        -- PreisID as a string (max length 255)
    PreisNetto DECIMAL(10, 4),                  -- PreisNetto as a decimal with 4 decimal places
    Mwstsatz DECIMAL(5, 4),                    -- Mwstsatz as a decimal with 4 decimal places
    PreisBrutto DECIMAL(10, 4),                -- PreisBrutto as a decimal with 4 decimal places
    Lagerbestand INT,                          -- Lagerbestand as an integer
    Kurzinhalt TEXT,                            -- Kurzinhalt as a text field (for long descriptions)
    Gewicht INT,                               -- Gewicht as an integer (assuming it's in grams)
    LinkGrafikdatei VARCHAR(255)               -- LinkGrafikdatei as a string (max length 255)
);

-- Insert the sample product data
INSERT INTO products (Produktcode, Produkttitel, Autorname, Verlagsname, PreisID, PreisNetto, Mwstsatz, PreisBrutto, Lagerbestand, Kurzinhalt, Gewicht, LinkGrafikdatei)
VALUES
    ('PHP1', 'Einführung in PHP 8.0 - Teil 1', 'Max Mustermann', 'Spring verlag', 'price_1QVYvbLEVuUKXSXtSWu0sBIH', 35.0000, 7.0000, 37.4500, 75, 'Detaillierte Einführung in PHP 8.0 mit praxisnahen Beispielen', 1600, ''),
    ('PHP2', 'Einführung in PHP 8.0 - Teil 2', 'Max Mustermann', 'Spring verlag', 'price_1QVcNYLEVuUKXSXt9inUHraH', 32.0000, 7.0000, 34.2400, 120, 'Vertiefte PHP 8.0 Konzepte für Fortgeschrittene', 1550, ''),
    ('JAVA1', 'Einführung in JAVA - Teil 1', 'Max Mustermann', 'DPUNKT Verlag', 'price_1QVcOXLEVuUKXSXtsQwXlEPt', 40.0000, 7.0000, 42.8000, 60, 'Fortgeschrittene Konzepte in JAVA und deren Anwendungen', 1700, ''),
    ('JAVA2', 'Einführung in JAVA - Teil 2', 'Max Mustermann', 'DPUNKT Verlag', 'price_1QVcOxLEVuUKXSXtSjNlnkXI', 45.0000, 7.0000, 48.1500, 40, 'Vertiefung der JAVA-Konzepte mit modernen Ansätzen', 1800, ''),
    ('JS1', 'JavaScript für Einsteiger', 'Anna Beispiel', 'Tech Books Verlag', 'price_1QVcPELEVuUKXSXtiQdmENHJ', 25.0000, 7.0000, 26.7500, 100, 'Perfekte Einführung in JavaScript für Anfänger', 1400, ''),
    ('JS2', 'JavaScript für Fortgeschrittene', 'Anna Beispiel', 'Tech Books Verlag', 'price_1QVcPWLEVuUKXSXtyvfsd9oJ', 40.0000, 7.0000, 42.8000, 80, 'Vertiefte JavaScript-Techniken für fortgeschrittene Entwickler', 1450, ''),
    ('PYTHON1', 'Python 3.0 für Einsteiger', 'Erik Beispiel', 'Tech Press', 'price_1QVcPpLEVuUKXSXt2TxEhPeN', 30.0000, 7.0000, 32.1000, 90, 'Einführung in Python 3.0 mit praxisnahen Beispielen', 1500, ''),
    ('PYTHON2', 'Python 3.0 für Fortgeschrittene', 'Erik Beispiel', 'Tech Press', 'price_1QVcRvLEVuUKXSXt7FOGisd7', 45.0000, 7.0000, 48.1500, 60, 'Erweiterte Python-Techniken und Best Practices', 1550, ''),
    ('C1', 'C Programmierung für Einsteiger', 'Johann Beispiel', 'Programmier Verlag', 'price_1QVcSJLEVuUKXSXtfzMESHF7', 28.0000, 7.0000, 29.9600, 150, 'Grundlagen der C-Programmierung leicht verständlich', 1600, ''),
    ('C2', 'C Programmierung für Fortgeschrittene', 'Johann Beispiel', 'Programmier Verlag', 'price_1QVcShLEVuUKXSXt9BQYlded', 42.0000, 7.0000, 44.9400, 100, 'Komplexe Konzepte und Optimierungen in C', 1650, '');


-- Select all products to verify the data was inserted correctly
SELECT * FROM products;


-- Drop the orders table if it exists
DROP TABLE IF EXISTS orders;

-- Create the orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Unique ID for each order
    customer_name VARCHAR(255) NOT NULL,          -- Customer's name
    email VARCHAR(255) NOT NULL,                  -- Customer's email
    address TEXT NOT NULL,                        -- Shipping address
    total_amount DECIMAL(10, 2) NOT NULL,         -- Total amount of the order
    session_id VARCHAR(255),               -- Stripe session ID for tracking (unique to avoid duplicates)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the order was created
    OrderStatus VARCHAR(50) DEFAULT "Pending" -- Status of the order (e.g., pending, shipped)
);

SELECT * FROM orders;

-- Drop the order_items table if it exists
DROP TABLE IF EXISTS order_items;


-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,     -- Order ID, typically from Stripe session ID or unique ID
    product_id INT NOT NULL,            -- Foreign key reference to products table
    quantity INT NOT NULL,              -- Quantity ordered
    FOREIGN KEY (product_id) REFERENCES products(ProduktID)
);


-- Select all orders to verify the tables
SELECT * FROM order_items;


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