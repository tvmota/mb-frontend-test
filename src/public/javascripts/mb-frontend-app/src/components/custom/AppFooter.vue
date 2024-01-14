<script setup>
defineProps({
  footerTitle: {
    type: String,
    default: 'XABLAUSON'
  }
})
</script>

<template>
  <footer class="app__footer" role="contentinfo">
    <section class="app__footer__content">
      <a href="https://github.com/tvmota" class="app__footer__content--title text--sm" target="_blank">
        {{ footerTitle }}
      </a>
    </section>
  </footer>
</template>

<style>
.app {
  &__footer {
    align-items: center;
    background: var(--neutral);
    display: flex;
    justify-content: center;
    padding: 16px;
    grid-area: 3 / 1 / 4 / 2;

    &__content {
      &--title {
        color: var(--black);
        font-weight: 600;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
