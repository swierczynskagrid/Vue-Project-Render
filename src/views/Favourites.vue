<script setup>
import { useFavouritesStore } from '../stores/favourites'
import { storeToRefs } from 'pinia'
import CharacterCard from '../components/CharacterCard.vue'

const favouritesStore = useFavouritesStore()
const { favourites } = storeToRefs(favouritesStore)
</script>

<template>
  <section class="favourites">
    <div v-if="favourites.length === 0">
      <p>No favourite characters added yet.</p>
    </div>
    <div v-else class="favourites__cards wrapper">
      <CharacterCard v-for="character in favourites" :key="character.id" :character="character" />
    </div>
  </section>
</template>

<style scoped>
.favourites {
  margin-top: 20px;
}
</style>
