import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import Register from "@/components/Register.vue";
import DashboardView from "@/components/Dashboard.vue";
import WidgetView from "@/components/Widget.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/widget",
    name: "widget",
    component: WidgetView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard global to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" }); // Redirect to login if not authenticated
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "widget" }); // Redirect to widget if already authenticated
  } else {
    next(); // Proceed to route
  }
});

export default router;
