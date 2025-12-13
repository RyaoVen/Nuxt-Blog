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
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
/* 项目卡片 */
.projectsList {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.projectCard {
  padding: 28px;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.projectCard:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
  color: #1a1a1a;
  margin: 0;
}

.projectStatus {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 12px;
}

.projectDesc {
  font-size: 15px;
  color: #666;
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
  color: #666;
  padding: 4px 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
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
  color: #999;
}

.progressValue {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.progressBar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}
</style>