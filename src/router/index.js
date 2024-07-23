import { createRouter, createWebHistory } from 'vue-router'
import Favourites from '../views/Favourites.vue'
import Characters from '../views/Characters.vue'
import CharacterDetails from '../views/CharacterDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'character',
      component: Characters
    },
    {
      path: '/character/:id',
      name: 'character-details',
      component: CharacterDetails
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites
    }
  ]
})

export default router
