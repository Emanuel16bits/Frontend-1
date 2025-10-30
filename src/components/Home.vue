<template>
  <div class="home">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="brand">
            <h1>rappi</h1>
          </div>

          <div class="search-container">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar restaurantes o comida..."
              class="input"
              @input="handleSearch"
            />
          </div>

          <div class="nav-actions">
            <button class="icon-button" title="Favoritos">
              <span>⭐</span>
            </button>
            <button class="icon-button" title="Historial">
              <span>📋</span>
            </button>
            <button class="icon-button relative" title="Carrito" @click="showCart = !showCart">
              <span>🛒</span>
              <span v-if="cart.length > 0" class="badge">
                {{ cart.length }}
              </span>
            </button>
            <button @click="handleLogout" class="icon-button" title="Cerrar sesión">
              <span>🚪</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="main-content">
      <div class="container">
        <!-- Sección de restaurantes -->
        <section class="section">
          <h2 class="section-title">Restaurantes disponibles</h2>

          <div v-if="loading" class="loading">Cargando restaurantes...</div>
          <div v-else-if="error" class="error-message">{{ error }}</div>

          <div v-else class="restaurant-grid">
            <div
              v-for="restaurant in filteredRestaurants"
              :key="restaurant.id"
              class="restaurant-card"
              @click="selectRestaurant(restaurant)"
            >
              <div class="restaurant-header">
                <h3>{{ restaurant.name }}</h3>
                <span class="favorite" @click.stop="toggleFavorite(restaurant.id)">
                  {{ isFavorite(restaurant.id) ? '❤️' : '🤍' }}
                </span>
              </div>
              <p class="category">{{ restaurant.category }}</p>
              <div class="restaurant-meta">
                <span>⭐ {{ restaurant.rating }} ({{ restaurant.reviews }}+)</span>
                <span>🕒 {{ restaurant.deliveryTime }} min</span>
                <span>🛵 ${{ restaurant.deliveryFee }}</span>
              </div>
              <div v-if="restaurant.discount" class="discount">{{ restaurant.discount }}% OFF</div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Carrito lateral -->
    <div v-if="showCart" class="cart-sidebar">
      <div class="cart-header">
        <h3>Tu Carrito</h3>
        <button @click="showCart = false" class="close-cart">×</button>
      </div>
      <div v-if="cart.length === 0" class="empty-cart">
        <p>Tu carrito está vacío</p>
      </div>
      <ul v-else class="cart-items">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-info">
            <h4>{{ item.name }}</h4>
            <p>${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-actions">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
            <button @click="removeFromCart(item.id)" class="remove-btn">🗑️</button>
          </div>
        </li>
      </ul>
      <div v-if="cart.length > 0" class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button @click="checkout" class="checkout-btn">Realizar pedido</button>
      </div>
    </div>

    <!-- Overlay para el carrito -->
    <div v-if="showCart" class="overlay" @click="showCart = false"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRestaurantsStore } from '@/stores/restaurants'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const restaurantsStore = useRestaurantsStore()
const authStore = useAuthStore()

// Estados
const searchQuery = ref('')
const showCart = ref(false)
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

// Obtener datos del store
const { restaurants, loading, error, isFavorite, featuredRestaurants, categories } =
  storeToRefs(restaurantsStore)

// Computed
const filteredRestaurants = computed(() => {
  if (!searchQuery.value) return restaurants.value
  const query = searchQuery.value.toLowerCase()
  return restaurants.value.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.category.toLowerCase().includes(query),
  )
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

// Ciclo de vida
onMounted(async () => {
  await restaurantsStore.fetchRestaurants()
})

// Métodos
const toggleFavorite = (restaurantId) => {
  restaurantsStore.toggleFavorite(restaurantId)
}

const selectRestaurant = (restaurant) => {
  router.push(`/restaurant/${restaurant.id}`)
}

const addToCart = (product) => {
  const item = cart.value.find((item) => item.id === product.id)
  if (item) {
    item.quantity += 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
  saveCart()
}

const removeFromCart = (productId) => {
  cart.value = cart.value.filter((item) => item.id !== productId)
  saveCart()
}

const increaseQuantity = (item) => {
  item.quantity += 1
  saveCart()
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
    saveCart()
  }
}

const checkout = () => {
  alert(`Pedido realizado por $${cartTotal.value.toFixed(2)}`)
  cart.value = []
  saveCart()
  showCart.value = false
}

const handleSearch = () => {
  restaurantsStore.searchRestaurants(searchQuery.value)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
</script>

<style scoped>
/* Estilos específicos del componente */
.loading,
.error-message {
  text-align: center;
  padding: 2rem;
  color: var(--gray-dark);
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.restaurant-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

.restaurant-card:hover {
  transform: translateY(-4px);
}

.restaurant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.restaurant-header h3 {
  margin: 0;
  font-size: 1.125rem;
  color: #333;
}

.favorite {
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
}

.category {
  color: var(--gray-dark);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.restaurant-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--gray-dark);
}

.discount {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: var(--rappi-red);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Estilos del carrito */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-medium);
}

.close-cart {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  list-style: none;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-light);
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-actions button {
  background: var(--gray-light);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remove-btn {
  color: var(--rappi-red);
  background: none !important;
  font-size: 1.25rem;
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid var(--gray-medium);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.checkout-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--rappi-red);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.checkout-btn:hover {
  background: var(--rappi-red-hover);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Responsive */
@media (max-width: 768px) {
  .restaurant-grid {
    grid-template-columns: 1fr;
  }

  .cart-sidebar {
    width: 100%;
  }
}
</style>
