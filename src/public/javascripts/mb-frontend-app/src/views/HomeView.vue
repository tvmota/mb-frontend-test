<script setup>
import { ref, computed, reactive } from 'vue'
import MbWizard from '@/components/common/MbWizard.vue'
import WelcomeStep from '@/components/custom/clientSteps/WelcomeStep.vue'
import ClientStep from '@/components/custom/clientSteps/ClientStep.vue'
import CompanyStep from '@/components/custom/clientSteps/CompanyStep.vue'
import PassStep from '@/components/custom/clientSteps/PassStep.vue'
import FinalStep from '@/components/custom/clientSteps/FinalStep.vue'

const stepsComponents = {
  WelcomeStep,
  ClientStep,
  CompanyStep,
  PassStep,
  FinalStep
}
const stepsTitles = [
  'Seja bem vindo(a)',
  ['Pessoa física', 'Pessoa jurídica'],
  'Senha de acesso',
  'Revise suas informações'
]
const validSteps = reactive([false, false, false, false])
const actualStep = ref(1)
const welcomeStep = reactive({
  email: '',
  documentType: ''
})
const clientStep = reactive({
  name: '',
  document: '',
  birthDate: '',
  phone: ''
})
const companyStep = reactive({
  name: 'aaaaa',
  document: '',
  createDate: '',
  phone: ''
})
const passStep = reactive({
  pass: ''
})

const actualStepComponent = computed(() => {
  const comp = ['WelcomeStep', ['ClientStep', 'CompanyStep'], 'PassStep', 'FinalStep']

  if (actualStep.value !== 2) {
    return comp[actualStep.value - 1]
  } else {
    if (welcomeStep.documentType === 'PF') {
      return comp[1][0]
    }

    if (welcomeStep.documentType === 'PJ') {
      return comp[1][1]
    }
    return ''
  }
})

const actualStepTitle = computed(() => {
  if (actualStep.value !== 2) {
    return stepsTitles[actualStep.value - 1]
  } else {
    if (welcomeStep.documentType === 'PF') {
      return stepsTitles[1][0]
    }

    if (welcomeStep.documentType === 'PJ') {
      return stepsTitles[1][1]
    }
    return ''
  }
})

const handleNavigateBack = (step) => {
  actualStep.value = step
}

const handleNavigateNext = (step) => {
  if (validSteps[step - 2]) {
    actualStep.value = step
  }
}

const handleWelcomeStep = ({ email, documentType, isValid }) => {
  welcomeStep.email = email
  welcomeStep.documentType = documentType
  validSteps[0] = isValid
}

const handleClientStep = ({ name, document, birthDate, phone, isValid }) => {
  clientStep.name = name
  clientStep.document = document
  clientStep.birthDate = birthDate
  clientStep.phone = phone
  validSteps[1] = isValid
}

const handleCompanyStep = ({ name, document, createDate, phone, isValid }) => {
  console.log('handleCompanyStep')
  companyStep.name = name
  companyStep.document = document
  companyStep.createDate = createDate
  companyStep.phone = phone
  validSteps[1] = isValid
}

const handlePassStep = ({ pass, isValid }) => {
  passStep.pass = pass
  validSteps[2] = isValid
}

const handleFinalStep = (finalObj) => {
  const { isValid = false, ...restObject } = finalObj
  validSteps[3] = isValid
  console.log('home view', restObject)
}
</script>

<template>
  <section class="home-view__container">
    <MbWizard
      @navigate-back="handleNavigateBack"
      @navigate-next="handleNavigateNext"
      :actual="actualStep"
      :steps="4"
      :step-title="actualStepTitle"
    >
      <Transition name="transition__fade" mode="out-in">
        <component
          :is="stepsComponents[actualStepComponent]"
          v-bind="{
            clientType: welcomeStep.documentType,
            modelEmail: welcomeStep.email,
            modelDocumentType: welcomeStep.documentType,
            modelName: clientStep.name,
            modelDocument: clientStep.document,
            modelBirthDate: clientStep.birthDate,
            modelPhone: clientStep.phone,
            modelCompanyName: companyStep.name,
            modelCompanyDocument: companyStep.document,
            modelCreateDate: companyStep.createDate,
            modelCompanyPhone: companyStep.phone,
            modelPass: passStep.pass
          }"
          @handle-welcome-step-value="handleWelcomeStep"
          @handle-pf-step-value="handleClientStep"
          @handle-pj-step-value="handleCompanyStep"
          @handle-pass-step-value="handlePassStep"
          @handle-final-step-value="handleFinalStep"
        />
      </Transition>
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
