<template>
  <form class="base-form">
    <h2 class="form__title">{{ props.formType === 'check' ? 'Форма проверки' : 'Форма авторизации' }}</h2>
    <input class="base-input" type="text" placeholder="Введите имя:">
    <input class="base-input" type="text" placeholder="Введите фамилию:" v-if="props.formType === 'auth'">
    <input class="base-input" type="text" placeholder="Введите отчество:" v-if="props.formType === 'auth'">
    <input class="base-input" type="text" placeholder="Введите email:">
    <input class="base-input" type="number" placeholder="Введите ИНН:" v-if="props.formType === 'check'">
    <input class="base-input" type="number" placeholder="Введите телефон:" v-if="props.formType === 'check'">
    <input class="base-input" type="number" placeholder="Дата рождения:" v-if="props.formType === 'auth'">
    <input class="base-input" type="number" placeholder="Логин:" v-if="props.formType === 'auth'">
  </form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  formType: String
})
</script>

<style lang="scss" scoped>
.base-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: max-content;
  gap: 20px;

  @media (max-width: 600px) {
    width: 100%;
  }

  .form__title {
    font-size: 40px;
    color: var(--base-black);
    font-weight: 600;
    margin-bottom: 20px;

    @media (max-width: 600px) {
      font-size: 30px;
    }
  }

  .base-input {
    font-size: 15px;
    font-weight: 300;
    color: var(--base-black);
    padding: 5px 15px;
    border: 1px solid var(--base-grey);
    border-radius: 5px;
    width: 100%;
  }
}
</style>