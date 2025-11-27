<script setup lang="ts">
defineProps<{
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  coverImage: string;
}>();
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.coverImage" :style="{ backgroundImage: `url(${coverImage})` }">
      <div :class="$style.category">{{ category }}</div>
    </div>
    <div :class="$style.content">
      <h3 :class="$style.title">{{ title }}</h3>
      <div :class="$style.meta">
        <span :class="$style.author">{{ author }}</span>
        <span :class="$style.date">{{ date }}</span>
      </div>
      <p :class="$style.summary">{{ summary }}</p>
      <div :class="$style.tags">
        <el-tag v-for="tag in tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
      </div>
    </div>
  </div>
</template>

<style module>
.card {
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: rgba(52, 152, 219, 0.2);
}

.coverImage {
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  transition: all 0.4s ease;
}

.card:hover .coverImage {
  transform: scale(1.05);
}

.category {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #3498db;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content {
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.author {
  font-weight: 500;
}

.date {
  color: #999;
}

.summary {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tags :global(.el-tag) {
  border: 1px solid #e8e8e8;
  background: #f8f9fa;
  color: #666;
  font-size: 12px;
}
</style>
