<template>
    <div class="success-page">
      <h1>Thank you for your purchase!</h1>
      <p>Your order is being processed. You will be redirected shortly...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "SuccessPage",
    data() {
      return {
        loading: true,
        error: null,
      };
    },
    methods: {
      async confirmOrder() {
        try {
          // Read query parameters
          const params = new URLSearchParams(window.location.search);
          const session_id = params.get("session_id");
          const cart = JSON.parse(decodeURIComponent(params.get("cart")));

            
          console.log("Session ID:", session_id);
          console.log("Cart:", cart);
          if (!session_id || !cart) {
            throw new Error("Missing required query parameters.");
          }
  
          // Send POST request to confirm order
          const response = await fetch("/api/confirm-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id, cart }),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to confirm the order.");
          }
  
          const data = await response.json();
          console.log("Order confirmation response:", data);
  
          // Redirect to product list
          this.$router.push("/product-list");
        } catch (error) {
          console.error("Error confirming order:", error);
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      this.confirmOrder();
    },
  };
  </script>
  
  <style scoped>
  .success-page {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 2rem;
    color: #2ecc71;
  }
  
  p {
    font-size: 1.2rem;
    color: #555;
  }
  </style>
  