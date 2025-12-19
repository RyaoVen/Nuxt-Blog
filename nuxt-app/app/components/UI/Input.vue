<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  type?: string;
  placeholder?: string;
  label?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isFocused = ref(false);

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const inputType = computed(() => props.type || 'text');
const showLabel = computed(() => isFocused.value || props.modelValue);

</script>

<template>
  <div :class="[$style.inputWrapper, isFocused && $style.focused, modelValue && $style.hasValue]">
    <input
      :type="inputType"
      :value="modelValue"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="$style.input"
      placeholder=" "
    />
    <label :class="$style.label">{{ label || placeholder }}</label>
    <div :class="$style.bar"></div>
  </div>
</template>

<style module>
.inputWrapper {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
  border: none;
  border-bottom: 1px solid var(--el-border-color);
  background: transparent;
  outline: none;
  transition: all 0.3s ease;
}

/* Dark mode text color adaptation */
:global(.dark) .input {
  color: #e5eaf3;
  border-bottom-color: #4c4d4f;
}

.label {
  position: absolute;
  top: 12px;
  left: 0;
  font-size: 16px;
  color: var(--el-text-color-secondary);
  pointer-events: none;
  transition: all 0.3s ease;
}

:global(.dark) .label {
  color: #a3a6ad;
}

.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  top: -10px;
  font-size: 12px;
  color: var(--el-color-primary);
}

.bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--el-color-primary);
  transition: width 0.3s ease;
}

.input:focus ~ .bar {
  width: 100%;
}

.input:focus {
  border-bottom-color: transparent;
}
</style>
