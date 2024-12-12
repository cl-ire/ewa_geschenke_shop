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

export default {
	components: {
		Product,
	},
	data() {
		return {
			filterText: "",
			// Sample JSON data
			products: [
				{
					ProduktID: "1",
					Produktcode: "PHP1",
					Produkttitel: "Einführung in PHP 8.0 - Teil 1",
					Autorname: "Max Mustermann",
					Verlagsname: "Spring verlag ",
					PreisNetto: "100.0000",
					Mwstsatz: "7.0000",
					PreisBrutto: "107.0000",
					Lagerbestand: "100",
					Kurzinhalt: "super Einführung in PHP 8.0 .. ",
					Gewicht: "1500",
					LinkGrafikdatei: "",
				},
				{
					ProduktID: "3",
					Produktcode: "PHP2",
					Produkttitel: "Einführung in PHP 8.0 - Teil 2",
					Autorname: "Max Mustermann",
					Verlagsname: "Spring verlag ",
					PreisNetto: "200.0000",
					Mwstsatz: "7.0000",
					PreisBrutto: "214.0000",
					Lagerbestand: "50",
					Kurzinhalt: "super Einführung in PHP 8.0 .. ",
					Gewicht: "1500",
					LinkGrafikdatei: "",
				},
				{
					ProduktID: "3",
					Produktcode: "PHP2",
					Produkttitel: "Einf\u00fchrung in PHP 8.0 - Teil 2",
					Autorname: "Max Mustermann",
					Verlagsname: "Spring verlag ",
					PreisNetto: "200.0000",
					Mwstsatz: "7.0000",
					PreisBrutto: "214.0000",
					Lagerbestand: "50",
					Kurzinhalt: "super Einf\u00fchrung in PHP 8.0 .. ",
					Gewicht: "1500",
					LinkGrafikdatei: "",
				},
				{
					ProduktID: "4",
					Produktcode: "PHP3",
					Produkttitel: "Einf\u00fchrung in PHP 8.0 - Teil 3",
					Autorname: "Max Mustermann",
					Verlagsname: "Spring verlag ",
					PreisNetto: "200.0000",
					Mwstsatz: "7.0000",
					PreisBrutto: "214.0000",
					Lagerbestand: "50",
					Kurzinhalt: "super Einf\u00fchrung in PHP 8.0 .. ",
					Gewicht: "1500",
					LinkGrafikdatei: "",
				},
				{
					ProduktID: "5",
					Produktcode: "JAVA1",
					Produkttitel: "Einf\u00fchrung in JAVA ",
					Autorname: "Max Mustermann",
					Verlagsname: "DPUNKT Verlag ",
					PreisNetto: "200.0000",
					Mwstsatz: "7.0000",
					PreisBrutto: "214.0000",
					Lagerbestand: "50",
					Kurzinhalt: "super Einf\u00fchrung in JAVA .. ",
					Gewicht: "1500",
					LinkGrafikdatei: "",
				},
			],
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
		// Method to update display products based on search query
		...mapActions(["updateSearchQuery"]),
		updateDisplayProducts(query) {
			this.displayProducts = this.products.filter((product) =>
				product.Produkttitel.toLowerCase().includes(query.toLowerCase())
			);
		},
	},
	mounted() {
		// Initialize displayProducts with all products on mount
		this.displayProducts = this.products;
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
