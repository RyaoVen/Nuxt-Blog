<template>
  <div :class="$style.card" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- 封面图区域 -->
    <div :class="$style.cover">
      <img :src="coverImage || defaultCover" :alt="title" :class="$style.img" />
      <div :class="$style.gradientOverlay"></div>
    </div>

    <!-- 右上角旋转圆环装饰 -->
    <div :class="$style.orbitContainer">
      <div :class="$style.orbit">
        <span
            v-for="(label, i) in orbitLabels"
            :key="i"
            :class="$style.orbitItem"
            :style="{
    transform: `translateX(-50%) rotate(${(i * 360) / orbitLabels.length}deg)`
  }"
        >
          {{ label }}
        </span>
      </div>
    </div>

    <!-- 内容区 -->
    <div :class="$style.content">
      <div :class="$style.title">{{ title }}</div>
      <div :class="$style.meta">
        <span :class="$style.author">{{ author }}</span>
        <span :class="$style.views">• {{ views || 0 }} 阅读</span>
      </div>
      <div :class="$style.tags">
        <el-tag
            v-for="tag in tags"
            :key="tag"
            size="small"
            type="info"
            effect="plain"
            style="margin-right: 4px; font-size: 0.8em;"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  author: string;
  coverImage?: string; // 可选
  tags: string[];
  views?: number;
}>();

// 悬停状态（用于未来扩展，如延迟动画）
const isHovered = ref(false);

// 旋转标签（可自定义）
const orbitLabels = ['热','门','文','章','很','值','得','阅','读'];

// 默认封面（防止图片加载失败）
const defaultCover = 'https://via.placeholder.com/320x200/e0e0e0/999999?text=No+Cover';
</script>

<style module>
/* 卡片整体 */
.card {
  width: 320px;
  border-radius: 16px;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background: #fff;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1;
}

/* 封面图 */
.cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  z-index: 1;
}

.img {
  opacity: 0.90;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 16px 16px 0 0;
}

.card:hover .img {
  transform: scale(1.05);
}

.gradientOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  pointer-events: none;
}

/* === 右上角旋转圆环装饰 === */
.orbitContainer {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  pointer-events: none; /* 不阻挡点击 */
  z-index: -1;
}

.orbit {
  position: relative;
  width: 100%;
  height: 100%;
  animation: rotate 20s linear infinite;
  transform-origin: center;
}

.orbitItem {
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: 0 50px; /* 旋转半径 = 40px */
  z-index: -1;
  font-size: 12px;
  font-weight: bold;
  color: #303133;
  opacity: 1;
  white-space: nowrap;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

/* 内容区 */
.content {
  padding: 16px;
  color: #333;
}

.title {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 8px;
  line-height: 1.4;
  color: #2c3e50;
}

.meta {
  display: flex;
  align-items: center;
  font-size: 0.85em;
  color: #7f8c8d;
  margin-bottom: 8px;
}

.author {
  font-weight: 500;
}

.views {
  margin-left: 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>