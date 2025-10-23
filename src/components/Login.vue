<template>
  <div class="container">
    <h1>¡Bienvenido a Rappi!</h1>

    <!-- Formulario de login arriba del botón -->
    <div class="login-container">
      <input v-model="loginData.email" type="email" placeholder="Correo" />
      <input v-model="loginData.password" type="password" placeholder="Contraseña" />
      <button @click="handleLogin">Iniciar sesión</button>
    </div>

    <!-- Botón de registro -->
    <button @click="goToRegister">Registrarse</button>

    <!-- Mensaje de estado -->
    <div v-if="message" :class="messageType">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginData = ref({
  email: '',
  password: '',
})

const message = ref('')
const messageType = ref('')

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => (message.value = ''), 3000)
}

// Función login simulada
const handleLogin = () => {
  if (!loginData.value.email || !loginData.value.password) {
    showMessage('Completa todos los campos', 'error')
    return
  }
  showMessage(`Login simulado: ${loginData.value.email}`, 'success')
  loginData.value = { email: '', password: '' }
}

// Ir al registro (Users.vue)
const goToRegister = () => router.push('/users')
</script>
