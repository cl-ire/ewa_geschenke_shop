<template>
    <div>
      <h2>Admin Panel</h2>
  
      <div v-if="products.length === 0">
        <p>No products available.</p>
      </div>
  
      <!-- Loop through the products and display each one using AdminItem -->
      <div v-for="(product, index) in products" :key="index">
        <AdminItem :product="product" @updateLagerbestand="updateLagerbestand" />
        <hr />
      </div>
    </div>
  </template>
  
  <script>
  // Import the AdminItem component
  import AdminItem from "./AdminItem.vue";
  import { updateProductLagerbestand, getProducts } from "@/utils/apiFunctions";

  
  export default {
    components: {
      AdminItem,
    },
    data() {
      return {
        loading: true,
        products: [],
      };
    },
    methods: {
        async fetchProducts() {
			try {
				const products = await getProducts();
				this.products = products;
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				this.loading = false;
			}
		},
      async updateLagerbestand(productId, newLagerbestand) {
        try {
          await updateProductLagerbestand(productId, newLagerbestand);
          alert(`Lagerbestand updated for Product ID: ${productId}`);
            this.fetchProducts();
        } catch (error) {
          console.error(`Error updating Lagerbestand for Product ID: ${productId}:`, error);
        }
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 2rem;
    color: #333;
  }
  
  hr {
    margin: 20px 0;
  }
  </style>
  