<template>
  <div>
    <!-- Show the list of orders -->
    <div v-if="orders.length === 0">
      <p>No orders found.</p>
    </div>

    <div v-for="order in orders" :key="order.id" class="order">
      <h3>Order ID: {{ order.id }}</h3>
      <p><strong>Customer:</strong> {{ order.customer_name }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Address:</strong> {{ order.address }}</p>
      <p><strong>Total Amount:</strong> €{{ order.total_amount }}</p>
      <p><strong>Status:</strong> {{ order.OrderStatus }}</p>

      <!-- Button to view order items -->
      <button @click="fetchOrderItems(order.id)">View Items</button>

      <div v-if="order.id === activeOrderId" class="order-items-container">
        <h4>Order Items</h4>
        <div v-if="orderItems.length === 0">
          <p>No items found for this order.</p>
        </div>
        <div v-for="item in orderItems" :key="item.order_item_id" class="order-item">
          <p v-if="item.product"><strong>Product Name:</strong> {{ item.product.Produkttitel }}</p>
          <p v-if="item.product"><strong>Product Price:</strong> €{{ item.product.PreisNetto }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      orderItems: [],
      activeOrderId: null, // To track which order is being expanded
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    // Fetch orders from the server
    async fetchOrders() {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },

    // Fetch items for a specific order
    async fetchOrderItems(orderId) {
      if (this.activeOrderId === orderId) {
        this.activeOrderId = null; // Toggle visibility
        return;
      }

      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`/api/order-items/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        this.orderItems = response.data;
        this.activeOrderId = orderId;  // Set the active order ID to show items

        // Fetch product details for each order item
        for (const item of this.orderItems) {
          const productResponse = await axios.get(`/api/product/${item.product_id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          });
          item.product = productResponse.data;
        }
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    },
  },
};
</script>

<style scoped>
.order {
  padding: 16px;
  margin-bottom: 20px;
  background-color: #fff;
}

.order-item {
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.order-items-container {
  margin-top: 20px;
  border: 1px solid #ddd; /* Box around order items */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px; /* Rounded corners for the box */
}

.order-item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
}

hr {
  border-top: 1px solid #ddd;
  margin-top: 20px;
}
</style>
