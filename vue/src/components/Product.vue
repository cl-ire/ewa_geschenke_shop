<template>
	<div v-if="product" class="product-card">
		<!-- Product Image (Placeholder if no image is available) -->
		<div class="product-image">
			<img :src="product.LinkGrafikdatei || 'https://via.placeholder.com/150'" alt="Product Image" />
		</div>

		<!-- Product Details -->
		<div class="product-info">
			<h2 class="product-title">{{ product.Produkttitel }}</h2>
			<p class="author-publisher">
				<strong>Author:</strong> {{ product.Autorname }} <br />
				<strong>Publisher:</strong> {{ product.Verlagsname }}
			</p>

			<!-- Price Without Taxes with Label -->
			<p class="price">
				<strong></strong> € {{ (product.PreisNetto * (1 + product.Mwstsatz/100)).toFixed(2) }}
				<span class="tax-label">(Including Tax)</span>
			</p>

			<p class="stock"><strong>Stock:</strong> {{ product.Lagerbestand }} available</p>
			<p class="description"><strong>Description:</strong> {{ product.Kurzinhalt }}</p>
			<p class="product-code"><strong>Product Code:</strong> {{ product.Produktcode }}</p>

			<!-- Optional: Add to Cart Button -->
			<button @click="addToCart(product)" class="add-to-cart">Add to Cart</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	methods: {
		addToCart(product) {
			this.$store.dispatch("addToCart", product);
		},
	},
};
</script>

<style scoped>
/* General Product Card Styling */
.product-card {
	display: flex;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
	margin: 20px;
	background-color: #fff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	max-width: 800px;
	transition: transform 0.3s ease;
}

.product-card:hover {
	transform: translateY(-5px);
}

/* Product Image Styling */
.product-image img {
	width: 150px;
	height: 150px;
	object-fit: cover;
	border-radius: 8px;
	margin-right: 20px;
}

/* Product Info Section */
.product-info {
	flex-grow: 1;
}

/* Title Styling */
.product-title {
	font-size: 1.8rem;
	font-weight: bold;
	margin: 0;
	color: #333;
	margin-bottom: 10px;
}

/* Author and Publisher Styling */
.author-publisher {
	font-size: 1rem;
	color: #777;
	margin-bottom: 10px;
}

/* Price Styling */
.price {
	font-size: 1.4rem;
	font-weight: bold;
	color: #000000;
	margin-bottom: 10px;
}

.tax-label {
	font-size: 0.9rem;
	color: #777;
	margin-left: 10px;
}

/* Stock and Description Styling */
.stock,
.description,
.product-code {
	font-size: 1rem;
	color: #555;
	margin-bottom: 10px;
}

/* Add to Cart Button Styling */
.add-to-cart {
	padding: 10px 20px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
	margin-top: 20px;
}

.add-to-cart:hover {
	background-color: #45a049;
}
</style>
