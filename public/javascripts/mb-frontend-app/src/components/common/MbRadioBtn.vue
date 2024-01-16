<script setup>
const uniqId = window.crypto.randomUUID()
const emit = defineEmits(['update:modelValue', 'handleChange'])

const props = defineProps({
  customValue: {
    type: [String, Number],
    required: false
  },
  fieldName: {
    type: String,
    required: true
  },
  hasModel: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  labelTxt: {
    type: String,
    default: ''
  }
})

const handleChange = (checked) => {
  if (props.hasModel) {
    emit('update:modelValue', props.customValue || checked)
  } else {
    emit('handleChange', props.customValue || checked)
  }
}
</script>

<template>
  <label class="mb-radio">
    <input
      class="mb-radio__input"
      :id="uniqId"
      type="radio"
      :name="fieldName"
      :value="customValue"
      :checked="customValue ? modelValue === customValue : modelValue"
      @change="handleChange($event.target.checked)"
    />
    <span>{{ labelTxt }}</span>
  </label>
</template>

<style>
.mb-radio {
  margin-bottom: 8px;

  &__input {
    display: none;
  }

  > input[type='radio'] + *::before {
    content: '';
    display: inline-block;
    vertical-align: bottom;
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
    border-radius: 50%;
    border-style: solid;
    border-width: 0.1rem;
    border-color: gray;
  }

  > input[type='radio']:checked + * {
    color: var(--primary);
  }

  > input[type='radio']:checked + *::before {
    background: radial-gradient(
      var(--primary) 0%,
      var(--primary) 40%,
      transparent 50%,
      transparent
    );
    border-color: var(--primary);
  }

  > input[type='radio'] + * {
    display: inline-block;
  }
}
</style>
