<script setup>
import { reactive, ref } from 'vue'
import { welcomeSchema } from '@/schemas/welcomeSchema'
import { extractSchemaErr } from '@/utils/misc'
import MbInput from '@/components/common/MbInput.vue'
import MbRadio from '@/components/common/MbRadioBtn.vue'

const schema = welcomeSchema()

const props = defineProps({
  modelEmail: {
    type: String,
    default: ''
  },
  modelDocumentType: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['handleWelcomeStepValue'])

const email = ref(props.modelEmail)
const documentType = ref(props.modelDocumentType)
const errorsModel = reactive({
  email: '',
  documentType: ''
})

const checkErr = async () => {
  await handleEmit()
}

const handleLocalInput = async (value) => {
  email.value = value
  await handleEmit()
}

const handleLocalChange = async (value) => {
  documentType.value = value
  await handleEmit()
}

const handleEmit = async () => {
  try {
    await schema.validate(
      { email: email.value, documentType: documentType.value },
      { abortEarly: false }
    )
    errorsModel.email = ''
    errorsModel.documentType = ''
  } catch (err) {
    const errors = Object.entries(extractSchemaErr(err))
    errorsModel.email = ''
    errorsModel.documentType = ''
    errors.forEach((e) => {
      const [field = '', errMsg = ''] = e
      errorsModel[field] = errMsg
    })
  } finally {
    const isValid = await schema.isValid({
      email: email.value,
      documentType: documentType.value
    })
    emit('handleWelcomeStepValue', {
      email: email.value,
      documentType: documentType.value,
      isValid
    })
  }
}
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
      :model-value="email"
      @handle-input="handleLocalInput"
      @handle-blur="checkErr()"
    />
    <div class="welcome-step__radios">
      <div class="welcome-step__radios__inputs">
        <MbRadio
          custom-value="PF"
          :has-model="false"
          field-name="RdDocumentType"
          label-txt="Pessoa fisíca"
          :model-value="documentType"
          @handle-change="handleLocalChange"
        />
        <MbRadio
          custom-value="PJ"
          :has-model="false"
          field-name="RdDocumentType"
          label-txt="Pessoa jurídica"
          :model-value="documentType"
          @handle-change="handleLocalChange"
        />
      </div>
      <span class="welcome-step__radios__error--txt text--sm" v-if="errorsModel.documentType">
        {{ errorsModel.documentType }}
      </span>
    </div>
  </section>
</template>

<style>
.welcome-step {
  &__radios {
    display: flex;
    flex-direction: column;

    &__inputs {
      display: flex;
      gap: 8px;
    }

    &__error {
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
