<script setup>
import { ref } from 'vue'

const searchName = ref('')
const currentSpecies = ref('')
const emit = defineEmits(['filter'])

function applyFilters(species) {
  currentSpecies.value = species
  const filters = {
    name: searchName.value,
    species: species
  }

  emit('filter', filters)
}

function handleSearch() {
  applyFilters(currentSpecies.value)
}
</script>

<template>
  <section class="filter">
    <ul class="filter-links">
      <li :class="['filter-links__item', { 'filter-links__item--active': currentSpecies === '' }]">
        <a class="filter-links__link" href="" @click.prevent="applyFilters('')">All</a>
      </li>
      <li
        :class="[
          'filter-links__item',
          { 'filter-links__item--active': currentSpecies === 'Human' }
        ]"
      >
        <a class="filter-links__link" href="" @click.prevent="applyFilters('Human')">Human</a>
      </li>
      <li
        :class="[
          'filter-links__item',
          { 'filter-links__item--active': currentSpecies === 'Animal' }
        ]"
      >
        <a class="filter-links__link" href="" @click.prevent="applyFilters('Animal')">Animal</a>
      </li>
      <li
        :class="[
          'filter-links__item',
          { 'filter-links__item--active': currentSpecies === 'Alien' }
        ]"
      >
        <a class="filter-links__link" href="" @click.prevent="applyFilters('Alien')">Alien</a>
      </li>
    </ul>
    <div class="filter-search">
      <input
        class="filter-search__input"
        type="text"
        v-model="searchName"
        placeholder="Search by name"
      />
      <button class="filter-search__button" @click="handleSearch">Search</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
  gap: 40px;
  background-color: #f2f2f2;
  margin-bottom: 20px;

  &-links {
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 0;
    border: 1px solid #202428;
    border-radius: 5px;

    li:not(:last-child) {
      border-right: 1px solid #202428;
    }

    &__item {
      display: block;
      list-style: none;
      transition: 0.3s;
      padding: 5px 10px;

      &:hover {
        background-color: #202428;
      }

      &:hover a {
        color: #f2f2f2;
      }
    }

    &__item--active {
      background-color: #202428;
      color: #f2f2f2;

      a {
        color: #f2f2f2;
      }
    }

    &__link {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 14px;
      font-weight: 500;
      color: #202428;
      text-decoration: none;
      cursor: pointer;
    }
  }
}

.filter-search {
  &__input,
  &__button {
    padding: 5px;
    border: 1px solid #202428;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 500;
  }

  &__button {
    padding: 5px 10px;
    transition: 0.2s;
    border-left: none;

    &:hover {
      background-color: #202428;
      color: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>
