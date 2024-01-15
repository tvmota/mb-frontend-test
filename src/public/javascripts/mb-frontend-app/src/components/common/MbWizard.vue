<script setup>
import { ref } from 'vue'

const props = defineProps({
  btnNextTxt: {
    type: String,
    default: 'continuar'
  },
  btnBackTxt: {
    type: String,
    default: 'voltar'
  },
  steps: {
    type: Number,
    default: 4
  },
  stepTitle: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['updateStep'])

const actualStep = ref(1)

const handlePrev = () => {
  if (actualStep.value > 1) {
    actualStep.value = actualStep.value - 1
    emits('updateStep', actualStep)
  }
}

const handleNext = () => {
  if (actualStep.value < props.steps) {
    actualStep.value = actualStep.value + 1
    emits('updateStep', actualStep)
  }
}
</script>

<template>
  <section class="mb-wizard">
    <header class="mb-wizard__header" role="heading">
      <span class="mb-wizard__header__step text--sm">
        Etapa
        <span class="mb-wizard__header__step--active">{{ actualStep }}</span> de {{ steps }}
      </span>
      <h3 class="mb-wizard__header--title">
        {{ stepTitle }}
      </h3>
    </header>
    <section>
      <slot></slot>
    </section>
    <section class="mb-wizard__actions">
      <button
        class="mb-wizard__actions__back text-md"
        type="button"
        v-if="actualStep > 1"
        @click="handlePrev"
      >
        {{ btnBackTxt }}
      </button>
      <button class="mb-wizard__actions__next text-md" type="button" @click="handleNext">
        {{ btnNextTxt }}
      </button>
    </section>
  </section>
</template>

<style>
.mb-wizard {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-transform: capitalize;

    &__step {
      &--active {
        color: var(--primary);
      }
    }

    &--title {
      font-size: 24px;
      font-weight: 700;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;

    button {
      cursor: pointer;
      border-radius: 6px;
      font-weight: 600;
      padding: 8px;
      outline: unset;
      flex: 1;
      text-transform: capitalize;

      &:active {
        filter: brightness(85%);
      }

      &:hover {
        box-shadow:
          0 20px 25px -5px rgb(0 0 0 / 0.1),
          0 8px 10px -6px rgb(0 0 0 / 0.1);
      }
    }

    &__next {
      background: var(--primary);
      color: var(--white);
      border: 0;
    }

    &__back {
      background: var(--white);
      color: var(--primary);
      border: 1px solid var(--primary);
    }
  }
}
</style>
