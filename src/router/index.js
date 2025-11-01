import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/Users.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'Register', component: Users },
  { path: '/home', name: 'home', component: Home },

  {
    path: '/home-cliente',
    component: () => import('../views/HomeCliente.vue'),
    meta: { role: 'cliente' }
  },
  {
    path: '/home-vendedor',
    component: () => import('../views/HomeVendedor.vue'),
    meta: { role: 'vendedor' }
  },
  {
    path: '/home-repartidor',
    component: () => import('../views/HomeRepartidor.vue'),
    meta: { role: 'repartidor' }
  },
  {
    path: '/buscar-restaurantes',
    component: () => import('../views/cliente/SearchRestaurants.vue'),
    meta: { role: 'cliente' }
  },
  {
    path: '/carrito',
    component: () => import('../views/cliente/Cart.vue'),
    meta: { role: 'cliente' }
  },
  {
    path: '/pedidos',
    component: () => import('../views/cliente/Orders.vue'),
    meta: { role: 'cliente' }
  },
  {
    path: '/favoritos',
    component: () => import('../views/cliente/Favorites.vue'),
    meta: { role: 'cliente' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si la ruta requiere rol
  if (to.meta.role) {
    if (!authStore.isLoggedIn) return next('/login')

    if (authStore.userRole !== to.meta.role) {
      alert('No tienes permisos para acceder a esta sección.')
      return next('/home') // Vuelve a Home para elegir rol
    }
  }

  next()
})

export default router




