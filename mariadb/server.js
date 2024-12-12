const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection pool to MariaDB
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // replace with your MariaDB username
  password: '',       // replace with your MariaDB password
  database: 'product_db',
});

// API endpoint to fetch products based on search query
app.get('/api/products', (req, res) => {
  const searchQuery = req.query.query || ''; // Get the search query from the URL parameters

  const sql = `SELECT * FROM products WHERE Produkttitel LIKE ?`;
  pool.query(sql, [`%${searchQuery}%`], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
