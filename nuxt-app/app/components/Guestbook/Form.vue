<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue: {
    content: string;
  };
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'submit'): void;
}>();

const content = computed({
  get: () => props.modelValue.content,
  set: (val) => emit('update:modelValue', { ...props.modelValue, content: val })
});
</script>

<template>
  <div :class="$style.messageForm">
    <h3 :class="$style.formTitle">发表留言</h3>
    
    <div :class="$style.formFields">
      <el-input
        v-model="content"
        type="textarea"
        :rows="6"
        placeholder="写下你想说的话..."
        :class="$style.formTextarea"
      />

      <div :class="$style.formActions">
        <el-button size="large" @click="$emit('submit')" plain>
          发表留言
        </el-button>
      </div>
    </div>
  </div>
</template>

<style module>
.messageForm {
  background: var(--el-bg-color-overlay);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}

.formTitle {
  font-size: 24px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 28px 0;
}

.formFields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formTextarea :global(.el-textarea__inner) {
  border-radius: 12px;
  border: 1px solid var(--el-border-color);
  padding: 16px;
  font-size: 15px;
  line-height: 1.6;
  transition: all 0.3s ease;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  color: var(--el-text-color-regular);
}

.formTextarea :global(.el-textarea__inner):focus {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 3px var(--el-color-primary-light-9);
}

.formActions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .messageForm {
    padding: 24px;
  }
}
</style>
