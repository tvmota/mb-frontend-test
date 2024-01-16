<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false
}
</script>
<script setup>
import { useAttrs, reactive } from 'vue'
import { getFinalSchema } from '@/schemas/finalSchema'
import { extractSchemaErr } from '@/utils/misc'
import MbInput from '@/components/common/MbInput.vue'

const emit = defineEmits(['handlePjStepValue'])
const attrs = useAttrs()

const props = defineProps({
  clientType: {
    type: String,
    required: true
  }
})

const getErrorsModel = () => {
  if (props.clientType === 'PF') {
    return reactive({
      name: '',
      email: '',
      pass: '',
      phone: '',
      document: '',
      birthDate: ''
    })
  } else {
    return reactive({
      name: '',
      email: '',
      pass: '',
      phone: '',
      document: '',
      createDate: ''
    })
  }
}

const finalModel = reactive({
  name: attrs.modelName || attrs.modelCompanyName,
  email: attrs.modelEmail,
  pass: attrs.modelPass,
  phone: attrs.modelPhone || attrs.modelCompanyPhone,
  document: attrs.modelDocument || attrs.modelCompanyDocument,
  birthDate: attrs.modelBirthDate,
  createDate: attrs.modelCreateDate
})
const errorsModel = getErrorsModel()
const schema = getFinalSchema(props.clientType)

const checkErr = async () => {
  await handleEmit()
}

const clearErrors = () => {
  errorsModel.name = ''
  errorsModel.email = ''
  errorsModel.phone = ''
  errorsModel.pass = ''
  errorsModel.document = ''

  if (props.clientType === 'PJ' && errorsModel.createDate) {
    errorsModel.createDate = ''
  }

  if (props.clientType === 'PF' && errorsModel.birthDate) {
    errorsModel.birthDate = ''
  }
}

const handleLocalInput = async (value, prop) => {
  finalModel[prop] = value
  await handleEmit()
}

const handleEmit = async () => {
  try {
    await schema.validate(finalModel, { abortEarly: false })
    clearErrors()
  } catch (err) {
    const errors = Object.entries(extractSchemaErr(err))
    clearErrors()
    errors.forEach((e) => {
      const [field = '', errMsg = ''] = e
      errorsModel[field] = errMsg
    })
  } finally {
    const isValid = await schema.isValid(finalModel)
    const finalObj =
      props.clientType === 'PF'
        ? {
            name: finalModel.name,
            email: finalModel.email,
            phone: finalModel.phone,
            pass: finalModel.pass,
            document: finalModel.document,
            birthDate: finalModel.birthDate
          }
        : {
            email: finalModel.email,
            phone: finalModel.phone,
            pass: finalModel.pass,
            document: finalModel.document,
            companyName: finalModel.name,
            createDate: finalModel.createDate
          }
    emit('handleFinalStepValue', {
      ...finalObj,
      isValid
    })
  }
}

handleEmit()
</script>

<template>
  <section>
    <MbInput
      :field-required="true"
      field-type="email"
      field-placeholder="e-mail"
      label-txt="Endereço de E-mail"
      :has-model="false"
      :has-error="errorsModel.email !== ''"
      :error-msg="errorsModel.email"
      :model-value="finalModel.email"
      @handle-input="(value) => handleLocalInput(value, 'email')"
      @handle-blur="checkErr()"
    />
    <MbInput
      :field-required="true"
      :field-placeholder="clientType == 'PF' ? 'nome' : 'razão social'"
      :label-txt="clientType == 'PF' ? 'nome' : 'razão social'"
      :has-model="false"
      :has-error="errorsModel.name !== ''"
      :error-msg="errorsModel.name"
      :model-value="finalModel.name"
      @handle-input="(value) => handleLocalInput(value, 'name')"
      @handle-blur="checkErr()"
    />
    <section v-if="clientType == 'PF'">
      <MbInput
        label-txt="CPF"
        :has-mask="true"
        mask="###.###.###-##"
        :field-required="true"
        field-placeholder="CPF"
        :has-model="false"
        :has-error="errorsModel.document !== ''"
        :error-msg="errorsModel.document"
        :model-value="finalModel.document"
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
        :model-value="finalModel.birthDate"
        @handle-input="(value) => handleLocalInput(value, 'birthDate')"
        @handle-blur="checkErr()"
      />
    </section>
    <section v-else>
      <MbInput
        label-txt="CNPJ"
        :has-mask="true"
        mask="##.###.###/####-##"
        :field-required="true"
        field-placeholder="CNPJ"
        :has-model="false"
        :has-error="errorsModel.document !== ''"
        :error-msg="errorsModel.document"
        :model-value="finalModel.document"
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
        :model-value="finalModel.createDate"
        @handle-input="(value) => handleLocalInput(value, 'createDate')"
        @handle-blur="checkErr()"
      />
    </section>
    <MbInput
      label-txt="Telefone"
      :has-mask="true"
      mask="['(##) #####-####', '(##) ####-####']"
      :field-required="true"
      field-placeholder="Telefone"
      :has-model="false"
      :has-error="errorsModel.phone !== ''"
      :error-msg="errorsModel.phone"
      :model-value="finalModel.phone"
      @handle-input="(value) => handleLocalInput(value, 'phone')"
      @handle-blur="checkErr()"
    />
    <MbInput
      :field-required="true"
      field-type="password"
      field-placeholder="Senha"
      label-txt="Senha"
      :has-model="false"
      :has-error="errorsModel.pass !== ''"
      :error-msg="errorsModel.pass"
      :model-value="finalModel.pass"
      @handle-input="(value) => handleLocalInput(value, 'pass')"
      @handle-blur="checkErr()"
    />
  </section>
</template>
