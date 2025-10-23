<template>
  <div class="container">
    <h1>Restaurantes disponibles</h1>

    <div v-if="loading">Cargando restaurantes...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <div v-else class="restaurant-list">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <h2>{{ restaurant.nombre }}</h2>
        <p>{{ restaurant.descripcion }}</p>

        <h3>Productos:</h3>
        <div class="products-grid">
          <div v-for="product in restaurant.products" :key="product.id" class="product-card">
            <h4>{{ product.nombre }}</h4>
            <p class="price">${{ product.precio.toFixed(2) }}</p>
            <button
              @click="addToCart(product)"
              :disabled="isInCart(product.id)"
              class="add-to-cart"
            >
              {{ isInCart(product.id) ? 'En el carrito' : 'Añadir al carrito' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.length > 0" class="cart-container">
      <h2>Tu Carrito</h2>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.nombre }} - ${{ item.precio.toFixed(2) }} x {{ item.quantity }}
          <button @click="increaseQuantity(item)">+</button>
          <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</button>
          <button @click="removeFromCart(item.id)" class="remove-btn">Eliminar</button>
        </li>
      </ul>
      <p>Total: ${{ cartTotal.toFixed(2) }}</p>
      <button @click="checkout" :disabled="cart.length === 0">Realizar pedido</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getRestaurants } from '../services/restaurantsService'
import { getProductsByRestaurant } from '../services/productsService'

const restaurants = ref([])
const loading = ref(true)
const error = ref('')
const cart = ref([])

onMounted(async () => {
  try {
    loading.value = true
    const data = await getRestaurants()
    restaurants.value = data.map((r) => ({ ...r, products: [] }))

    await Promise.all(restaurants.value.map((r) => loadProducts(r.id)))
  } catch (err) {
    console.error(err)
    error.value = 'Error al cargar los restaurantes.'
  } finally {
    loading.value = false
  }
})

const loadProducts = async (restaurantId) => {
  try {
    const products = await getProductsByRestaurant(restaurantId)
    const restaurant = restaurants.value.find((r) => r.id === restaurantId)
    if (restaurant) restaurant.products = products
  } catch (err) {
    console.error(err)
  }
}

// Carrito
const addToCart = (product) => {
  const item = cart.value.find((i) => i.id === product.id)
  if (item) item.quantity += 1
  else cart.value.push({ ...product, quantity: 1 })
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter((i) => i.id !== id)
}

const increaseQuantity = (item) => (item.quantity += 1)
const decreaseQuantity = (item) => {
  if (item.quantity > 1) item.quantity -= 1
}
const isInCart = (id) => cart.value.some((i) => i.id === id)
const cartTotal = computed(() => cart.value.reduce((t, i) => t + i.precio * i.quantity, 0))

const checkout = () => {
  alert(`Pedido realizado por un total de $${cartTotal.value.toFixed(2)}`)
  cart.value = []
}
</script>
