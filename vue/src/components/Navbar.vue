<template>
	<nav class="navbar">
		<ul>
			<div class="search-bar">
				<div>
					<input type="text" v-model="searchQuery" placeholder="Search for products..." />
					<button @click="searchProducts">Search</button>
				</div>
			</div>

			<li><router-link to="/product-list">Product List</router-link></li>
			<li><router-link to="/cart">Cart</router-link></li>
			<li><router-link to="/login">Login</router-link></li>
            <li v-if="userData"><router-link to="/admin">Admin</router-link></li>
			<li v-if="userData"><router-link to="/order">Order</router-link></li>
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
                this.$router.push('/product-list');
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
.navbar ul {
	list-style: none;
	display: flex;
	margin: 0;
	padding: 0;
	width: 100%;
}
.navbar li {
	margin-right: 1rem;
	margin-top: 20px;
}
.navbar a {
	color: white;
	text-decoration: none;
	padding: 25px 15px;
}
.navbar a:hover {
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
}
.search-bar div {
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
