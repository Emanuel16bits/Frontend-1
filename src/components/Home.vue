<template>
  <div class="home-container">
    <!-- HEADER -->
    <header class="home-header">
      <h1 class="logo">rappi</h1>
      <div class="user-info">
        
        <button class="btn-logout" @click="goToLogin">Cerrar sesión</button>
      </div>
    </header>

    <!-- MAIN -->
    <main class="home-main">
      <h2>Selecciona tu rol</h2>
      <p class="subtitle">Elegí cómo querés ingresar a Rappi</p>

      <div class="home-options">
        <div class="option-card" @click="selectRole('cliente')">
          <i class="fa-solid fa-basket-shopping"></i>
          <h3>Cliente</h3>
          <p>Compra productos y realiza pedidos fácilmente.</p>
        </div>

        <div class="option-card" @click="selectRole('vendedor')">
          <i class="fa-solid fa-store"></i>
          <h3>Vendedor</h3>
          <p>Gestioná tus productos y controlá tus ventas.</p>
        </div>

        <div class="option-card" @click="selectRole('repartidor')">
          <i class="fa-solid fa-motorcycle"></i>
          <h3>Delivery</h3>
          <p>Entregá pedidos y revisá tu historial de entregas.</p>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="home-footer">
      <p>© 2025 Rappi — Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Redirige al login
const goToLogin = () => {
  router.push('/login')
}

// Redirige según el rol elegido
const selectRole = (role) => {
  switch (role) {
    case 'cliente':
      router.push('/home-cliente')
      break
    case 'vendedor':
      router.push('/home-vendedor')
      break
    case 'repartidor':
      router.push('/home-repartidor')
      break
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fafafa;
  color: #333;
  font-family: 'Inter', sans-serif;
}

/* Header */
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ff4d4d;
  color: white;
  padding: 1rem 2rem;
}

.logo {
  font-weight: bold;
  font-size: 1.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-logout {
  background: white;
  color: #ff4d4d;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-logout:hover {
  background: #ffeaea;
}

/* Main */
.home-main {
  flex: 1;
  padding: 2rem;
  text-align: center;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.home-options {
  display: grid;
  gap: 1.5rem;
  justify-items: center;
}

.option-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  max-width: 300px;
}

.option-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
}

.option-card i {
  font-size: 2.5rem;
  color: #ff4d4d;
  margin-bottom: 1rem;
}

/* Footer */
.home-footer {
  background: #f5f5f5;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #777;
}
</style>
