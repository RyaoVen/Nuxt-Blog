<script setup lang="ts">
import { ref } from 'vue'
import type { LoginForm } from '~/stores/type/login'
import LoginBackground from '~/components/Login/Background.vue'
import LoginSlogan from '~/components/Login/Slogan.vue'
import LoginCard from '~/components/Login/Card.vue'

const isRegister = ref(false)
const loading = ref(false)

const form = ref<LoginForm>({
  username: '',
  email: '',
  password: '',
  confirm: ''
})

const reset = () => {
  form.value = {
    username: '',
    email: '',
    password: '',
    confirm: ''
  }
}

const submit = async () => {
  if (!isRegister.value) {
    if (!form.value.username || !form.value.password) return
    loading.value = true
    setTimeout(() => {
      loading.value = false
      // @ts-ignore
      navigateTo('/')
    }, 600)
  } else {
    if (!form.value.username || !form.value.email || !form.value.password || !form.value.confirm) return
    if (form.value.password !== form.value.confirm) return
    loading.value = true
    setTimeout(() => {
      loading.value = false
      isRegister.value = false
      reset()
    }, 800)
  }
}
</script>

<template>
  <div :class="$style.container">
    <LoginBackground />
    <LoginSlogan />
    <LoginCard
      v-model="form"
      v-model:isRegister="isRegister"
      :loading="loading"
      @submit="submit"
    />
  </div>
  <el-divider/>
</template>

<style module>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--el-bg-color);
  padding: 60px 16px;
  position: relative;
  overflow: hidden;
}
</style>
