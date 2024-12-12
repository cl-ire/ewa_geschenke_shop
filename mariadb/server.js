// index.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool to MariaDB
const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "your_database_name", // Replace with your actual DB name
});

const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }

    req.user = user; // Attach the user data to the request object
    next();
  });
};


// Middleware to check if the user has admin privileges
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.Adminstatus !== 'admin') { // Assuming 'admin' is the role value
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    
    next(); // User is an admin, proceed to the next middleware or route handler
  };
  


// User login route
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
  
    // Find user by username
    pool.query("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = rows[0];
  
      // Compare password with hashed password stored in DB
      bcrypt.compare(password, user.Passwort, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
  
        // Generate JWT token
        const token = jwt.sign(
          { userId: user.UserID, username: user.username },
          process.env.JWT_SECRET || "your_secret_key",
          { expiresIn: "1h" } // Set token expiry time
        );
  
        res.json({ token });
      });
    });
  });
  

// Example query to get all users
app.get("/api/users", (req, res) => {
	pool.query("SELECT * FROM users", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

// Example query to add a user
app.post("/api/users", (req, res) => {
    const { username, Vorname, Nachname, Email, Straße, Ort, PLZ, Nr, Passwort, Adminstatus } = req.body;
  
    // Hash the password before saving
    bcrypt.hash(Passwort, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      const query = `INSERT INTO users (username, Vorname, Nachname, Email, Straße, Ort, PLZ, Nr., Passwort, Adminstatus) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      pool.query(
        query,
        [username, Vorname, Nachname, Email, Straße, Ort, PLZ, Nr, hashedPassword, Adminstatus],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: "User added successfully", userId: result.insertId });
        }
      );
    });
  });

app.get("/api/products", (req, res) => {
	pool.query("SELECT * FROM products", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

// Update Lagerbestand in the products table
app.put("/api/products/:id", (req, res) => {
	const { id } = req.params;
	const { Lagerbestand } = req.body;

	const query = "UPDATE products SET Lagerbestand = ? WHERE ProduktID = ?";

	pool.query(query, [Lagerbestand, id], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json({ message: "Lagerbestand updated successfully" });
	});
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
