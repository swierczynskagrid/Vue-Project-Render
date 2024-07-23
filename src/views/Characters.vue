<script setup>
import { ref, onMounted } from 'vue'
import CharacterCard from '../components/CharacterCard.vue'
import CharacterFilter from '../components/CharacterFilter.vue'
import Pagination from '../components/Pagination.vue'
import { useCharacters } from '../services/CharacterService'

const { characters, loading, error, fetchCharacters, hasMore, totalPages } = useCharacters()
const filters = ref({ name: '', species: '' })
const page = ref(1)

function applyFilters(newFilters) {
  filters.value = newFilters
  page.value = 1
  fetchCharacters(filters.value, page.value)
}

function updatePage(newPage) {
  page.value = newPage
  fetchCharacters(filters.value, page.value)
}

onMounted(() => {
  fetchCharacters(filters.value, page.value)
})
</script>

<template>
  <CharacterFilter @filter="applyFilters" />
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>

  <div v-else class="wrapper">
    <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    <Pagination :page="page" :hasMore="hasMore" :totalPages="totalPages" @updatePage="updatePage" />
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1400px;
}
</style>
