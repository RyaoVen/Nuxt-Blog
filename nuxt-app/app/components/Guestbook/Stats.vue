<script setup lang="ts">
import { ChatDotRound, Star } from '@element-plus/icons-vue';

defineProps<{
  totalMessages: number;
  totalLikes: number;
}>();
</script>

<template>
  <div :class="$style.statsCards">
    <div :class="$style.statCard">
      <div :class="$style.statIcon" style="background: rgba(52, 152, 219, 0.1);">
        <el-icon :size="24" color="#3498db"><ChatDotRound /></el-icon>
      </div>
      <div :class="$style.statContent">
        <span :class="$style.statValue">{{ totalMessages }}</span>
        <span :class="$style.statLabel">留言总数</span>
      </div>
    </div>

    <div :class="$style.statCard">
      <div :class="$style.statIcon" style="background: rgba(231, 76, 60, 0.1);">
        <el-icon :size="24" color="#e74c3c"><Star /></el-icon>
      </div>
      <div :class="$style.statContent">
        <span :class="$style.statValue">{{ totalLikes }}</span>
        <span :class="$style.statLabel">获赞总数</span>
      </div>
    </div>
  </div>
</template>

<style module>
.statsCards {
  max-width: 1200px;
  margin: 0 auto 48px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.statCard {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}

.statCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--el-box-shadow);
}

.statIcon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.statContent {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.statValue {
  font-size: 32px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  line-height: 1;
}

.statLabel {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

@media (max-width: 768px) {
  .statsCards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
