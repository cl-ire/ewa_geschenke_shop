<template>
    <div class="cart-item">
      <!-- Cart Item Details -->
      <div class="cart-item-info">
        <h2 class="cart-item-title">{{ item.Produkttitel }}</h2>
        <p class="cart-item-price">
          <strong>Price:</strong> € {{ item.PreisNetto }}
          <span class="tax-label">(Excluding Tax)</span>
        </p>
        <p class="cart-item-quantity">
          <strong>Quantity: </strong>
          <select v-model="selectedQuantity" @change="updateQuantity">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </p>
        <button @click="removeFromCart" class="remove-from-cart">Remove</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedQuantity: this.item.OrderAmount,
      };
    },
    methods: {
      // Method to remove the item from the cart
      removeFromCart() {
        this.$store.commit('removeFromCart', this.item.index); // Passing item index or a unique identifier
      },
      // Method to update the quantity of the item in the cart
      updateQuantity() {
        this.$store.commit('updateOrderAmount', { index: this.item.index, amount: this.selectedQuantity });
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
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
  
  .cart-item-info {
    flex-grow: 1;
  }
  
  .cart-item-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  
  .cart-item-price {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .tax-label {
    font-size: 0.9rem;
    color: #777;
    margin-left: 10px;
  }
  
  .cart-item-quantity {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .remove-from-cart {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-from-cart:hover {
    background-color: #e53935;
  }
  </style>