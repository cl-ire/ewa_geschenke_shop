<template>
  <div>
    <button @click="getProducts">Get Products</button>
    <button @click="addUser">Add User</button>
    <button @click="updateProduct">Update Product</button>
  </div>
</template>

<script>
import { getProducts, updateProductLagerbestand, addUser } from "@/utils/apiFunctions";

export default {
  name: "About",
  methods: {
    async getProducts() {
      try {
        const products = await getProducts();
        console.log("Products:", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async addUser() {
      const newUser = {
        username: "new_user",
        Vorname: "First",
        Nachname: "Last",
        Email: "example@example.com",
        Straße: "Main St",
        Ort: "City",
        PLZ: "12345",
        Nr: "1",
        Passwort: "securepassword",
        Adminstatus: false,
      };
      try {
        const result = await addUser(newUser);
        console.log("User added:", result);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    async updateProduct() {
      const productId = 1; // Example ID
      const newLagerbestand = 100; // Example value
      try {
        const result = await updateProductLagerbestand(productId, newLagerbestand);
        console.log("Product updated:", result);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
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
