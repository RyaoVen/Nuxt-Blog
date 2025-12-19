<script setup lang="ts">
defineProps<{
  loading?: boolean;
  block?: boolean;
}>();
</script>

<template>
  <button :class="[$style.button, block && $style.block, loading && $style.loading]" :disabled="loading">
    <span v-if="loading" :class="$style.spinner"></span>
    <span :class="$style.content" v-else>
      <slot />
    </span>
  </button>
</template>

<style module>
.button {
  position: relative;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: var(--el-color-primary);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(var(--el-color-primary-rgb), 0.3);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
  z-index: -1;
}

.button:hover:not(:disabled)::after {
  width: 300px;
  height: 300px;
}

.block {
  width: 100%;
}

.button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--el-color-primary-rgb), 0.5);
}

.button:active:not(:disabled) {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 2px 10px rgba(var(--el-color-primary-rgb), 0.3);
}

.button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Ripple effect could be added, but simple CSS transition is modern enough */
</style>
