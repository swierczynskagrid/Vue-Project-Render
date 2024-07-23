<script setup>
import { ref, computed } from 'vue'
import { useFavouritesStore } from '../stores/favourites'

const props = defineProps({
  character: {
    type: Object,
    required: true
  },
  showRemoveButton: {
    type: Boolean,
    default: false
  }
})

const favouritesStore = useFavouritesStore()
const isFavourite = computed(() =>
  favouritesStore.favourites.some((fav) => fav.id === props.character.id)
)

function toggleFavourite() {
  if (isFavourite.value) {
    favouritesStore.removeFavourite(props.character.id)
  } else {
    favouritesStore.addFavourite(props.character)
  }
}
</script>

<template>
  <div class="card">
    <RouterLink
      class="card__link"
      :to="{ name: 'character-details', params: { id: character.id } }"
    >
      <img class="card__image" :src="character.image" alt="" />
      <div class="card__details">
        <p class="text">{{ character.name }}</p>
        <p class="text">{{ character.species }} - {{ character.status }}</p>
      </div></RouterLink
    >
    <button class="card__button" @click="toggleFavourite">
      {{ isFavourite ? 'Remove from Favourites' : 'Add to Favourites' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 280px;
  border: 1px solid #d6e0d6;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }

  &__link {
    text-decoration: none;
    color: #39495c;
  }

  &__details {
    padding: 0px 10px 10px 10px;

    .text {
      padding: 0;
      margin: 0px;
    }
  }

  &__image {
    width: 300px;
    height: 180px;
    object-fit: cover;
    object-position: center;
  }

  &__button {
    align-self: flex-start;
    padding: 8px 10px;
    margin: 0px 0px 5px 5px;
    border-radius: 5px;
    border: none;
    color: #f2f2f2;
    background-color: #202428;
    cursor: pointer;

    &:active {
      background-color: #39495c;
    }
  }
}
</style>
