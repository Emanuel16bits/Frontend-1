<template>
  <div class="home-container">
    <header class="home-header">
      <h1>🏪 rappi</h1>
      <div>
        <button class="btn" @click="goTo('/home')">Volver</button>
      </div>
    </header>

    <main class="home-main">
      <h2>Panel del Vendedor</h2>
      <p>Gestiona tu negocio fácilmente</p>

      <div class="home-options">
        <div class="option-card" @click="goTo('/mis-productos')">
          <i class="fa-solid fa-boxes-stacked"></i>
          <h3>Mis Productos</h3>
        </div>

        <div class="option-card" @click="goTo('/pedidos-vendedor')">
          <i class="fa-solid fa-clipboard-list"></i>
          <h3>Pedidos Recibidos</h3>
        </div>

        <div class="option-card" @click="goTo('/reportes')">
          <i class="fa-solid fa-chart-line"></i>
          <h3>Reportes</h3>
        </div>

        <div class="option-card" @click="goTo('/perfil-vendedor')">
          <i class="fa-solid fa-user-gear"></i>
          <h3>Mi Perfil</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goTo = (path) => router.push(path)
</script>


