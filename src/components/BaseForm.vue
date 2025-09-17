<template>
  <form class="base-form" @submit.prevent="onSubmit">
    <h2 class="form__title">
      {{ props.formType === 'check' ? 'Форма проверки' : 'Форма авторизации' }}
    </h2>
    <div class="input-wrapper">
      <input
        class="base-input"
        type="text"
        placeholder="Введите имя:"
        v-model="name.value.value"
        :class="{ 'error': name.errorMessage.value && name.meta.touched }"
        @blur="name.handleBlur()"
      >
      <span class="error-message" v-if="name.errorMessage.value && name.meta.touched">{{ name.errorMessage.value }}</span>
    </div>
    <div class="input-wrapper">
      <input
        class="base-input"
        type="email"
        placeholder="Введите email:"
        v-model="email.value.value"
        :class="{ 'error': email.errorMessage.value && email.meta.touched }"
        @blur="email.handleBlur()"
      >
      <span class="error-message" v-if="email.errorMessage.value && email.meta.touched">{{ email.errorMessage.value }}</span>
    </div>
    <template v-if="props.formType === 'check'">
      <div class="input-wrapper">
        <input
          class="base-input"
          type="text"
          placeholder="Введите ИНН:"
          v-model="inn.value.value"
          :class="{ 'error': inn.errorMessage.value && inn.meta.touched }"
          @blur="inn.handleBlur()"
        >
        <span class="error-message" v-if="inn.errorMessage.value && inn.meta.touched">{{ inn.errorMessage.value }}</span>
      </div>
      <div class="input-wrapper">
        <input
          class="base-input"
          type="tel"
          placeholder="Введите телефон:"
          v-model="formattedPhone"
          @input="handlePhoneInput"
          :class="{ 'error': phone.errorMessage.value && phone.meta.touched }"
          @blur="phone.handleBlur()"
        >
        <span class="error-message" v-if="phone.errorMessage.value && phone.meta.touched">{{ phone.errorMessage.value }}</span>
      </div>
    </template>
    <template v-else>
      <div class="input-wrapper">
        <input
          class="base-input"
          type="text"
          placeholder="Введите фамилию:"
          v-model="surname.value.value"
          :class="{ 'error': surname.errorMessage.value && surname.meta.touched }"
          @blur="surname.handleBlur()"
        >
        <span class="error-message" v-if="surname.errorMessage.value && surname.meta.touched">{{ surname.errorMessage.value }}</span>
      </div>
      <div class="input-wrapper">
        <input
          class="base-input"
          type="text"
          placeholder="Введите отчество:"
          v-model="patronymic.value.value"
          :class="{ 'error': patronymic.errorMessage.value && patronymic.meta.touched }"
          @blur="patronymic.handleBlur()"
        >
        <span class="error-message" v-if="patronymic.errorMessage.value && patronymic.meta.touched">{{ patronymic.errorMessage.value }}</span>
      </div>
      <div class="input-wrapper">
        <input
          class="base-input"
          type="text"
          placeholder="Дата рождения:"
          v-model="birthDate.value.value"
          :class="{ 'error': birthDate.errorMessage.value && birthDate.meta.touched }"
          @blur="birthDate.handleBlur()"
        >
        <span class="error-message" v-if="birthDate.errorMessage.value && birthDate.meta.touched">{{ birthDate.errorMessage.value }}</span>
      </div>
      <div class="input-wrapper">
        <input
          class="base-input"
          type="text"
          placeholder="Логин:"
          v-model="login.value.value"
          :class="{ 'error': login.errorMessage.value && login.meta.touched }"
          @blur="login.handleBlur()"
        >
        <span class="error-message" v-if="login.errorMessage.value && login.meta.touched">{{ login.errorMessage.value }}</span>
      </div>
    </template>
    <button
      type="submit"
      class="submit-button"
      :disabled="!isFormValid || formStore.loading"
    >
      {{ formStore.loading ? 'Отправка...' : 'Отправить' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { defineProps, ref, computed, watch } from 'vue';
import { useFormStore } from '../store/forms-state';

interface Props {
  formType: 'check' | 'auth'
}

const props = defineProps<Props>()
const formStore = useFormStore()
const formattedPhone = ref('')

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    name(value: string) {
      if (!value) return 'Имя обязательно'
      if (value.length < 2) return 'Имя должно содержать не менее двух символов'
      return true
    },
    email(value: string) {
      if(props.formType === 'check') {
        return true
      } else {
        if (!value) return 'Email обязателен'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Неверный формат email'
        return true
      }
    },
    inn(value: string) {
      if(props.formType === 'auth') {
        return true
      } else {
        if (!value) return 'ИНН обязателен'
        const digits = value.replace(/\D/g, '')
        if (![10, 12].includes(digits.length)) return 'ИНН должен содержать 10 или 12 цифр'
        if (!/^\d+$/.test(digits)) return 'ИНН должен содержать только цифры'
        return true
      }
    },
    phone(value: string) {
      if(props.formType === 'auth') {
        return true
      } else {
        if (!value) return 'Телефон обязателен'
        const digits = value.replace(/\D/g, '')
        if (digits.length < 11) return 'Введите номер телефона'
        if (!/^[78]\d{10}$/.test(digits)) return 'Некорректный номер телефона'
        return true
      }
    },
    surname(value: string) {
      if(props.formType === 'check') {
        return true
      } else {
        if (!value) return 'Фамилия обязательна'
        if (value.length < 2) return 'Фамилия должна содержать не менее двух символов'
        return true
      }
    },
    patronymic(value: string) {
      if(props.formType === 'check') {
        return true
      } else {
        if (!value) return 'Отчество обязательно'
        if (value.length < 2) return 'Отчество должно содержать не менее двух символов'
        return true
      }
    },
    birthDate(value: string) {
      if(props.formType === 'check') {
        return true
      } else {
        if (!value) return 'Дата рождения обязательна'
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return 'Формат: DD.MM.YYYY'
        return true
      }
    },
    login(value: string) {
      if(props.formType === 'check') {
        return true
      } else {
        if (!value) return 'Логин обязателен'
        if (value.length < 6) return 'Логин должен быть не менее 6 символов'
        if (!/^[a-zA-Z]+$/.test(value)) return 'Только латинские буквы'
        return true
      }
    }
  }
})

const name = useField('name')
const email = useField('email')

const inn = useField('inn')
const phone = useField('phone')

const surname = useField('surname')
const patronymic = useField('patronymic')
const birthDate = useField('birthDate')
const login = useField('login')

const isFormValid = computed(() => {
  if (props.formType === 'check') {
    return name.meta.valid && 
           email.meta.valid && 
           inn.meta.valid && 
           phone.meta.valid &&
           name.value.value &&
           email.value.value &&
           inn.value.value &&
           phone.value.value
  } else {
    return name.meta.valid && 
           email.meta.valid && 
           surname.meta.valid && 
           patronymic.meta.valid &&
           birthDate.meta.valid &&
           login.meta.valid &&
           name.value.value &&
           email.value.value &&
           surname.value.value &&
           patronymic.value.value &&
           birthDate.value.value &&
           login.value.value
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await formStore.submitForm(values, props.formType)
    resetForm()
    formattedPhone.value = ''
  } catch {}
})

function handlePhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  if (value.length > 11) {
    value = value.substring(0, 11)
  }
  
  let formattedValue = ''
  if (value.length > 0) {
    formattedValue = '+7 '
    if (value.length > 1) {
      formattedValue += value.substring(1, 4)
      if (value.length > 4) {
        formattedValue += ' ' + value.substring(4, 7)
        if (value.length > 7) {
          formattedValue += ' ' + value.substring(7, 9)
          if (value.length > 9) {
            formattedValue += ' ' + value.substring(9, 11)
          }
        }
      }
    }
  }
  
  formattedPhone.value = formattedValue
  phone.value.value = value
}

watch(() => props.formType, () => {
  resetForm()
  formattedPhone.value = ''
})
</script>

<style lang="scss" scoped>
.base-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  height: max-content;
  gap: 25px;

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

  .input-wrapper {
    position: relative;
    width: 100%;

    .base-input {
      font-size: 15px;
      font-weight: 300;
      color: var(--base-black);
      padding: 10px 20px;
      border: 1px solid var(--base-grey);
      border-radius: 5px;
      width: 100%;

      &.error {
        border-color: var(--base-red);
      }
    }

    .error-message {
      position: absolute;
      left: 0;
      bottom: -15px;
      color: var(--base-red);
      font-size: 12px;
      margin-top: 5px;
    }
  }

  .submit-button {
    cursor: pointer;
    padding: 10px 20px;
    background-color: var(--base-blue);
    color: var(--base-white);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: .5s;

    &:disabled {
      background: var(--base-grey);
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: var(--base-dark-blue);
    }
  }
}
</style>