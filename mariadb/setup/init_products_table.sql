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
    PreisNetto DECIMAL(10, 4),                  -- PreisNetto as a decimal with 4 decimal places
    Mwstsatz DECIMAL(5, 4),                    -- Mwstsatz as a decimal with 4 decimal places
    PreisBrutto DECIMAL(10, 4),                -- PreisBrutto as a decimal with 4 decimal places
    Lagerbestand INT,                          -- Lagerbestand as an integer
    Kurzinhalt TEXT,                            -- Kurzinhalt as a text field (for long descriptions)
    Gewicht INT,                               -- Gewicht as an integer (assuming it's in grams)
    LinkGrafikdatei VARCHAR(255)               -- LinkGrafikdatei as a string (max length 255)
);

-- Insert the sample product data
INSERT INTO products (Produktcode, Produkttitel, Autorname, Verlagsname, PreisNetto, Mwstsatz, PreisBrutto, Lagerbestand, Kurzinhalt, Gewicht, LinkGrafikdatei)
VALUES
    ('PHP1', 'Einführung in PHP 8.0 - Teil 1', 'Max Mustermann', 'Spring verlag', 100.0000, 7.0000, 107.0000, 100, 'super Einführung in PHP 8.0 .. ', 1500, ''),
    ('PHP2', 'Einführung in PHP 8.0 - Teil 2', 'Max Mustermann', 'Spring verlag', 200.0000, 7.0000, 214.0000, 50, 'super Einführung in PHP 8.0 .. ', 1500, ''),
    ('PHP2', 'Einführung in PHP 8.0 - Teil 2', 'Max Mustermann', 'Spring verlag', 200.0000, 7.0000, 214.0000, 50, 'super Einführung in PHP 8.0 .. ', 1500, ''),
    ('PHP3', 'Einführung in PHP 8.0 - Teil 3', 'Max Mustermann', 'Spring verlag', 200.0000, 7.0000, 214.0000, 50, 'super Einführung in PHP 8.0 .. ', 1500, ''),
    ('JAVA1', 'Einführung in JAVA', 'Max Mustermann', 'DPUNKT Verlag', 200.0000, 7.0000, 214.0000, 50, 'super Einführung in JAVA .. ', 1500, '');

-- Select all products to verify the data was inserted correctly
SELECT * FROM products;
