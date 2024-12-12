import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import ProductList from "../components/ProductList.vue";
import Cart from "../components/Cart.vue";
import Admin from "../components/Admin.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/product-list", component: ProductList },
  { path: "/cart", component: Cart },
  { path: "/admin", component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
