<script setup lang="ts">
import type { Component } from 'vue';
import type {skill} from "~/stores/type/myself/skill";

const props = defineProps<{
  skills:skill[]
}>()
</script>

<template>
  <section :class="$style.section">
    <h2 :class="$style.sectionTitle">核心能力</h2>
    <div :class="$style.skillsGrid">
      <div
          v-for="skill in skills"
          :key="skill.title"
          :class="$style.skillCard"
      >
        <div :class="$style.skillIcon" :style="{ background: `color-mix(in srgb, ${skill.color}, transparent 85%)` }">
          <el-icon :size="32" :color="skill.color"><component :is="skill.icon" /></el-icon>
        </div>
        <h3 :class="$style.skillTitle">{{ skill.title }}</h3>
        <p :class="$style.skillDesc">{{ skill.description }}</p>
        <span :class="$style.skillLevel" :style="{ color: skill.color }">{{ skill.level }}</span>
      </div>
    </div>
  </section>
</template>

<style module>
.section {
  background: var(--el-bg-color-overlay);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}
.sectionTitle {
  font-size: 28px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--el-border-color-lighter);
}/* 能力卡片 */
.skillsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.skillCard {
  padding: 28px;
  background: var(--el-fill-color-light);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.skillCard:hover {
  background: var(--el-bg-color-overlay);
  border-color: var(--el-color-primary-light-8);
  transform: translateY(-4px);
  box-shadow: var(--el-box-shadow);
}
.skillIcon {
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skillTitle {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
}

.skillDesc {
  font-size: 14px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.skillLevel {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  background: var(--el-color-primary-light-9);
  border-radius: 12px;
  display: inline-block;
}

</style>