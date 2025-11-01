<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-logo">
        <h1>rappi</h1>
        <p>Crea tu cuenta</p>
      </div>

      <div v-if="message" class="error-message">
        {{ message }}
      </div>

      <form @submit.prevent="handleCreate" class="login-form">
        <div class="form-group">
          <input
            v-model="newUser.nombre"
            type="text"
            class="input"
            placeholder="Nombre completo"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-model="newUser.email"
            type="email"
            class="input"
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-model="newUser.password"
            type="password"
            class="input"
            placeholder="Contraseña"
            required
          />
        </div>

        <div class="form-group">
          <select v-model="newUser.rol" class="input" required>
            <option value="" disabled>Selecciona tu rol</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="repartidor">Repartidor</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="text-sm">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="text-rappi-red hover:underline">
            Inicia sesión
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

const newUser = ref({
  nombre: '',
  email: '',
  password: '',
  rol: '',
})

const loading = ref(false)
const message = ref('')

const handleCreate = async () => {
  if (
    !newUser.value.nombre ||
    !newUser.value.email ||
    !newUser.value.password ||
    !newUser.value.rol
  ) {
    message.value = 'Por favor completa todos los campos'
    return
  }

    try {
      loading.value = true

      // Normalize payload to match auth store expectations (name, role)
      const payload = {
        nombre: newUser.value.nombre, // keep original in case other parts read it
        name: newUser.value.nombre,
        email: newUser.value.email,
        password: newUser.value.password,
        role: newUser.value.rol,
        rol: newUser.value.rol,
      }

      await authStore.register(payload)
      message.value = '¡Cuenta creada exitosamente!'
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      message.value = error.message || 'Error al crear la cuenta'
    } finally {
      loading.value = false
    }
}
</script>

<style scoped>
/* Los estilos ya están en global.css */
</style>
