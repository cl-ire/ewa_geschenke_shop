<template>
    <div class="admin-panel">
      <!-- If not logged in, display the login link -->
      <div v-if="!isLoggedIn">
        <p>You must be logged in to access the Admin Panel. <a href="/login">Login here</a></p>
      </div>
  
      <!-- If logged in, display the Admin Panel -->
      <div v-else>
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
        isLoggedIn: false, // Flag to check if the user is logged in
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
      checkLoginStatus() {
        // Check if the user is logged in by looking for a token in localStorage
        const token = localStorage.getItem('authToken');
        this.isLoggedIn = token !== null; // If token exists, user is logged in
      },
    },
    mounted() {
      this.checkLoginStatus(); // Check login status when the component is mounted
      if (this.isLoggedIn) {
        this.fetchProducts(); // Only fetch products if logged in
      }
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
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }

  .admin-panel {
    margin-left: 10px;
  }
  </style>
  