import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  // Normalize property names: some components/store entries may use spanish keys (nombre/rol)
  const userRole = computed(() => user.value?.role || user.value?.rol)
  const userName = computed(() => user.value?.name || user.value?.nombre || '')

  // Acciones
  const register = (userData) => {
    if (users.value.some((u) => u.email === userData.email)) {
      throw new Error('El correo ya está registrado')
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    }

    users.value.push(newUser)
    localStorage.setItem('users', JSON.stringify(users.value))
    return newUser
  }

  const login = ({ email, password }) => {
    const foundUser = users.value.find((u) => u.email === email && u.password === password)

    if (!foundUser) throw new Error('Credenciales incorrectas')

    const authToken = `token-${Date.now()}`
    token.value = authToken
    user.value = foundUser

    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(foundUser))
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      return true
    }
    return false
  }

  return {
    // Estado
    token,
    user,
    users,
    // Getters
    isLoggedIn,
    userRole,
    userName,
    // Acciones
    register,
    login,
    logout,
    checkAuth,
  }
})
