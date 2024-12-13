import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import ProductList from "../components/ProductList.vue";
import Cart from "../components/Cart.vue";
import Admin from "../components/Admin.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Success from "@/components/Success.vue";
import Order from "@/components/Order.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/product-list", component: ProductList },
  { path: "/cart", component: Cart },
  { path: "/admin", component: Admin },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/success", component: Success },
  { path: "/order", component: Order }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
