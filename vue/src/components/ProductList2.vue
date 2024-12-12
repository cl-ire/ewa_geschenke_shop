<template>
    <div id="app">
      <h1>Vue Example 2</h1>
      <h3><b>{{ message }}</b></h3>
      <p>Datum: {{ timestamp }}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(product, index) in products" :key="product.id">
          Produkt: "{{ product.name }}", Anzahl im Lager:
          <span class="badge badge-primary badge-pill">{{ product.quantity }}</span>
  
          <button class="btn btn-outline-success ml-3" @click="increase(index)">+</button>
          <button class="btn btn-outline-danger" @click="decrease(index)">-</button>
          <button class="btn btn-outline-warning" @click="reset(index)">Reset</button>
          <span style="color:red" v-if="product.quantity == 0"> Neue Bücher sind unterwegs!</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductList",
    data() {
      return {
        message: "Vue Product book list",
        timestamp: " - Time -",
        products: [
          { id: "1", quantity: "1", name: "PHP-Buch" },
          { id: "2", quantity: "3", name: "PHP-Kochbuch" },
          { id: "3", quantity: "5", name: "Java-Kochbuch" },
          { id: "4", quantity: "6", name: "Java-Kochbuch Teil 2" },
          { id: "5", quantity: "7", name: "Java-Kochbuch Teil 3" }
        ]
      };
    },
    methods: {
      fetchData() {
        fetch("https://api.myjson.com/bins/74l63")
          .then(response => response.json())
          .then(data => {
            this.products = data.products;
          });
      },
      increase(index) {
        this.products[index].quantity++;
      },
      decrease(index) {
        if (this.products[index].quantity > 0) this.products[index].quantity--;
      },
      reset(index) {
        if (this.products[index].quantity > 0) this.products[index].quantity = 0;
      },
      now() {
        const today = new Date();
        const date =
          today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = "" + date + " Uhrzeit: " + time;
        this.timestamp = dateTime;
      }
    },
    created() {
      setInterval(this.now, 1000);
    },
    mounted() {
      // Uncomment to fetch data from the API
      // this.fetchData();
    }
  };
  </script>
  
  <style scoped>
  #app {
    display: inline-block;
    padding: 10px;
    font-size: x-large;
    background-color: lightgreen;
  }
  </style>
  