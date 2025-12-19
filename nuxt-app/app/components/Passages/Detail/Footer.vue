<script setup lang="ts">
import { Share, Star, Warning } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

defineProps<{
  updateDate: string;
}>();

const handleShare = () => {
  navigator.clipboard.writeText(window.location.href);
  ElMessage.success('链接已复制到剪贴板');
};

const handleLike = () => {
  ElMessage.success('感谢您的点赞！');
};
</script>

<template>
  <div :class="$style.articleFooter">
    <div :class="$style.lastUpdate">
      <el-icon><Warning /></el-icon>
      最后更新于 {{ updateDate }}
    </div>
    
    <div :class="$style.actionButtons">
      <el-button circle size="large" @click="handleLike">
        <el-icon><Star /></el-icon>
      </el-button>
      <el-button circle size="large" @click="handleShare">
        <el-icon><Share /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<style module>
.articleFooter {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--el-border-color-lighter);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.lastUpdate {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.actionButtons {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .articleFooter {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
