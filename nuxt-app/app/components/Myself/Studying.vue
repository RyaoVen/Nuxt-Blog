<script setup lang="ts">
import type {LearningGoal} from "~/stores/type/myself/LearningGoal";

const props = defineProps<{
  learningGoals: LearningGoal[];
}>()
</script>

<template>
  <section :class="$style.sectionHalf">
    <h2 :class="$style.sectionTitle">Studying</h2>
    <div :class="$style.goalsGrid">
      <div
          v-for="goal in learningGoals"
          :key="goal.name"
          :class="$style.goalCard"
      >
        <div :class="$style.goalHeader">
          <span :class="$style.goalName">{{ goal.name }}</span>
          <span :class="$style.goalTarget">目标: {{ goal.target }}</span>
        </div>
        <div :class="$style.circularProgressWrapper">
          <el-progress
              type="circle"
              :percentage="goal.progress"
              :width="100"
              :stroke-width="8"
              :color="goal.color"
              :show-text="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.sectionTitle {
  font-size: 28px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--el-border-color-lighter);
}
.goalsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.goalCard {
  padding: 20px;
  background: var(--el-fill-color-light);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.goalCard:hover {
  background: var(--el-bg-color-overlay);
  border-color: var(--el-color-primary-light-8);
  box-shadow: var(--el-box-shadow);
}

.circularProgressWrapper {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.goalHeader {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.goalName {
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.goalTarget {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.sectionHalf{
  background: var(--el-bg-color-overlay);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  width: 47%;
  transition: all 0.3s ease;
}
</style>