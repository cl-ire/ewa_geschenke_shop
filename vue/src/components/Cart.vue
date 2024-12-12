<!-- CartComponent.vue -->
<template>
	<div>
		<h2>Your Cart</h2>

		<div v-if="cart.length === 0">
			<p>Your cart is empty.</p>
		</div>

		<!-- Loop through the cart items and display each one using CartItem -->
		<div v-for="(item, index) in cart" :key="index">
			<CartItem :item="item" />
			<hr />
		</div>

		<div v-if="cart.length > 0">
			<h3>Total: {{ totalPrice }} EUR</h3>
			<button @click="checkout">Proceed to Checkout</button>
		</div>
	</div>
</template>

<script>
// Import the CartItem component
import CartItem from "./CartItem.vue";
import { updateProductLagerbestand } from "@/utils/apiFunctions";
import { loadStripe } from "@stripe/stripe-js";

export default {
	components: {
		CartItem,
	},
	computed: {
		// Get the cart from Vuex store
		cart() {
			return this.$store.state.cart;
		},
		// Calculate the total price of the cart
		totalPrice() {
			return this.cart
				.reduce((total, item) => {
					return total + parseFloat(item.PreisNetto) * item.OrderAmount;
				}, 0)
				.toFixed(2); // Format to 2 decimal places
		},
	},
	methods: {
		async updateLagerbestand() {
			for (const item of this.cart) {
				try {
					const newLagerbestand = item.Lagerbestand - item.OrderAmount;
					const result = await updateProductLagerbestand(item.ProduktID, newLagerbestand);
					console.log(`Lagerbestand updated for ${item.Produkttitel}:`, result);
				} catch (error) {
					console.error(`Error updating Lagerbestand for ${item.Produkttitel}:`, error);
				}
			}
		},
		async checkout() {
			// Load Stripe with the publishable key from .env
			const stripe = await loadStripe("pk_test_51QVIOXLEVuUKXSXtH11vptwpcE7AlesWL65RkqkMxdI7RaAYUEuA1uvpdovFHzlLNaRiKqDuoBZirWhXxe9xwGWx00q1WTYAr8"); // Access Stripe key from .env

			// Send cart data to the backend to create checkout session
			try {
				const response = await this.$http.post("/api/create-checkout-session", {
					cartItems: this.cart.map((item) => ({
						name: item.Produkttitel,
						price: parseFloat(item.PreisNetto), // Pass the item price
						quantity: item.OrderAmount, // Pass quantity
					})),
				});

				const sessionId = response.data.id;

				// Redirect the user to Stripe Checkout page
				const { error } = await stripe.redirectToCheckout({
					sessionId,
				});

				if (error) {
					console.error("Stripe Checkout error:", error);
					alert("Error with the payment. Please try again.");
				}
			} catch (error) {
				console.error("Error creating checkout session:", error);
				alert("There was an issue with checkout. Please try again.");
			}

			await this.updateLagerbestand();
			this.$store.dispatch("clearCart");
			alert("Proceeding to checkout!");
		},
	},
};
</script>

<style scoped>
/* General Cart Styling */
h2 {
	font-size: 2rem;
	color: #333;
}

hr {
	margin: 20px 0;
}

button {
	padding: 10px 20px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #45a049;
}
</style>
