<!-- CartComponent.vue -->
<template>
	<div class="cart">
		<h2>Your Cart</h2>

		<div v-if="cart.length === 0">
			<p>Your cart is empty.</p>
		</div>

		<!-- Loop through the cart items and display each one using CartItem -->
		<div v-for="(item, index) in cart" :key="index">
			<CartItem :item="item" :index="index" />
			<hr />
		</div>

		<div v-if="cart.length > 0">
			<h3>Total: {{ totalPrice }} EUR</h3>
			<button @click="checkout">Proceed to Checkout</button>
		</div>
		<br />
		<br />
	</div>
</template>

<script>
// Import the CartItem component
import CartItem from "./CartItem.vue";
import { updateProductLagerbestand, handleCheckout } from "@/utils/apiFunctions";

export default {
	components: {
		CartItem,
	},
	computed: {
		// Get the cart from Vuex store
		cart() {
			return this.$store.state.cart;
		},
		userData() {
			return this.$store.state.userData;
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
			console.log("Proceeding to checkout...");

			const cartItems = this.cart.map((item) => ({
				name: item.Produkttitel,
				produktid: item.ProduktID, // Pass the item ID
				price: item.PreisID, // Pass the item price
				quantity: item.OrderAmount, // Pass quantity
			}));

			console.log("Cart Items:", cartItems);
			// Check if the user is logged in
			let userData = "";
			if (this.userData === null) {
				console.log("User is not logged in");
			} else {				
				userData = this.userData;
				console.log("User Data:", userData);
			}

			const ret = await handleCheckout(cartItems, userData);

			if ((ret === 0)) {
				// Clear the cart only if the checkout was successful
				await this.updateLagerbestand();
				this.$store.dispatch("clearCart");
			}
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

.cart {
	margin-left: 10px;
}

</style>
