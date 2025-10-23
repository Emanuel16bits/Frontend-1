import axios from 'axios'

const API_URL = 'http://localhost:3000/restaurants'

// Obtener todos los restaurantes
export const getRestaurants = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// Obtener un restaurante por ID
export const getRestaurantById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

// Crear un nuevo restaurante
export const createRestaurant = async (restaurantData) => {
  const response = await axios.post(API_URL, restaurantData)
  return response.data
}

// Actualizar un restaurante completo (PUT)
export const updateRestaurant = async (id, restaurantData) => {
  const response = await axios.put(`${API_URL}/${id}`, restaurantData)
  return response.data
}

// Actualizar parcialmente un restaurante (PATCH)
export const patchRestaurant = async (id, partialData) => {
  const response = await axios.patch(`${API_URL}/${id}`, partialData)
  return response.data
}

// Eliminar un restaurante
export const deleteRestaurant = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}
