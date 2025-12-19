<script setup lang="ts">
import { Star, View } from '@element-plus/icons-vue';
import type { HotPassage } from '~/stores/type/passages';

defineProps<{
  articles: HotPassage[];
}>();

defineEmits<{
  (e: 'click', id: number): void;
}>();
</script>

<template>
  <div :class="$style.sidebarCard">
    <h3 :class="$style.sidebarTitle">
      <el-icon><Star /></el-icon>
      热门
    </h3>
    <div :class="$style.hotList">
      <div 
        v-for="(article, index) in articles" 
        :key="article.id"
        :class="$style.hotItem"
        @click="$emit('click', article.id)"
      >
        <span :class="$style.hotRank">
          {{ index + 1 }}
        </span>
        <div :class="$style.hotContent">
          <p :class="$style.hotTitle">{{ article.title }}</p>
          <span :class="$style.hotViews">
            <el-icon><View /></el-icon>
            {{ article.views }}
          </span>
        </div>
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

.hotList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hotItem {
  display: flex;
  gap: 12px;
  cursor: pointer;
}

.hotItem:hover .hotTitle {
  color: var(--el-color-primary);
}

.hotRank {
  font-size: 18px;
  font-weight: 700;
  color: var(--el-text-color-placeholder);
  font-style: italic;
  line-height: 1;
}

.hotItem:nth-child(1) .hotRank { color: #ff6b6b; }
.hotItem:nth-child(2) .hotRank { color: #feca57; }
.hotItem:nth-child(3) .hotRank { color: #48dbfb; }

.hotContent {
  flex: 1;
  min-width: 0;
}

.hotTitle {
  font-size: 14px;
  color: var(--el-text-color-regular);
  margin: 0 0 4px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s;
}

.hotViews {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
