<template>
  <div class="login-page">
    <base-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <base-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" ref="inputRef" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <base-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal" />
      </div>
    </base-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import { useRouter } from 'vue-router'
import { InputRules } from '@/types/components/form'
import { useStore } from '@/store'

export default defineComponent({
  name: 'LoginPage',
  components: { BaseForm, BaseInput },
  setup() {
    const router = useRouter()

    const store = useStore()

    const emailVal = ref('')
    const emailRules: InputRules = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: InputRules = [{ type: 'required', message: '密码不能为空' }]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        store
          .dispatch('auth/login', {
            email: emailVal.value,
            password: passwordVal.value
          })
          .then(() => {
            router.push({ name: 'app.home' })
          })
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped></style>
