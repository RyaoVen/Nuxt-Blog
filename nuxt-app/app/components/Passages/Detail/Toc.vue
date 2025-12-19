<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import type { TocItem } from '~/stores/type/passages/detail';

const props = defineProps<{
  toc: TocItem[];
  activeSection: string;
  scrollPercent: number;
  scrollProgress: number;
}>();

const emit = defineEmits<{
  (e: 'click', id: string): void;
}>();

const isTocCollapsed = ref(false);

const progressDashOffset = computed(() => {
  const circumference = 2 * Math.PI * 18; // r=18
  return circumference - (props.scrollProgress * circumference);
});

const toggleToc = () => {
  isTocCollapsed.value = !isTocCollapsed.value;
};
</script>

<template>
  <aside :class="$style.tocSidebar">
    <div :class="$style.tocCard">
      <div :class="$style.tocHeader">
        <div :class="$style.tocTitleRow">
          <h3 :class="$style.tocTitle">目录</h3>
          <div :class="$style.tocControls">
            <div :class="$style.progressContainer" v-if="scrollPercent > 0">
              <svg width="24" height="24" viewBox="0 0 36 36" :class="$style.progressRing">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  :class="$style.progressRingBg"
                  stroke-width="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  :class="$style.progressRingCircle"
                  stroke-width="4"
                  stroke-dasharray="100.5"
                  :stroke-dashoffset="progressDashOffset"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span :class="$style.progressText">{{ scrollPercent }}%</span>
            </div>
            <button :class="$style.collapseBtn" @click="toggleToc" :title="isTocCollapsed ? '展开目录' : '收起目录'">
               <el-icon v-if="isTocCollapsed"><ArrowDown /></el-icon>
               <el-icon v-else><ArrowUp /></el-icon>
            </button>
          </div>
        </div>
      </div>
      <nav :class="[$style.tocNav, isTocCollapsed ? $style.collapsed : '']">
        <a
          v-for="item in toc"
          :key="item.id"
          :class="[$style.tocItem, $style[`level${item.level}`], activeSection === item.id ? $style.active : '']"
          :href="`#${item.id}`"
          @click.prevent="$emit('click', item.id)"
        >
          {{ item.title }}
        </a>
      </nav>
    </div>
  </aside>
</template>

<style module>
.tocSidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.tocCard {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--el-border-color-lighter);
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--el-border-color) transparent;
}

.tocHeader {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.tocTitleRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tocTitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
}

.tocControls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progressContainer {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progressRing {
  transform-origin: center;
}

.progressRingBg {
  stroke: var(--el-border-color-lighter);
}

.progressRingCircle {
  stroke: var(--el-color-primary);
  transition: stroke-dashoffset 0.1s;
}

.progressText {
  position: absolute;
  font-size: 8px;
  font-weight: 600;
  color: var(--el-text-color-secondary);
}

.collapseBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--el-text-color-secondary);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.collapseBtn:hover {
  background: var(--el-fill-color);
  color: var(--el-color-primary);
}

.tocNav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
  opacity: 1;
}

.tocNav.collapsed {
  max-height: 0;
  opacity: 0;
  margin: 0;
}

.tocItem {
  text-decoration: none;
  color: var(--el-text-color-regular);
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  border-left: 2px solid transparent;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tocItem:hover {
  background: var(--el-fill-color);
  color: var(--el-color-primary);
}

.tocItem.active {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-left-color: var(--el-color-primary);
  font-weight: 500;
}

.level1 { margin-left: 0; font-weight: 500; }
.level2 { margin-left: 12px; font-size: 13px; }
.level3 { margin-left: 24px; font-size: 13px; color: var(--el-text-color-secondary); }

@media (max-width: 1024px) {
  .tocSidebar {
    display: none;
  }
}
</style>
