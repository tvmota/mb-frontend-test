<script setup>
//import { computed } from 'vue'
import { vMaska } from 'maska'

const emits = defineEmits(['update:modelValue', 'handleBlur', 'handleInput'])

const props = defineProps({
  errorMsg: {
    type: String,
    default: ''
  },
  fieldName: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    default: 'text'
  },
  fieldPlaceholder: {
    type: String,
    default: ''
  },
  fieldRequired: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  hasMask: {
    type: Boolean,
    default: false
  },
  hasModel: {
    type: Boolean,
    default: true
  },
  labelTxt: {
    type: String,
    default: ''
  },
  mask: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const handleInput = (value) => {
  if (props.hasModel) {
    emits('update:modelValue', value)
  } else {
    emits('handleInput', value)
  }
}
</script>

<template>
  <div class="mb-input">
    <label class="mb-input--label" :for="fieldName">{{ labelTxt }}</label>
    <input
      v-if="!hasMask"
      class="mb-input__field"
      :class="[`${hasError && fieldRequired ? 'mb-input__field__error' : ''}`]"
      :name="fieldName"
      :placeholder="fieldPlaceholder || labelTxt"
      :type="fieldType"
      :value="modelValue"
      :required="fieldRequired"
      @input="handleInput($event.target.value)"
      @blur="emits('handleBlur')"
    />
    <input
      v-else
      v-maska
      :data-maska="mask"
      class="mb-input__field"
      :class="[`${hasError && fieldRequired ? 'mb-input__field__error' : ''}`]"
      :name="fieldName"
      :placeholder="fieldPlaceholder || labelTxt"
      :type="fieldType"
      :value="modelValue"
      :required="fieldRequired"
      @maska="(evt) => handleInput(evt.detail.masked)"
      @blur="emits('handleBlur')"
    />
    <span v-if="hasError && fieldRequired" class="mb-input__field__error--txt text--sm">
      {{ errorMsg }}
    </span>
  </div>
</template>

<style>
.mb-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  position: relative;
  width: 100%;

  &--label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
    text-transform: capitalize;
  }

  &__field {
    border: 1px solid;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 8px;
    width: 100%;
    text-transform: uppercase;

    &:focus {
      border: 1px solid var(--neutral);
      outline: 2px solid transparent;
      outline-offset: 2px;
    }

    &__error {
      border-color: var(--error);

      &--txt {
        align-items: center;
        color: var(--error);
        display: flex;
        margin-top: 4px;
        font-weight: 500;
      }
    }
  }
}
</style>
