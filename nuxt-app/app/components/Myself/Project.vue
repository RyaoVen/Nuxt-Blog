<script setup lang="ts">
import type { project } from "~/stores/type/myself/project"
const props = defineProps<{
  currentProjects: project[];
}>();
</script>

<template>
  <section :class="$style.section">
    <h2 :class="$style.sectionTitle">正在做的项目</h2>
    <div :class="$style.projectsList">
      <div
          v-for="project in currentProjects"
          :key="project.name"
          :class="$style.projectCard"
      >
        <div :class="$style.projectHeader">
          <h3 :class="$style.projectName">{{ project.name }}</h3>
          <span :class="$style.projectStatus" :style="{ color: project.color }">
                {{ project.status }}
              </span>
        </div>
        <p :class="$style.projectDesc">{{ project.description }}</p>
        <div :class="$style.projectTech">
              <span v-for="tech in project.tech" :key="tech" :class="$style.techTag">
                {{ tech }}
              </span>
        </div>
        <div :class="$style.projectProgress">
          <div :class="$style.progressInfo">
            <span :class="$style.progressLabel">进度</span>
            <span :class="$style.progressValue">{{ project.progress }}%</span>
          </div>
          <div :class="$style.progressBar">
            <div
                :class="$style.progressFill"
                :style="{ width: `${project.progress}%`, background: project.color }"
            ></div>
          </div>
        </div>
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
/* 项目卡片 */
.projectsList {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.projectCard {
  padding: 28px;
  background: var(--el-fill-color-light);
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.projectCard:hover {
  background: var(--el-bg-color-overlay);
  border-color: var(--el-color-primary-light-8);
  box-shadow: var(--el-box-shadow);
}

.projectHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.projectName {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
}

.projectStatus {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  background: var(--el-color-primary-light-9);
  border-radius: 12px;
}

.projectDesc {
  font-size: 15px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.projectTech {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.techTag {
  font-size: 12px;
  color: var(--el-text-color-regular);
  padding: 4px 12px;
  background: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color);
  border-radius: 12px;
}

.projectProgress {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progressInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progressLabel {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.progressValue {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.progressBar {
  height: 8px;
  background: var(--el-fill-color-darker);
  border-radius: 4px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}
</style>