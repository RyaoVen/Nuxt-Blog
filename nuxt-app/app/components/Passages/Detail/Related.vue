<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import type { RelatedArticle } from '~/stores/type/passages/detail';

defineProps<{
  articles: RelatedArticle[];
}>();

defineEmits<{
  (e: 'click', id: number): void;
}>();
</script>

<template>
  <div :class="$style.relatedArticles">
    <h3 :class="$style.relatedTitle">相关推荐</h3>
    <div :class="$style.relatedList">
      <a
        v-for="article in articles"
        :key="article.id"
        :class="$style.relatedCard"
        @click.prevent="$emit('click', article.id)"
        href="#"
      >
        <span :class="$style.relatedCategory">{{ article.category }}</span>
        <h4 :class="$style.relatedArticleTitle">{{ article.title }}</h4>
        <div :class="$style.relatedArrow">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </a>
    </div>
  </div>
</template>

<style module>
.relatedArticles {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.relatedTitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 24px 0;
}

.relatedList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.relatedCard {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.relatedCard:hover {
  border-color: var(--el-color-primary);
  transform: translateY(-4px);
  box-shadow: var(--el-box-shadow-light);
}

.relatedCategory {
  font-size: 12px;
  color: var(--el-color-primary);
  margin-bottom: 8px;
  font-weight: 600;
}

.relatedArticleTitle {
  font-size: 16px;
  color: var(--el-text-color-primary);
  margin: 0;
  line-height: 1.5;
  flex: 1;
}

.relatedArrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: var(--el-text-color-placeholder);
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(-10px);
}

.relatedCard:hover .relatedArrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--el-color-primary);
}
</style>
