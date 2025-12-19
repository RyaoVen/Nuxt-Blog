<script setup lang="ts">

import {ref} from "vue";
import type {articleType} from "~/stores/type/index/article";

const props = defineProps<{
  article:articleType
}>();
type TagType = 'success' | 'warning' | 'info' | 'danger' | 'primary';
interface TagItem {
  tagName: string;
  type: TagType; // 普通字符串类型
}
const hoveredTag = ref<string | null>(null);

const tagList = ref<TagItem[]>(
    props.article.tags.map(tag => reactive({ tagName: tag, type: 'info' as const }))
);


</script>

<template>
  <div :class="$style.articleCard" @click="navigateTo(`/passages/${article.id}`)">
    <div :class="$style.top">
      <div :class="$style.topLeft">
        <div>
          {{article.date}}
        </div>
        <span :class="$style.sp">
          |
        </span>
        <div>
          {{article.category}}
        </div>
      </div>
      <div :class="$style.topRight">
        <div>
          {{article.author}}
        </div>
      </div>
    </div>


    <div :class="$style.title">
      {{article.title}}
    </div>
    <div :class="$style.summary">
      {{article.summary}}
    </div>
    <el-tag
        :class="$style.tag"
    v-for="tag in tagList"
    :key="tag.tagName"
    round
    effect="light"
        :type="tag.type"
    size="small"
    style=" margin: 0 2px;"
        @mouseover="tag.type = 'primary'"
        @mouseleave="tag.type = 'info'"
    >
      {{tag.tagName}}
    </el-tag>
  </div>
</template>

<style module>
.tag {
  opacity: 0;
  transition: all 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(10px);
  margin: 0 4px 4px 0; /* 改用 margin 控制间距，避免行内 style */
  font-size: 0.85em;
  letter-spacing: 0.5px;
}

.articleCard:hover .tag {
  opacity: 1;
  transform: translateY(0);
}

.articleCard {
  width: 600px;
  max-height: 160px;
  border: 1px solid transparent; /* 更干净的初始状态 */
  border-radius: 8px; /* 增加圆角，更现代 */
  padding: 16px;
  background-color: var(--el-bg-color-overlay); /* 显式背景，避免透明问题 */
  transition: all 0.3s ease;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden; /* 防止 hover 展开时布局跳动 */
}

.articleCard:hover {
  border-color: var(--el-border-color); /* 使用 Element Plus 默认边框色 */
  box-shadow: var(--el-box-shadow-light); /* 稍微柔和但有层次的阴影 */
  cursor: pointer;
  max-height: 300px;
}

.top {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: var(--el-text-color-secondary); /* 次要文字色，更柔和 */
  margin-bottom: 8px;
}

.topLeft,
.topRight {
  display: flex;
  align-items: center; /* 垂直居中 */
}


.sp {
  margin: 0 6px;
  color: var(--el-text-color-placeholder); /* 分隔符更淡 */
}

.title {
  font-size: 1.4em; /* 稍微收敛一点，避免过大 */
  font-weight: 600; /* 使用 semi-bold 更优雅 */
  margin: 6px 0;
  line-height: 1.4;
  color: var(--el-text-color-primary); /* 默认标题色 */
  transition: color 0.3s ease;
}

.articleCard:hover .title {
  color: var(--el-color-primary);
}

.summary {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* hover 前显示两行摘要，信息量更足 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95em;
  line-height: 1.5;
  color: var(--el-text-color-regular);
  margin: 0 8px;
}
</style>