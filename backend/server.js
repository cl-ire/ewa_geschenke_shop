// index.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res.status(403).json({ error: "Access denied. No token provided." });
	}

	jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, user) => {
		if (err) {
			return res.status(403).json({ error: "Invalid or expired token." });
		}

		req.user = user; // Attach the user data to the request object
		next();
	});
};

// Middleware to check if the user has admin privileges
const isAdmin = (req, res, next) => {
	if (!req.user || req.user.Adminstatus !== "admin") {
		// Assuming 'admin' is the role value
		return res.status(403).json({ error: "Access denied. Admin privileges required." });
	}

	next(); // User is an admin, proceed to the next middleware or route handler
};

// User login route
app.post("/api/login", (req, res) => {
	const { username, password } = req.body;

	pool.query("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
		if (err) {
			console.error("Database error:", err); // This will log the error to the console
			return res.status(500).json({ error: err.message });
		}

		if (rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		const user = rows[0];

		bcrypt.compare(password, user.Passwort, (err, isMatch) => {
			if (err) {
				console.error("Bcrypt error:", err); // This will log the error from bcrypt
				return res.status(500).json({ error: err.message });
			}

			if (!isMatch) {
				console.log("Password does not match.");
				return res.status(401).json({ error: "Invalid credentials" });
			}

			const token = jwt.sign(
				{ userId: user.id, username: user.username },
				process.env.JWT_SECRET || "your_secret_key",
				{ expiresIn: "1h" }
			);

			console.log("JWT token generated for user:", user.username);

			res.json({ token });
		});
	});
});

app.get("/api/user", authenticateJWT, (req, res) => {
	const userId = req.user.userId; // Get the userId from the JWT payload

	// Log the userId for debugging
	console.log("User ID from token:", userId);

	pool.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
		if (err) {
			console.error("Database error:", err);
			return res.status(500).json({ error: err.message });
		}

		if (rows.length === 0) {
			console.error("User not found for ID:", userId);
			return res.status(404).json({ error: "User not found" });
		}

		const user = rows[0]; // The user data
		res.json(user); // Return the user data as a response
	});
});

// Example query to get all users
app.get("/api/users", authenticateJWT, isAdmin, (req, res) => {
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

		const query = `INSERT INTO users (username, Vorname, Nachname, Email, Straße, Ort, PLZ, Nr, Passwort, Adminstatus) 
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
			console.error("Error fetching products:", err);
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

app.get("/api/product/:id", (req, res) => {
	const { id } = req.params;

	const query = "SELECT * FROM products WHERE ProduktID = ?";

	pool.query(query, [id], (err, rows) => {
		if (err) {
			console.error("Error fetching products:", err);
			return res.status(500).json({ error: err.message });
		}
		res.json(rows[0]);
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

// Fetch all orders
app.get("/api/orders", authenticateJWT, (req, res) => {
	pool.query("SELECT * FROM orders", (err, rows) => {
		if (err) {
			console.error("Database error:", err);
			return res.status(500).json({ error: err.message });
		}
		res.json(rows); // Return the orders
	});
});

// Fetch order items for a specific order
app.get("/api/order-items/:orderId", authenticateJWT, (req, res) => {
	const { orderId } = req.params;

	console.log("Fetching order items for order ID:", orderId);
	// Query to fetch items related to the specified order
	pool.query("SELECT * FROM order_items WHERE order_id = ?", [orderId], (err, rows) => {
		if (err) {
			console.error("Database error:", err);
			return res.status(500).json({ error: err.message });
		}
		res.json(rows); // Return the order items
	});
});

app.post("/api/create-checkout-session", async (req, res) => {
	const { cartItems, userData } = req.body;

	console.log("Received cartItems:", cartItems);
	console.log("Received userData:", userData);

	try {
		// Serialize cart items to query string
		const cartQueryString = encodeURIComponent(JSON.stringify(cartItems));

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: cartItems.map((item) => ({
				price: item.price,
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}&cart=${cartQueryString}`,
			cancel_url: `${process.env.CLIENT_URL}/cancel`,
			shipping_address_collection: {
				allowed_countries: ["DE"], // Add the countries you want to allow
			},
		});

		console.log("Stripe session created:", session);

		res.json({ id: session.id });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		res.status(500).json({ error: "Failed to create checkout session", details: error.message });
	}
});

app.post("/api/confirm-order", async (req, res) => {
	const { session_id, cart } = req.body;

	try {
		// Fetch the session details from Stripe
		const session = await stripe.checkout.sessions.retrieve(session_id);

		console.log("Session details:", session);

		const address =
			session.shipping_details && session.shipping_details.address
				? `${session.shipping_details.address.line1}, ${
						session.shipping_details.address.line2 || ""
				  }, ${session.shipping_details.address.city}, ${
						session.shipping_details.address.postal_code
				  }, ${session.shipping_details.address.country}`
				: "No address provided";
		// Prepare customer details and shipping address
		const totalAmount = session.amount_total / 100; // Convert amount from cents to currency units

		// Save the order into the 'orders' table
		const orderQuery = `
          INSERT INTO orders (customer_name, email, address, total_amount, session_id)
          VALUES (?, ?, ?, ?, ?)
      `;
		const orderValues = [
			session.customer_details.name,
			session.customer_details.email,
			address,
			totalAmount,
			session.id, // Stripe session ID
		];

		// Execute query to save the order
		pool.query(orderQuery, orderValues, (err, result) => {
			if (err) {
				console.error("Error saving order to database:", err);
				return res.status(500).json({ error: "Failed to save order data" });
			}

			const orderId = result.insertId; // Get the newly inserted order ID
			console.log("Order saved to database with ID:", orderId);

			// Save cart items into 'order_items' table
			const orderItemsQuery = `
              INSERT INTO order_items (order_id, product_id, quantity)
              VALUES (?, ?, ?)
          `;
			// Loop through the cart items and insert each one
			cart.forEach((item) => {
				const orderItemValues = [orderId, item.produktid, item.quantity];

				pool.query(orderItemsQuery, orderItemValues, (err, result) => {
					if (err) {
						console.error("Error saving order items to database:", err);
						return res.status(500).json({ error: "Failed to save order items data" });
					}
				});
			});
		});
	} catch (error) {
		console.error("Error confirming order:", error);
		res.status(500).json({ error: "Failed to confirm order", details: error.message });
	}
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
