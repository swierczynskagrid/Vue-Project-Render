<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCharacters } from '../services/CharacterService'
import { useFavouritesStore } from '../stores/favourites'
import { useRoute } from 'vue-router'

const route = useRoute()
const { character, loading, error, fetchCharacterById } = useCharacters()

onMounted(() => {
  const characterId = Number(route.params.id)
  if (characterId) {
    fetchCharacterById(characterId)
  } else {
    console.error('Character ID is undefined')
  }
})

const firstEpisodeUrl = computed(() => {
  if (character.value && character.value.episode && character.value.episode.length > 0) {
    const episodeUrl = character.value.episode[0]
    const parts = episodeUrl.split('/')
    return parts[parts.length - 1]
  }
  return ''
})

const favouritesStore = useFavouritesStore()
const isFavourite = computed(() =>
  favouritesStore.favourites.some((fav) => fav.id === character.value?.id)
)

function toggleFavourite() {
  if (isFavourite.value) {
    favouritesStore.removeFavourite(character.value.id)
  } else {
    favouritesStore.addFavourite(character.value)
  }
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="character" class="character-details">
    <div class="character-details__info">
      <div class="info__description">
        <h1>{{ character.name }}</h1>
        <p>{{ character.status }} - {{ character.species }}</p>
        <p>Last known location: {{ character.location.name }}</p>
        <p>First seen in: {{ firstEpisodeUrl }}</p>
      </div>
      <button class="info__button" @click="toggleFavourite">
        {{ isFavourite ? 'Remove from Favourites' : 'Add to Favourites' }}
      </button>
    </div>
    <img class="character-details__image" :src="character.image" :alt="character.name" />
  </div>
  <div v-else>No character found.</div>
</template>

<style lang="scss" scoped>
.character-details {
  display: flex;
  justify-content: space-between;
  height: 250px;
  width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid #d6e0d6;
  border-radius: 5px;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 10px 10px 10px;
  }
}

.info__button {
  align-self: flex-start;
  padding: 8px 10px;
  color: #f2f2f2;
  background-color: #202428;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #39495c;
  }
}
</style>
