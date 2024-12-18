import { createStore } from "vuex";

const store = createStore({
  state: {
    // Cart-related state
    cart: [], // Cart will hold the list of items
    // Search query state
    searchQuery: '', // To hold the search query

    userData: null,
  },
  mutations: {
    // Cart mutations
    setCart(state, payload) {
      state.cart = payload;
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.ProduktID === product.ProduktID);
      if (existingProduct) {
        console.log("OrderAmount Increased for: ", existingProduct.Produkttitel);
        existingProduct.OrderAmount += 1; // Increment quantity if already in cart
      } else {
        console.log("New Product Added to Cart: ", product.Produkttitel);
        const newProduct = {
          ...product,
          OrderAmount: 1, // Default amount is 1
        };
        state.cart.push(newProduct);
      }
    },
    removeFromCart(state, index) {
      console.log("Product Removed from Cart: ", state.cart[index].Produkttitel);
      state.cart.splice(index, 1); // Remove product from cart based on index
    },
    updateOrderAmount(state, { index, amount }) {
      console.log("OrderAmount Updated for: ", state.cart[index].Produkttitel);
      const product = state.cart[index];
      if (product) {
        product.OrderAmount = amount; // Update the OrderAmount for the product
      }
    },
    CLEAR_CART(state) {
        state.cart = [];
      },
    // Search-related mutation
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },    
    setUserData(state, payload) {
      state.userData = payload;
    },
  },
  actions: {
    // Cart actions
    updateCart({ commit }, payload) {
      commit("setCart", payload);
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    clearCart({ commit }) {
        commit("CLEAR_CART");
      },
    deleteFromCart({ commit }, index) {
      commit("removeFromCart", index);
    },
    updateOrderAmount({ commit }, { index, amount }) {
      commit("updateOrderAmount", { index, amount });
    },
    // Search actions
    updateSearchQuery({ commit }, query) {
      commit("setSearchQuery", query);
    },
    // User actions
    updateUserData({ commit }, payload) {
      commit("setUserData", payload);
    },
  },
  getters: {
    // Cart getters
    cart: (state) => state.cart,
    // Search query getter
    searchQuery: (state) => state.searchQuery,

    userData: (state) => state.userData,

  },
});

export default store;
