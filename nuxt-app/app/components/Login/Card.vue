<script setup lang="ts">
import type { LoginForm } from '~/stores/type/login';

const props = defineProps<{
  isRegister: boolean;
  loading: boolean;
  modelValue: LoginForm;
}>();

const emit = defineEmits<{
  (e: 'update:isRegister', value: boolean): void;
  (e: 'update:modelValue', value: LoginForm): void;
  (e: 'submit'): void;
}>();

const toggleMode = () => {
  emit('update:isRegister', !props.isRegister);
};

const updateForm = (key: keyof LoginForm, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.header">
      <h1 :class="$style.title">{{ isRegister ? '注册' : '登录' }}</h1>
      <p :class="$style.subtitle">{{ isRegister ? '创建你的账号' : '欢迎回来' }}</p>
    </div>
    <div :class="$style.form">
      <template v-if="!isRegister">
        <UIInput 
          :model-value="modelValue.username" 
          @update:model-value="updateForm('username', $event)"
          label="用户名" 
        />
        <UIInput 
          :model-value="modelValue.password" 
          @update:model-value="updateForm('password', $event)"
          type="password" 
          label="密码" 
        />
        <UIButton :loading="loading" block @click="$emit('submit')">登录</UIButton>
      </template>
      <template v-else>
        <UIInput 
          :model-value="modelValue.username" 
          @update:model-value="updateForm('username', $event)"
          label="用户名" 
        />
        <UIInput 
          :model-value="modelValue.email" 
          @update:model-value="updateForm('email', $event)"
          label="邮箱" 
        />
        <UIInput 
          :model-value="modelValue.password" 
          @update:model-value="updateForm('password', $event)"
          type="password" 
          label="密码" 
        />
        <UIInput 
          :model-value="modelValue.confirm" 
          @update:model-value="updateForm('confirm', $event)"
          type="password" 
          label="确认密码" 
        />
        <UIButton :loading="loading" block @click="$emit('submit')">注册</UIButton>
      </template>
    </div>
    <div :class="$style.footer">
      <span>{{ isRegister ? '已有账号？' : '没有账号？' }}</span>
      <a href="#" :class="$style.link" @click.prevent="toggleMode">{{ isRegister ? '登录' : '注册' }}</a>
    </div>
  </div>
</template>

<style module>
.card {
  width: 420px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 1;
  transition: transform 0.3s ease;
}

.dark .card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}

:global(.dark) .card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}

.card:hover {
  transform: translateY(-5px);
}

.header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: var(--el-text-color-primary);
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

:global(.dark) .title {
  color: #ffffff;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  transition: color 0.3s ease;
}

:global(.dark) .subtitle {
  color: #a3a6ad;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.footer {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
.link {
  color: var(--el-color-primary);
  text-decoration: none;
}
@media (max-width: 480px) {
  .card {
    width: 100%;
    max-width: 420px;
  }
}
</style>
