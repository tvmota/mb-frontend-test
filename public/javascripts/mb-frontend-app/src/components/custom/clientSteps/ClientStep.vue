<script setup>
import { reactive, ref } from 'vue'
import MbInput from '@/components/common/MbInput.vue'
import { pfSchema } from '@/schemas/pfSchema'
import { extractSchemaErr } from '@/utils/misc'

const props = defineProps({
  modelName: {
    type: String,
    default: ''
  },
  modelDocument: {
    type: String,
    default: ''
  },
  modelBirthDate: {
    type: String,
    default: ''
  },
  modelPhone: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['handlePfStepValue'])

const pfModel = reactive({
  name: ref(props.modelName),
  document: ref(props.modelDocument),
  birthDate: ref(props.modelBirthDate),
  phone: ref(props.modelPhone)
})

const errorsModel = reactive({
  name: '',
  document: '',
  birthDate: '',
  phone: ''
})

const checkErr = async () => {
  await handleEmit()
}

const clearErrors = () => {
  errorsModel.name = ''
  errorsModel.document = ''
  errorsModel.birthDate = ''
  errorsModel.phone = ''
}

const handleLocalInput = async (value, prop) => {
  pfModel[prop] = value
  await handleEmit()
}

const handleEmit = async () => {
  try {
    await pfSchema.validate(pfModel, { abortEarly: false })
    clearErrors()
  } catch (err) {
    const errors = Object.entries(extractSchemaErr(err))
    clearErrors()
    errors.forEach((e) => {
      const [field = '', errMsg = ''] = e
      errorsModel[field] = errMsg
    })
  } finally {
    const isValid = await pfSchema.isValid(pfModel)
    emit('handlePfStepValue', {
      ...pfModel,
      isValid
    })
  }
}
</script>

<template>
  <section>
    <MbInput
      :field-required="true"
      field-placeholder="Nome"
      label-txt="Nome"
      :has-model="false"
      :has-error="errorsModel.name !== ''"
      :error-msg="errorsModel.name"
      :model-value="pfModel.name"
      @handle-input="(value) => handleLocalInput(value, 'name')"
      @handle-blur="checkErr()"
    />
    <MbInput
      label-txt="CPF"
      :has-mask="true"
      mask="###.###.###-##"
      :field-required="true"
      field-placeholder="CPF"
      :has-model="false"
      :has-error="errorsModel.document !== ''"
      :error-msg="errorsModel.document"
      :model-value="pfModel.document"
      @handle-input="(value) => handleLocalInput(value, 'document')"
      @handle-blur="checkErr()"
    />
    <MbInput
      label-txt="Data de Nascimento"
      :has-mask="true"
      mask="##/##/####"
      :field-required="true"
      field-placeholder="Data de nascimento"
      :has-model="false"
      :has-error="errorsModel.birthDate !== ''"
      :error-msg="errorsModel.birthDate"
      :model-value="pfModel.birthDate"
      @handle-input="(value) => handleLocalInput(value, 'birthDate')"
      @handle-blur="checkErr()"
    />
    <MbInput
      label-txt="Telefone"
      :has-mask="true"
      mask="['(##) #####-####', '(##) ####-####']"
      :field-required="true"
      field-placeholder="Telefone"
      :has-model="false"
      :has-error="errorsModel.phone !== ''"
      :error-msg="errorsModel.phone"
      :model-value="pfModel.phone"
      @handle-input="(value) => handleLocalInput(value, 'phone')"
      @handle-blur="checkErr()"
    />
  </section>
</template>
