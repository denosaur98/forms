import { defineStore } from 'pinia';
import axios from 'axios';
import notyf from '../utils/notyf';

interface FormData {
  requestId: string
  classifier: string
  formType: 'check' | 'auth'
  submittedAt: string
}

interface FormValues {
  name: string
  email: string
  inn?: string
  phone?: string
  surname?: string
  patronymic?: string
  birthDate?: string
  login?: string
}

export const useFormStore = defineStore('forms', {
  state: () => ({
    formData: null as FormData | null,
    loading: false
  }),

  actions: {
    setFormData(data: FormData) {
      this.formData = data
    },

    async submitForm(values: FormValues, formType: 'check' | 'auth') {
      this.loading = true
      
      try {
        const url = formType === 'check' ? 'http://localhost:4200/api/form/a' : 'http://localhost:4200/api/form/b'
        
        const response = await axios.post(url, values)
        const result = response.data

        if (result.requestId && result.classifier) {
          this.setFormData({
            requestId: result.requestId,
            classifier: result.classifier,
            formType: formType,
            submittedAt: new Date().toISOString()
          })
        }

        notyf.success('Форма успешно отправлена!')
        return result

      } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || 'Неизвестная ошибка'
        notyf.error(`Ошибка: ${errorMessage}`)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})