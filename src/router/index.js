import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("../views/Login.vue");
const Home = () => import("../views/Home.vue");
const Actions = () => import("../views/Actions.vue");
const routes = [
  {
    path: "/actions",
    name: "Actions",
    component: Actions,
  },
  {
    path: "/add-actions",
    name: "Home",
    component: Home,
  },
  {
    path: "/action/:id",
    name: "Action",
    component: Home,
    props: true,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Login,
  },
  {
    path: "/my-actions",
    name: "MyActions",
    component: Actions,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Actions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transitionName = toDepth < fromDepth ? "prev" : "next";
});

export default router;
