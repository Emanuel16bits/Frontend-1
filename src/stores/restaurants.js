import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import restaurantsService from '@/services/restaurantsService'

export const useRestaurantsStore = defineStore('restaurants', () => {
  // State
  const restaurants = ref([])
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const getRestaurantById = computed(() => {
    return (id) => restaurants.value.find((r) => r.id === Number(id))
  })

  const isFavorite = computed(() => {
    return (id) => favorites.value.includes(id)
  })

  const featuredRestaurants = computed(() => {
    return [...restaurants.value].sort((a, b) => b.rating - a.rating).slice(0, 3)
  })

  const categories = computed(() => {
    const uniqueCategories = new Map()
    restaurants.value.forEach((restaurant) => {
      if (!uniqueCategories.has(restaurant.categoryId)) {
        uniqueCategories.set(restaurant.categoryId, {
          id: restaurant.categoryId,
          name: restaurant.category,
          icon: restaurant.emoji,
        })
      }
    })
    return Array.from(uniqueCategories.values())
  })

  // Actions
  const toggleFavorite = (restaurantId) => {
    const index = favorites.value.indexOf(restaurantId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(restaurantId)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const fetchRestaurants = async () => {
    loading.value = true
    error.value = null
    try {
      restaurants.value = await restaurantsService.getAll()
      return restaurants.value
    } catch (err) {
      error.value = 'Error al cargar los restaurantes'
      console.error('Error fetching restaurants:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchRestaurantById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const restaurant = await restaurantsService.getById(id)
      return restaurant
    } catch (err) {
      error.value = 'Error al cargar el restaurante'
      console.error('Error fetching restaurant:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createRestaurant = async (restaurantData) => {
    loading.value = true
    error.value = null
    try {
      const newRestaurant = await restaurantsService.create(restaurantData)
      restaurants.value.push(newRestaurant)
      return newRestaurant
    } catch (err) {
      error.value = 'Error al crear el restaurante'
      console.error('Error creating restaurant:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateRestaurant = async (id, restaurantData) => {
    loading.value = true
    error.value = null
    try {
      const updatedRestaurant = await restaurantsService.update(id, restaurantData)
      const index = restaurants.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        restaurants.value[index] = updatedRestaurant
      }
      return updatedRestaurant
    } catch (err) {
      error.value = 'Error al actualizar el restaurante'
      console.error('Error updating restaurant:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteRestaurant = async (id) => {
    loading.value = true
    error.value = null
    try {
      await restaurantsService.delete(id)
      restaurants.value = restaurants.value.filter((r) => r.id !== id)
    } catch (err) {
      error.value = 'Error al eliminar el restaurante'
      console.error('Error deleting restaurant:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchRestaurants = async (query) => {
    if (!query.trim()) return restaurants.value
    try {
      const results = await restaurantsService.search(query)
      return results
    } catch (err) {
      error.value = 'Error al buscar restaurantes'
      console.error('Error searching restaurants:', err)
      throw err
    }
  }

  return {
    // State
    restaurants,
    favorites,
    loading,
    error,

    // Getters
    getRestaurantById,
    isFavorite,
    featuredRestaurants,
    categories,

    // Actions
    toggleFavorite,
    fetchRestaurants,
    fetchRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
  }
})
