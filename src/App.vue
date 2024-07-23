<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div id="layout">
    <Header />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
