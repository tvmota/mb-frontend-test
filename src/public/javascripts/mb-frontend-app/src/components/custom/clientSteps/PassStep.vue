<script setup>
import { reactive, ref } from 'vue'
import { passSchema } from '@/schemas/passSchema'
import { extractSchemaErr } from '@/utils/misc'
import MbInput from '@/components/common/MbInput.vue'

const props = defineProps({
  modelPass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['handlePassStepValue'])

const pass = ref(props.modelPass)

const errorsModel = reactive({
  pass: ''
})

const checkErr = async () => {
  await handleEmit()
}

const handleLocalInput = async (value) => {
  pass.value = value
  await handleEmit()
}

const handleEmit = async () => {
  try {
    await passSchema.validate({ pass: pass.value }, { abortEarly: false })
    errorsModel.pass = ''
  } catch (err) {
    const errors = Object.entries(extractSchemaErr(err))
    errorsModel.pass = ''
    errors.forEach((e) => {
      const [field = '', errMsg = ''] = e
      errorsModel[field] = errMsg
    })
  } finally {
    const isValid = await passSchema.isValid({
      pass: pass.value
    })
    emit('handlePassStepValue', {
      pass: pass.value,
      isValid
    })
  }
}
</script>

<template>
  <section>
    <MbInput
      :field-required="true"
      field-type="password"
      field-placeholder="Senha"
      label-txt="Senha"
      :has-model="false"
      :has-error="errorsModel.pass !== ''"
      :error-msg="errorsModel.pass"
      :model-value="pass"
      @handle-input="handleLocalInput"
      @handle-blur="checkErr()"
    />
  </section>
</template>
