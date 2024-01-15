<script setup>
import { reactive, ref } from 'vue'
import MbInput from '@/components/common/MbInput.vue'
import { pjSchema } from '@/schemas/pjSchema'
import { extractSchemaErr } from '@/utils/misc'

const props = defineProps({
  modelCompanyName: {
    type: String,
    default: ''
  },
  modelCompanyDocument: {
    type: String,
    default: ''
  },
  modelCreateDate: {
    type: String,
    default: ''
  },
  modelCompanyPhone: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['handlePjStepValue'])

const pjModel = reactive({
  name: ref(props.modelCompanyName),
  document: ref(props.modelCompanyDocument),
  createDate: ref(props.modelCreateDate),
  phone: ref(props.modelCompanyPhone)
})

const errorsModel = reactive({
  name: '',
  document: '',
  createDate: '',
  phone: ''
})

const checkErr = async () => {
  await handleEmit()
}

const clearErrors = () => {
  errorsModel.name = ''
  errorsModel.document = ''
  errorsModel.createDate = ''
  errorsModel.phone = ''
}

const handleLocalInput = async (value, prop) => {
  pjModel[prop] = value
  await handleEmit()
}

const handleEmit = async () => {
  try {
    await pjSchema.validate(pjModel, { abortEarly: false })
    clearErrors()
  } catch (err) {
    const errors = Object.entries(extractSchemaErr(err))

    clearErrors()
    errors.forEach((e) => {
      const [field = '', errMsg = ''] = e
      errorsModel[field] = errMsg
    })
  } finally {
    const isValid = await pjSchema.isValid(pjModel)
    emit('handlePjStepValue', {
      ...pjModel,
      isValid
    })
  }
}
</script>

<template>
  <section>
    <MbInput
      :field-required="true"
      field-placeholder="razão social"
      label-txt="razão social"
      :has-model="false"
      :has-error="errorsModel.name !== ''"
      :error-msg="errorsModel.name"
      :model-value="pjModel.name"
      @handle-input="(value) => handleLocalInput(value, 'name')"
      @handle-blur="checkErr()"
    />
    <MbInput
      label-txt="CNPJ"
      :has-mask="true"
      mask="##.###.###/####-##"
      :field-required="true"
      field-placeholder="CNPJ"
      :has-model="false"
      :has-error="errorsModel.document !== ''"
      :error-msg="errorsModel.document"
      :model-value="pjModel.document"
      @handle-input="(value) => handleLocalInput(value, 'document')"
      @handle-blur="checkErr()"
    />
    <MbInput
      label-txt="Data de abertura"
      :has-mask="true"
      mask="##/##/####"
      :field-required="true"
      field-placeholder="Data de abertura"
      :has-model="false"
      :has-error="errorsModel.createDate !== ''"
      :error-msg="errorsModel.createDate"
      :model-value="pjModel.createDate"
      @handle-input="(value) => handleLocalInput(value, 'createDate')"
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
      :model-value="pjModel.phone"
      @handle-input="(value) => handleLocalInput(value, 'phone')"
      @handle-blur="checkErr()"
    />
  </section>
</template>
