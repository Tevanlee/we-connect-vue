import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CreateUserView from "../views/CreateUserView.vue";

const routes = [
  {
    path: "/dashboard",
    name: "home",
    component: DashboardView,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/dashboard/create",
    name: "Create",
    component: CreateUserView,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
