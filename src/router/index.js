import { createRouter, createWebHistory } from 'vue-router'
import users from '../components/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'users',
      component: users,
    },
  ],
})

export default router
