<script setup lang="ts">
import { Calendar, Clock, View } from '@element-plus/icons-vue';
import type { ArticleDetail } from '~/stores/type/passages/detail';

defineProps<{
  article: ArticleDetail;
}>();
</script>

<template>
  <header :class="$style.articleHeader">
    <div :class="$style.categoryBadge">{{ article.category }}</div>
    <h1 :class="$style.articleTitle">{{ article.title }}</h1>
    <p :class="$style.articleSubtitle">{{ article.subtitle }}</p>
    
    <div :class="$style.articleMeta">
      <div :class="$style.authorInfo">
        <el-avatar :size="48" :src="article.author.avatar" />
        <div :class="$style.authorDetails">
          <span :class="$style.authorName">{{ article.author.name }}</span>
          <span :class="$style.authorBio">{{ article.author.bio }}</span>
        </div>
      </div>
      
      <div :class="$style.metaInfo">
        <span :class="$style.metaItem">
          <el-icon><Calendar /></el-icon>
          {{ article.date }}
        </span>
        <span :class="$style.metaItem">
          <el-icon><Clock /></el-icon>
          {{ article.readTime }}
        </span>
        <span :class="$style.metaItem">
          <el-icon><View /></el-icon>
          {{ article.views }}
        </span>
      </div>
    </div>

    <div :class="$style.articleTags">
      <span v-for="tag in article.tags" :key="tag" :class="$style.tag">
        {{ tag }}
      </span>
    </div>
  </header>
</template>

<style module>
.articleHeader {
  margin-bottom: 40px;
  text-align: center;
}

.categoryBadge {
  display: inline-block;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.articleTitle {
  font-size: 42px;
  font-weight: 800;
  color: var(--el-text-color-primary);
  margin: 0 0 16px 0;
  line-height: 1.3;
  letter-spacing: -1px;
}

.articleSubtitle {
  font-size: 20px;
  color: var(--el-text-color-secondary);
  margin: 0 0 32px 0;
  font-weight: 400;
  line-height: 1.6;
}

.articleMeta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.authorInfo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}

.authorDetails {
  display: flex;
  flex-direction: column;
}

.authorName {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.authorBio {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.metaInfo {
  display: flex;
  gap: 24px;
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.articleTags {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tag {
  background: var(--el-fill-color);
  color: var(--el-text-color-regular);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  transition: all 0.3s;
}

.tag:hover {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

@media (max-width: 768px) {
  .articleTitle {
    font-size: 32px;
  }
  
  .articleMeta {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
