import { createWebHistory, createRouter } from "vue-router";
import Home from '@/pages/Home.vue'
import Err from '@/pages/Err.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/err",
    name: "Err",
    component: Err
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;