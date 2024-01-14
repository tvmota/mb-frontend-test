<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="app__header" role="banner">
    <RouterLink to="/" class="app__header--title"> Wizard App </RouterLink>
  </header>
</template>

<style>
.app {
  &__header {
    align-items: center;
    background: var(--primary);
    display: flex;
    grid-area: 1 / 1 / 2 / 2;
    justify-content: center;

    &--title {
      color: white;
      font-size: 26px;
      font-weight: 600;
      text-decoration: none;
    }
  }
}
</style>
