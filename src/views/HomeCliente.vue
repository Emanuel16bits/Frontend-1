<template>
  <div class="home-container">
    <header class="home-header">
      <h1>🛵 Rappi</h1>
      <div>
        <button class="btn" @click="goTo('/home')">Volver</button>
      </div>
    </header>

    <main class="home-main">
      <h2>Panel del Cliente</h2>
      <p>Selecciona lo que deseas hacer</p>

      <div class="home-options">
        <!-- Buscar Restaurantes -->
        <div class="option-card" @click="goTo('/buscar-restaurantes')">
          <i class="fa-solid fa-utensils"></i>
          <h3>Buscar Restaurantes</h3>
        </div>

        <!-- Ingresar Pedido -->
        <div class="option-card" @click="goTo('/carrito')">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3>Ingresar Pedido</h3>
        </div>

        <!-- Ver Pedidos -->
        <div class="option-card" @click="goTo('/pedidos')">
          <i class="fa-solid fa-receipt"></i>
          <h3>Mis Pedidos</h3>
        </div>

        <!-- Favoritos -->
        <div class="option-card" @click="goTo('/favoritos')">
          <i class="fa-solid fa-heart"></i>
          <h3>Favoritos</h3>
        </div>

        <!-- Perfil -->
        <div class="option-card" @click="goTo('/perfil')">
          <i class="fa-solid fa-user"></i>
          <h3>Mi Perfil</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Función para navegar a otra ruta
const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-main {
  margin-top: 30px;
}

.home-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.option-card {
  cursor: pointer;
  flex: 1 1 200px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;
}

.option-card:hover {
  transform: scale(1.05);
}

.option-card i {
  font-size: 30px;
  margin-bottom: 10px;
}
</style>
