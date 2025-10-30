<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-logo">
        <h1>rappi</h1>
        <p>Inicia sesión en tu cuenta</p>
      </div>

      <div v-if="message" class="error-message">
        {{ message }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input
            v-model="loginData.email"
            type="email"
            class="input"
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-model="loginData.password"
            type="password"
            class="input"
            placeholder="Contraseña"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="text-sm">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-rappi-red hover:underline">
            Regístrate
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginData = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const message = ref('')

const handleLogin = async () => {
  if (!loginData.value.email || !loginData.value.password) {
    message.value = 'Por favor completa todos los campos'
    return
  }

  try {
    loading.value = true
    await authStore.login(loginData.value)
    router.push('/home')
  } catch (error) {
    message.value = error.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
</style>
