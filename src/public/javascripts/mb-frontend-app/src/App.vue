<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/custom/AppHeader.vue'
import AppFooter from '@/components/custom/AppFooter.vue'
</script>

<template>
  <AppHeader />

  <main class="app__main">
    <router-view v-slot="{ Component }">
      <transition name="transition__fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </main>

  <AppFooter />
</template>

<style>
.app {
  &__main {
    grid-area: 2 / 1 / 3 / 2;
    padding: 16px;
  }
}
</style>
