// utils/apiFunctions.js

const BASE_URL = "/api";

// Fetch all products from the database
export async function getProducts() {
	try {
		const response = await fetch(`${BASE_URL}/products`);
		if (!response.ok) {
			throw new Error(`Error fetching products: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error in getProducts:", error);
		throw error;
	}
}

// Update the Lagerbestand for a product by its ID
export async function updateProductLagerbestand(productId, newLagerbestand) {
	try {
		const response = await fetch(`${BASE_URL}/products/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ Lagerbestand: newLagerbestand }),
		});

		if (!response.ok) {
			throw new Error(`Error updating Lagerbestand: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error in updateProductLagerbestand:", error);
		throw error;
	}
}

// Add a new user to the database
export async function addUser(userDetails) {
	try {
		const response = await fetch(`${BASE_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userDetails),
		});

		if (!response.ok) {
			throw new Error(`Error adding user: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error in addUser:", error);
		throw error;
	}
}

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export async function handleCheckout(cartItems, userData) {
	
  const stripePublishableKey = import.meta.env.VUE_APP_STRIPE_PUBLISHABLE_KEY;
	console.log("Key: ", stripePublishableKey);

	const stripe = await loadStripe(stripePublishableKey); // Access Stripe key from .env

	try {
		// Send cart data to the backend to create checkout session
		const response = await axios.post("/api/create-checkout-session", {
			cartItems,
      userData,
		});

		const sessionId = response.data.id;

		// Redirect the user to Stripe Checkout page
		const { error } = await stripe.redirectToCheckout({
			sessionId,
		});

		if (error) {
			console.error("Stripe Checkout error:", error);
			alert("Error with the payment. Please try again.");
      const ret = 1;
		} else {
			const ret = 0;
		}
	} catch (error) {
		console.error("Error creating checkout session:", error);
		alert("There was an issue with checkout. Please try again.");
    const ret = 1;
	}
  return ret;
}
