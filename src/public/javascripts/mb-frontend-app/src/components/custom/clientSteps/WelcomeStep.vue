<script setup>
import MbInput from '@/components/common/MbInput.vue'
import MbRadio from '@/components/common/MbRadioBtn.vue'
import { pfSchema } from '@/schemas/pfSchema'

const obj = {
  name: 'teste',
  document: '37827466869',
  birthDate: '31/12/2000',
  phone: '(11) 98788-8888'
}

pfSchema
  .validate(obj)
  .then((value) => console.log(value))
  .catch((err) => console.log(err))
</script>

<template>
  <section>
    <MbInput label-txt="Endereço de E-mail" />
    <div class="welcome-step__radios">
      <MbRadio fieldName="RdDocumentType" label-txt="Pessoa fisica" />
      <MbRadio fieldName="RdDocumentType" label-txt="Pessoa jurídica" />
    </div>
  </section>
</template>

<style>
.welcome-step {
  &__radios {
    display: flex;
    gap: 16px;
  }
}
</style>
