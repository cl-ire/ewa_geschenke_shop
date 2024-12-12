<template>
    <div class="admin-item">
      <!-- Product Details -->
      <div class="admin-item-info">
        <h2 class="admin-item-title">{{ product.Produkttitel }}</h2>
        <p class="admin-item-stock">
          <strong>Current Stock: </strong> {{ product.Lagerbestand }}
        </p>
        <div class="admin-item-update">
          <label for="new-stock">New Stock:</label>
          <input
            id="new-stock"
            type="number"
            v-model="newLagerbestand"
            min="0"
          />
          <button @click="submitUpdate">Update Stock</button>
        </div>
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
    data() {
      return {
        newLagerbestand: this.product.Lagerbestand, // Default to current stock
      };
    },
    methods: {
      submitUpdate() {
        if (this.newLagerbestand < 0) {
          alert("Stock cannot be negative.");
          return;
        }
        this.$emit("updateLagerbestand", this.product.ProduktID, this.newLagerbestand);
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-item {
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
  
  .admin-item-info {
    flex-grow: 1;
  }
  
  .admin-item-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  
  .admin-item-stock {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .admin-item-update {
    margin-top: 10px;
  }
  
  input {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
  </style>
  