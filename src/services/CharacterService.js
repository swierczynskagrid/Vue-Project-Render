import { ref } from 'vue'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const api = {
  getCharacters(page, filters = {}) {
    return apiClient.get('/character', {
      params: { page, ...filters }
    })
  },

  getCharacter(id) {
    return apiClient.get(`/character/${id}`)
  }
}

export function useCharacters() {
  const characters = ref([])
  const character = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const hasMore = ref(true)
  const totalPages = ref(0)

  async function fetchCharacters(filters = { name: '', species: '' }, page = 1) {
    loading.value = true

    try {
      const response = await api.getCharacters(page, filters)
      characters.value = response.data.results
      hasMore.value = response.data.info.next !== null
      totalPages.value = response.data.info.pages
    } catch (err) {
      error.value = err.message
      hasMore.value = false
    } finally {
      loading.value = false
    }
  }

  async function fetchCharacterById(id) {
    loading.value = true

    try {
      const response = await api.getCharacter(id)
      character.value = response.data
    } catch (err) {
      error.value = err.message
      character.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    characters,
    character,
    loading,
    error,
    fetchCharacters,
    fetchCharacterById,
    hasMore,
    totalPages
  }
}
