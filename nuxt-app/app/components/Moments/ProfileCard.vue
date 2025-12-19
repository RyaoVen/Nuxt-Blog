<script setup lang="ts">
defineProps<{
  totalMoments: number;
  totalLikes: number;
  totalComments: number;
}>();
</script>

<template>
  <div :class="$style.profileCard">
    <el-avatar :class="$style.avatar" :size="100" src="/Avatar.jpg"/>
    <h3 :class="$style.profileName">RyaoVen</h3>
    <p :class="$style.profileBio">全栈开发者 · 技术分享者</p>

    <div :class="$style.profileStats">
      <div :class="$style.statItem">
        <span :class="$style.statValue">{{ totalMoments }}</span>
        <span :class="$style.statLabel">动态</span>
      </div>
      <div :class="$style.statItem">
        <span :class="$style.statValue">{{ totalLikes }}</span>
        <span :class="$style.statLabel">获赞</span>
      </div>
      <div :class="$style.statItem">
        <span :class="$style.statValue">{{ totalComments }}</span>
        <span :class="$style.statLabel">评论</span>
      </div>
    </div>
  </div>
</template>

<style module>
.profileCard {
  background: var(--el-bg-color-overlay);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}

.avatar {
  margin-bottom: 16px;
  box-shadow: var(--el-box-shadow);
}

.profileName {
  font-size: 22px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
}

.profileBio {
  font-size: 14px;
  color: var(--el-text-color-regular);
  margin: 0 0 24px 0;
}

.profileStats {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.statValue {
  font-size: 24px;
  font-weight: 700;
  color: var(--el-color-primary);
}

.statLabel {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
