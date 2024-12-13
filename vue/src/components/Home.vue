<template>
  <div class="home-container">
    <br />
    <br />
    <h1>Welcome to the Store of Group g08</h1>
    <a href="https://github.com/cl-ire/ewa_geschenke_shop" target="_blank">Visit our Store on Github</a>
    <br />
    <br />
    <button @click="goToProductList">Go to Store</button>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToProductList() {
      this.$router.push('/product-list');
    }
  }
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color:  #4CAF50;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

a {
  color: #555;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

button {
  background-color:  #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>