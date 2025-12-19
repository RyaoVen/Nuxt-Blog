<script setup lang="ts">
import type { Category } from '~/stores/type/passages';

defineProps<{
  categories: Category[];
}>();
</script>

<template>
  <div :class="$style.sidebarCard">
    <h3 :class="$style.sidebarTitle">分类</h3>
    <div :class="$style.categoryList">
      <div 
        v-for="category in categories" 
        :key="category.name"
        :class="$style.categoryItem"
      >
        <span :class="$style.categoryName">{{ category.name }}</span>
        <span :class="$style.categoryCount">{{ category.count }}</span>
      </div>
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

.categoryList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.categoryItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.categoryItem:hover {
  background: var(--el-fill-color);
  color: var(--el-color-primary);
}

.categoryName {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.categoryCount {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-darker);
  padding: 2px 8px;
  border-radius: 10px;
}
</style>
