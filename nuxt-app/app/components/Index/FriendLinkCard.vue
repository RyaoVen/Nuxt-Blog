<script setup lang="ts">
import type {friendLinkType} from "~/stores/type/index/friendLink";

defineProps<{
  friendLink:friendLinkType
}>();

const handleClick = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div :class="$style.card" @click="handleClick(friendLink.url)">
    <div :class="$style.header">
      <el-avatar :size="50" :src="friendLink.avatar" :class="$style.avatar" />
      <div :class="$style.info">
        <h4 :class="$style.siteName">{{ friendLink.siteName }}</h4>
        <p :class="$style.ownerName">{{ friendLink.ownerName }}</p>
      </div>
    </div>
    <p :class="$style.description">{{ friendLink.description }}</p>
    <div :class="$style.screenshot" :style="{ backgroundImage: `url(${friendLink.screenshot})` }"></div>
  </div>
</template>

<style module>
.card {
  width: 280px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
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

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.siteName {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.2px;
}

.ownerName {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.screenshot {
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.card:hover .screenshot {
  transform: scale(1.05);
}
</style>
