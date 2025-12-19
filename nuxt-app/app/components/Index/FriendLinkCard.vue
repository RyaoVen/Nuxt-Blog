<script setup lang="ts">
import { Link } from '@element-plus/icons-vue';
import type { friendLinkType } from "~/stores/type/index/friendLink";

defineProps<{
  friendLink: friendLinkType
}>();

const handleClick = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div :class="$style.linkBlock" @click="handleClick(friendLink.url)">
    <div :class="$style.iconWrapper">
      <el-avatar 
        v-if="friendLink.avatar" 
        :size="40" 
        :src="friendLink.avatar" 
        :class="$style.avatar" 
      />
      <el-icon v-else :size="24" :class="$style.linkIcon"><Link /></el-icon>
    </div>
    
    <div :class="$style.content">
      <h4 :class="$style.title">{{ friendLink.siteName }}</h4>
      <p :class="$style.subtitle" :title="friendLink.description">{{ friendLink.description || friendLink.url }}</p>
    </div>
  </div>
</template>

<style module>
.linkBlock {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--el-fill-color-light);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  flex: 1 0 280px;
  max-width: 360px;
  min-width: 280px;
  box-sizing: border-box;
}

.linkBlock:hover {
  background: var(--el-bg-color-overlay);
  transform: translateY(-2px);
  box-shadow: var(--el-box-shadow-light);
  border-color: var(--el-border-color-lighter);
}

.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--el-bg-color);
  border-radius: 12px;
  border: 1px solid var(--el-border-color-lighter);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.linkBlock:hover .iconWrapper {
  border-color: var(--el-color-primary-light-5);
  transform: scale(1.05);
}

.avatar {
  background: transparent;
}

.linkIcon {
  color: var(--el-text-color-secondary);
  transition: color 0.3s ease;
}

.linkBlock:hover .linkIcon {
  color: var(--el-color-primary);
}

.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.linkBlock:hover .title {
  color: var(--el-color-primary);
}

.subtitle {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}
</style>
