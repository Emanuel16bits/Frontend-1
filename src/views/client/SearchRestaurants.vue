<template>
  <div class="buscar-container">
    <header class="buscar-header">
      <h2>🍽️ Restaurantes Disponibles</h2>
      <button class="btn" @click="goTo('/home-cliente')">Volver</button>
    </header>

    <div v-if="loading" class="loading">Cargando restaurantes...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="restaurantes-lista">
      <div
        v-for="restaurante in restaurantes"
        :key="restaurante.id"
        class="restaurante-card"
      >
        <h3>{{ restaurante.nombre }}</h3>
        <p>{{ restaurante.descripcion }}</p>
        <p><strong>Dirección:</strong> {{ restaurante.direccion }}</p>

        <button class="btn-agregar" @click="agregarAlCarrito(restaurante)">
          Agregar al carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRestaurants } from '@/services/restaurantsService'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const restaurantes = ref([])
const loading = ref(true)
const error = ref(null)

const goTo = (path) => router.push(path)

const cargarRestaurantes = async () => {
  try {
    const data = await getRestaurants()
    restaurantes.value = data
  } catch (err) {
    error.value = 'No se pudieron cargar los restaurantes.'
  } finally {
    loading.value = false
  }
}

const agregarAlCarrito = (restaurante) => {
  cartStore.agregarRestaurante(restaurante)
  alert(`✅ ${restaurante.nombre} agregado al carrito`)
}

onMounted(() => {
  cargarRestaurantes()
})
</script>

<style scoped>
.buscar-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.buscar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.restaurantes-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.restaurante-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.btn-agregar {
  margin-top: 1rem;
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.loading, .error {
  text-align: center;
  font-weight: bold;
}

</style>
