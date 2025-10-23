<template>
  <div>
    <!-- Mensaje de estado -->
    <div v-if="message" :class="messageType">
      {{ message }}
    </div>

    <!-- Crear usuario -->
    <h2>Crear usuario</h2>
    <form @submit.prevent="handleCreate">
      <input v-model="newUser.nombre" placeholder="Nombre" required />
      <input v-model="newUser.email" placeholder="Email" required />
      <input v-model="newUser.password" type="password" placeholder="Contraseña" required />
      <select v-model="newUser.rol">
        <option value="cliente">Cliente</option>
        <option value="vendedor">Vendedor</option>
        <option value="repartidor">Repartidor</option>
      </select>
      <button type="submit">Crear</button>
    </form>

    <!--
    <hr />

    <h2>Lista de usuarios</h2>
    <ul>
      <li v-for="u in users" :key="u.id">
        {{ u.nombre }} - {{ u.email }} - {{ u.rol }}
        <button @click="handleDelete(u.id)">Eliminar</button>
        <button @click="editUser(u)">Editar</button>
      </li>
    </ul>

    <div v-if="editingUser">
      <h2>Editar usuario: {{ editingUser.nombre }}</h2>
      <form @submit.prevent="handleUpdate">
        <input v-model="editingUser.nombre" placeholder="Nombre" required />
        <input v-model="editingUser.email" placeholder="Email" required />
        <input v-model="editingUser.password" type="password" placeholder="Contraseña" />
        <select v-model="editingUser.rol">
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
          <option value="repartidor">Repartidor</option>
        </select>
        <button type="submit">Actualizar</button>
        <button type="button" @click="cancelEdit">Cancelar</button>
      </form>
    </div>
    -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUsers, createUser, updateUser, deleteUser } from '../services/usersService.js'

const users = ref([])

const newUser = ref({
  nombre: '',
  email: '',
  password: '',
  rol: 'cliente',
})

const editingUser = ref(null)

const message = ref('')
const messageType = ref('')

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// Cargar usuarios
const loadUsers = async () => {
  try {
    users.value = await getUsers()
  } catch (error) {
    showMessage('Error cargando usuarios', 'error')
  }
}

onMounted(loadUsers)

// Crear usuario
const handleCreate = async () => {
  try {
    await createUser(newUser.value)
    newUser.value = { nombre: '', email: '', password: '', rol: 'cliente' }
    showMessage('Usuario creado correctamente', 'success')
    loadUsers()
  } catch (error) {
    showMessage('Error al crear usuario', 'error')
  }
}

// Editar usuario
const editUser = (user) => {
  editingUser.value = { ...user } // Copia superficial
}

// Cancelar edición
const cancelEdit = () => {
  editingUser.value = null
}

// Actualizar usuario
const handleUpdate = async () => {
  try {
    const dataToSend = { ...editingUser.value }
    if (!dataToSend.password) delete dataToSend.password
    await updateUser(dataToSend.id, dataToSend)
    editingUser.value = null
    showMessage('Usuario actualizado correctamente', 'success')
    loadUsers()
  } catch (error) {
    showMessage('Error al actualizar usuario', 'error')
  }
}
</script>
