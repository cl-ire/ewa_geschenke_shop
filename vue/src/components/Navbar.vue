<template>
	<nav class="navbar">
		<ul>
			<div class="search-bar">
				<div>
					<input type="text" v-model="searchQuery" placeholder="Search for products..." />
					<button @click="searchProducts">Search</button>
				</div>
			</div>

			<div class="link-section">
				<ul>
					<li><router-link to="/product-list">Products</router-link></li>
					<li><router-link to="/cart">Cart</router-link></li>
					<li><router-link to="/login">Login</router-link></li>
					<li v-if="userData"><router-link to="/admin">Stock</router-link></li>
					<li v-if="userData"><router-link to="/order">Order</router-link></li>
				</ul>
			</div>
		</ul>
	</nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "Navbar",
	data() {
		return {
			searchQuery: "",
		};
	},
	computed: {
		userData() {
			return this.$store.state.userData;
		},
	},
	methods: {
		...mapActions(["updateSearchQuery"]),
		searchProducts() {
			this.updateSearchQuery(this.searchQuery).then(() => {
				this.$router.push("/product-list");
			});
		},
	},
};
</script>

<style scoped>
.navbar {
	background-color: #333;
	padding: 0;
	width: 100vw;
	box-sizing: border-box;
	margin: 0;
	height: 70px;
}

@media (max-width: 1250px) {
	.navbar {
		background-color: #333;
		padding: 0;
		width: 100vw;
		box-sizing: border-box;
		margin: 0;
		height: 150px;
	}
}

.navbar ul {
	list-style: none;
	display: flex;
	margin: 0;
	padding: 0;
	width: 100%;
	flex-direction: row;
}

@media (max-width: 1250px) {
	.navbar ul {
		list-style: none;
		display: flex;
		margin: 10px 0 0 0;
		padding: 0;
		width: 100%;
		flex-direction: column;
	}
}

.link-section ul {
	display: flex;
	flex-direction: row;
	list-style: none;
	padding: 0;
	margin: 0;
	height: 70px;
}

.link-section li {
	margin-right: 1rem;
	margin-top: 20px;
}

.link-section a {
	text-decoration: none;
	color: white;
	padding: 25px 15px;
}

.link-section a:hover {
	text-decoration: underline;
}

.search-bar input {
	width: 710px;
	padding: 10px;
	margin: 10px 10px 10px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	font-size: 16px;
	flex: 1;
}

.search-bar div {
	margin: 0;
	height: 70px;
	width: 830px;
	display: flex;
}

@media (max-width: 830px) {
	.search-bar div {
		margin: 0;
		height: 70px;
		width: 100%;
		display: flex;
	}
}

.search-bar button {
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 10px;
	cursor: pointer;
	width: 80px;
	margin: 10px 20px 10px 0;
}
</style>
