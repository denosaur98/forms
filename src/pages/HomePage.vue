<template>
  <div class="home-page">
    <div class="page__action-wrapper">
      <button class="base-button" @click="changeForm('check')">Открыть форму проверки</button>
      <button class="base-button" @click="changeForm('auth')">Открыть форму авторизации</button>
    </div>
    <BaseForm
      :formType="formType"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseForm from '../components/BaseForm.vue';

const formType = ref<'check' | 'auth'>('check');
function changeForm(type: 'check' | 'auth') {
  formType.value = type
}
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 25px;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .page__action-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    width: 500px;
    gap: 20px;

    @media (max-width: 600px) {
      flex-direction: column;
      width: 100%;
    }

    .base-button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: var(--base-black);
      border: 1px solid var(--base-grey);
      background: none;
      border-radius: 5px;
      padding: 5px 15px;
      width: 100%;
    }
  }
}
</style>