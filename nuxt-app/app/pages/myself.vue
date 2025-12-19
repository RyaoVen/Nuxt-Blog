<script setup lang="ts">
import {ref, computed, type Component} from 'vue';
import { TrendCharts, Trophy, Cpu, Document } from '@element-plus/icons-vue';
import type {techStack} from "~/stores/type/myself/techStack";
import type {LearningGoal} from "~/stores/type/myself/LearningGoal";
import type {project} from "~/stores/type/myself/project";
import type {skill} from "~/stores/type/myself/skill";
import type {Heatmap} from "~/stores/type/myself/heatmap";
import type {MyselfHeaderData} from "~/stores/type/myself/header";
// 技术栈数据
const techStack = ref<techStack[]>([
  {
    title: "前端：",
    content: [
      { name: 'Vue.js',  type: 'success' },
      { name: 'React.js', type: 'info' },
      { name: 'TypeScript', type: 'warning' },
      { name: 'Nuxt.js' },
      { name: 'Tailwind CSS' }
    ]
  },
  {
    title: "后端：",
    content: [
      { name: 'Node.js', type: 'success' },
      { name: 'Express', type: 'danger' },
      { name: 'NestJS' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' }
    ]
  },
  {
    title: "工具：",
    content: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Webpack' },
      { name: 'Vite' },
      { name: 'VS Code' }
    ]
  }
]);

// 当前项目
const currentProjects = ref<project[]>([
  {
    name: '个人博客系统',
    description: '基于 Nuxt 3 + Element Plus 的现代化博客平台',
    status: '进行中',
    progress: 75,
    tech: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Element Plus'],
    color: 'var(--el-color-primary)'
  },
  {
    name: '微前端架构实践',
    description: '使用 qiankun 框架构建大型企业级应用',
    status: '规划中',
    progress: 30,
    tech: ['qiankun', 'Vue', 'React', 'Webpack'],
    color: 'var(--el-color-primary-light-3)'
  },
  {
    name: '全栈电商平台',
    description: '完整的电商解决方案，包含前后端和管理系统',
    status: '进行中',
    progress: 60,
    tech: ['Vue 3', 'Node.js', 'MongoDB', 'Redis'],
    color: 'var(--el-color-success)'
  }
]);

// 学习目标
const learningGoals = ref<LearningGoal[]>([
  { name: 'Web3 开发', progress: 45, target: '2024年12月', color: 'var(--el-color-danger)' },
  { name: 'Rust 编程', progress: 30, target: '2025年3月', color: 'var(--el-color-warning)' },
  { name: '系统设计', progress: 65, target: '2024年11月', color: 'var(--el-color-primary)' },
  { name: 'AI/ML 基础', progress: 20, target: '2025年6月', color: 'var(--el-color-primary-light-3)' }
]);



const skills = ref<skill[]>([
  {
    title: '前端开发',
    icon: Cpu,
    description: '精通现代前端框架和工具链',
    level: '高级',
    color: 'var(--el-color-primary)'
  },
  {
    title: '后端开发',
    icon: Cpu,
    description: '熟悉 Node.js 生态和数据库设计',
    level: '中级',
    color: 'var(--el-color-success)'
  },
  {
    title: '系统架构',
    icon: TrendCharts,
    description: '具备大型项目架构设计能力',
    level: '中级',
    color: 'var(--el-color-primary-light-3)'
  },
  {
    title: '技术写作',
    icon: Document,
    description: '擅长技术文档和博客写作',
    level: '高级',
    color: 'var(--el-color-warning)'
  }
]);


// 使用 ref 创建响应式数据
const MyselfHeaderJson = ref<MyselfHeaderData>({
  Btns: [
    {
      ImgSrc: '/icon/github.png',
      Link: 'https://github.com/RyaoVen'
    },
    {
      ImgSrc: '/icon/gitee.png',
      Link: 'https://gitee.com/RyaoVen'
    },
    {
      ImgSrc: '/icon/weibo.png',
      Link: 'https://weibo.com/RyaoVen'
    },
    {
      ImgSrc: '/icon/bilibili.png',
      Link: 'https://space.bilibili.com/5264460'
    },
    {
      ImgSrc: '/icon/leetcode.png',
      Link: 'https://www.leetcode.com'
    }
  ],
  AvatarSrc: '/Avatar.jpg',
  Name: 'RyaoVen',
  Desc: '全栈开发者 · 终身学习者 · 技术分享者'
});

</script>

<template>
  <div :class="$style.container">

    <!-- 页面头部 -->
    <MyselfHeader
    :header="MyselfHeaderJson"
    />

    <div :class="$style.content">

      <!-- 文章热力图 -->
      <MyselfHeatmap
      />

      <!-- 个人能力卡片 -->
      <MyselfCore
      :skills="skills"
      />

      <div style="display: flex;flex-direction: row;justify-content: space-between;">

        <!-- 技术栈 -->
        <MyselfStack
          :stack="techStack"
        />

        <!-- 学习目标 -->
        <MyselfStudying
          :learningGoals="learningGoals"
        />
      </div>

      <!-- 当前项目 -->
      <MyselfProject
          :currentProjects="currentProjects"
      />



    </div>
  </div>
</template>

<style module>

.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, var(--el-bg-color) 0%, var(--el-bg-color-page) 100%);
  padding: 80px 20px 60px;
  transition: background 0.3s ease;
}

/* 内容区 */
.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .skillsGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .techList {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 60px 16px 40px;
  }

  .pageTitle {
    font-size: 36px;
  }

  .section {
    padding: 24px;
  }

  .skillsGrid {
    grid-template-columns: 1fr;
  }

  .heatmapStats {
    flex-direction: column;
    gap: 20px;
  }

  .heatmapGrid {
    overflow-x: scroll;
  }
}
</style>