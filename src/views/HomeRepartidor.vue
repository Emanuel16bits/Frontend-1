<template>
  <div class="home-container">
    <header>
      <h1>🛵 Rappi - Panel Repartidor</h1>
    </header>

    <main>
      <div v-if="driver">
        <h2>{{ driver.nombre }}</h2>

        <p>
          <strong>Estado:</strong>
          <span :class="driver.disponible ? 'activo' : 'inactivo'">
            {{ driver.disponible ? 'Activo' : 'Inactivo' }}
          </span>
          <button @click="toggleDisponibilidad">
            {{ driver.disponible ? 'Desactivar' : 'Activar' }}
          </button>
        </p>

        <p><strong>Ganancias:</strong> ${{ driver.gananciasTotales }}</p>
        <p><strong>Calificación:</strong> ⭐ {{ driver.calificacion }}</p>

        <h3>Pedidos asignados:</h3>
        <div v-if="orders.length === 0">No hay pedidos asignados</div>
        <ul v-else>
          <li v-for="o in orders" :key="o.id">
            Pedido #{{ o.id }} - {{ o.direccion }} - Estado: {{ o.estado }}
          </li>
        </ul>
      </div>

      <div v-else>Cargando información...</div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDriverStore } from '@/stores/driverStore'
import { getOrdersByDriver } from '@/services/orderService'

const driverStore = useDriverStore()
driverStore.loadFromStorage() // carga driverId desde localStorage

const driver = ref(null)
const orders = ref([])

const fetchData = async () => {
  await driverStore.fetchDriver()
  driver.value = driverStore.driver

  if (driver.value) {
    orders.value = await getOrdersByDriver(driver.value.id)
  }
}

const toggleDisponibilidad = async () => {
  await driverStore.toggleAvailability()
  driver.value = driverStore.driver
}

onMounted(fetchData)
</script>

<style scoped>
.home-container { max-width: 700px; margin: auto; padding: 1rem; font-family: Arial, sans-serif; }
.activo { color: green; font-weight: bold; }
.inactivo { color: red; font-weight: bold; }
button { margin-left: 10px; padding: 5px 10px; border-radius: 6px; border: none; background-color: #007bff; color: white; cursor: pointer; }
button:hover { background-color: #0056b3; }
ul { padding-left: 20px; }
</style>




