import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/Users.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
})

export default router
