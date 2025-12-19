<script setup lang="ts">
import type { Tag } from '~/stores/type/passages';

defineProps<{
  tags: Tag[];
}>();
</script>

<template>
  <div :class="$style.sidebarCard">
    <h3 :class="$style.sidebarTitle">标签云</h3>
    <div :class="$style.tagCloud">
      <span 
        v-for="tag in tags" 
        :key="tag.name"
        :class="$style.tagItem"
      >
        {{ tag.name }}
        <span :class="$style.tagCount">{{ tag.count }}</span>
      </span>
    </div>
  </div>
</template>

<style module>
.sidebarCard {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid var(--el-border-color-lighter);
}

.sidebarTitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tagCloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tagItem {
  font-size: 13px;
  color: var(--el-text-color-regular);
  background: var(--el-fill-color);
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tagItem:hover {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.tagCount {
  font-size: 12px;
  opacity: 0.6;
}
</style>
