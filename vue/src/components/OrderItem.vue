<template>
    <div class="order-item-detail">
      <h3>Order #{{ order.id }}</h3>
      <p><strong>Customer Name:</strong> {{ order.customer_name }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Address:</strong> {{ order.address }}</p>
      <p><strong>Total Amount:</strong> €{{ order.total_amount }}</p>
      <p><strong>Order Status:</strong> {{ order.OrderStatus }}</p>
      <p><strong>Created At:</strong> {{ order.created_at }}</p>
  
      <h4>Order Items:</h4>
      <div v-for="(item, index) in orderItems" :key="item.order_item_id" class="order-item">
        <p><strong>Product ID:</strong> {{ item.product_id }}</p>
        <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        <!-- Here you can include additional product details if needed -->
        <hr />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      order: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        orderItems: [], // To store the items of this order
      };
    },
    async created() {
      // Fetch the order items based on the order ID (Assume the order ID is used to fetch items)
      this.orderItems = await this.fetchOrderItems(this.order.id);
    },
    methods: {
      async fetchOrderItems(orderId) {
        // Fetch order items from the API or store
        // Replace this with the actual API call to get order items
        return [
          {
            order_item_id: 1,
            product_id: 101,
            quantity: 2,
          },
          {
            order_item_id: 2,
            product_id: 102,
            quantity: 1,
          },
        ];
      },
    },
  };
  </script>
  
  <style scoped>
  .order-item-detail {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .order-item-detail h3 {
    font-size: 1.8rem;
    margin: 0;
  }
  
  .order-item-detail p {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  
  hr {
    margin: 10px 0;
  }
  </style>
  