<script setup>
import MbWizard from '@/components/common/MbWizard.vue'
import WelcomeStep from '@/components/custom/clientSteps/WelcomeStep.vue'

const handleNavigate = (step) => {
  console.log(step)
}
</script>

<template>
  <section class="home-view__container">
    <MbWizard @update-step="handleNavigate">
      <WelcomeStep />
    </MbWizard>
  </section>
</template>

<style>
.home-view {
  &__container {
    margin: auto;
    max-width: 768px;
  }
}
</style>
