// src/services/ordersService.js
import axios from 'axios'

const API_URL = 'http://localhost:3000/orders'

// Obtener todos los pedidos de un driver
export const getOrdersByDriver = async (driverId) => {
  // Si tu backend no soporta query params, cambia esto por `/drivers/${driverId}/orders`
  const response = await axios.get(`${API_URL}?driverId=${driverId}`)
  return response.data
}
