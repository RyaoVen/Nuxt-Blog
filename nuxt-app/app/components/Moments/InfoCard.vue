<script setup lang="ts">
// Static content for now
</script>

<template>
  <div :class="$style.infoCard">
    <h4 :class="$style.infoTitle">关于我</h4>
    <div :class="$style.infoList">
      <div :class="$style.infoItem">
        <span :class="$style.infoLabel">职业</span>
        <span :class="$style.infoValue">全栈工程师</span>
      </div>
      <div :class="$style.infoItem">
        <span :class="$style.infoLabel">技能</span>
        <span :class="$style.infoValue">Vue / React / Node.js</span>
      </div>
      <div :class="$style.infoItem">
        <span :class="$style.infoLabel">爱好</span>
        <span :class="$style.infoValue">编程 / 摄影 / 音乐</span>
      </div>
    </div>
  </div>
</template>

<style module>
.infoCard {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}

.infoTitle {
  font-size: 16px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 16px 0;
}

.infoList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.infoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--el-fill-color-light);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.infoLabel {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.infoValue {
  font-size: 13px;
  color: var(--el-text-color-regular);
  font-weight: 500;
}
</style>
