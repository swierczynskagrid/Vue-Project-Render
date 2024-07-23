import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favourites: JSON.parse(localStorage.getItem('favourites')) || []
  }),

  actions: {
    addFavourite(character) {
      if (!this.favourites.some((fav) => fav.id === character.id)) {
        this.favourites.push(character)
        this.saveFavourites()
      }
    },

    removeFavourite(characterId) {
      this.favourites = this.favourites.filter((fav) => fav.id !== characterId)
      this.saveFavourites()
    },

    saveFavourites() {
      localStorage.setItem('favourites', JSON.stringify(this.favourites))
    }
  }
})
