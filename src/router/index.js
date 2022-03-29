import { createRouter, createWebHistory } from "vue-router";
//引入根组件位置
import Todolist from "../views/Todolist.vue";
//定义路由组件
const routes = [
  {
    path: "/",
    name: "Todolist",
    component: Todolist,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //按需引入about组件，不访问既不加载
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

//创建路由对象
const router = createRouter({//history模式
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(process.env.VUE_APP_ROUTER),
  // history: createWebHistory('./'),
  routes,
});

export default router;
