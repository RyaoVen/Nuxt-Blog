<script setup lang="ts">
import { Clock, View } from '@element-plus/icons-vue';
import type { Passage } from '~/stores/type/passages';

defineProps<{
  article: Passage;
}>();

defineEmits<{
  (e: 'click', id: number): void;
}>();
</script>

<template>
  <article :class="$style.articleItem" @click="$emit('click', article.id)">
    <div :class="$style.articleHeader">
      <span :class="$style.articleCategory">{{ article.category }}</span>
      <h2 :class="$style.articleTitle">{{ article.title }}</h2>
    </div>
    <p :class="$style.articleSummary">{{ article.summary }}</p>
    <div :class="$style.articleMeta">
      <div :class="$style.metaLeft">
        <span :class="$style.metaItem">
          <el-icon><Clock /></el-icon>
          {{ article.date }}
        </span>
        <span :class="$style.metaItem">
          <el-icon><View /></el-icon>
          {{ article.views }}
        </span>
      </div>
      <div :class="$style.articleTags">
        <span 
          v-for="tag in article.tags" 
          :key="tag"
          :class="$style.tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<style module>
.articleItem {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--el-border-color-lighter);
}

.articleItem:hover {
  transform: translateY(-2px);
  box-shadow: var(--el-box-shadow-light);
  border-color: var(--el-color-primary-light-5);
}

.articleHeader {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.articleCategory {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.articleTitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
  flex: 1;
}

.articleSummary {
  font-size: 14px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.articleMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--el-border-color-lighter);
  padding-top: 16px;
}

.metaLeft {
  display: flex;
  gap: 16px;
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.articleTags {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
