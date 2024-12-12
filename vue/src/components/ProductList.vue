<!-- MapComponent.vue -->
<template>
	<div>
		<!-- Add a search bar to the ProductList component -->

		<div v-if="displayProducts.length === 0">
			<p>No matching products found</p>
		</div>

		<!-- Loop through the JSON array and display a Product for each product -->
		<div v-for="product in displayProducts" :key="product.ProduktID">
			<Product :product="product" />
			<hr />
			<!-- Separator line between products -->
		</div>
	</div>
</template>

<script>
// Import the second component
import Product from "./Product.vue";
import { mapGetters, mapActions } from "vuex";
import { getProducts } from "@/utils/apiFunctions";

export default {
	components: {
		Product,
	},
	data() {
		return {
			filterText: "",
			loading: true,
			products: [],
			displayProducts: [],
		};
	},
	computed: {
		...mapGetters(["searchQuery"]),
	},
	watch: {
		// Watch for changes in the search query and update the display products
		searchQuery(newQuery) {
			console.log("newQuery: ", newQuery);
			this.updateDisplayProducts(newQuery);
		},
	},
	methods: {
		async fetchProducts() {
			try {
				const products = await getProducts();
				this.products = products;
				this.displayProducts = this.products;
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				this.loading = false;
			}
		},
		// Method to update display products based on search query
		...mapActions(["updateSearchQuery"]),
		updateDisplayProducts(query) {
			this.displayProducts = this.products.filter((product) =>
				product.Produkttitel.toLowerCase().includes(query.toLowerCase())
			);
		},
	},
	mounted() {
		this.fetchProducts();
        // Initialize displayProducts with all products on mount
		
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.updateSearchQuery("");
		});
	},
	beforeRouteUpdate(to, from, next) {
		this.updateSearchQuery("");
		next();
	},
};
</script>

<style scoped>
/* Add some basic styling */
ul {
	list-style-type: none;
	padding: 0;
}
li {
	margin: 10px 0;
}
button {
	background-color: #4caf50;
	color: white;
	border: none;
	padding: 10px;
	cursor: pointer;
}
button:hover {
	background-color: #45a049;
}
.search-bar input {
	width: 710px;
	padding: 10px;

	margin: 10px 10px 10px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	font-size: 16px;
}
.search-bar div {
	background-color: #585858;

	width: 100vw;

	margin: 0;
	height: 70px;
}

.search-bar button {
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 10px;
	cursor: pointer;
	width: 80px;
}
</style>
