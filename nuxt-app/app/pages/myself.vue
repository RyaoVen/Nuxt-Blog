<script setup lang="ts">
import { ref, computed } from 'vue';
import { TrendCharts, Trophy, Cpu, Document } from '@element-plus/icons-vue';

// 技术栈数据
const techStack = ref([
  {
    title: "前端：",
    content: [
      { name: 'Vue.js', level: 95, color: '#42b883', type: 'success' },
      { name: 'React.js', level: 88, color: '#61dafb', type: 'info' },
      { name: 'TypeScript', level: 90, color: '#3178c6', type: 'warning' },
      { name: 'Nuxt.js', level: 85, color: '#00dc82' },
      { name: 'Tailwind CSS', level: 92, color: '#06b6d4', size: 'small' }
    ]
  },
  {
    title: "后端：",
    content: [
      { name: 'Node.js', level: 87, color: '#339933', type: 'success' },
      { name: 'Express', level: 85, color: '#000000', type: 'danger' },
      { name: 'NestJS', level: 80, color: '#e0234e' },
      { name: 'MongoDB', level: 82, color: '#47a248' },
      { name: 'PostgreSQL', level: 78, color: '#336791' }
    ]
  },
  {
    title: "工具：",
    content: [
      { name: 'Git', level: 93, color: '#f05032' },
      { name: 'Docker', level: 85, color: '#2496ed' },
      { name: 'Webpack', level: 88, color: '#8dd6f9' },
      { name: 'Vite', level: 90, color: '#646cff' },
      { name: 'VS Code', level: 95, color: '#007acc' }
    ]
  }
]);

// 当前项目
const currentProjects = ref([
  {
    name: '个人博客系统',
    description: '基于 Nuxt 3 + Element Plus 的现代化博客平台',
    status: '进行中',
    progress: 75,
    tech: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Element Plus'],
    color: '#3498db'
  },
  {
    name: '微前端架构实践',
    description: '使用 qiankun 框架构建大型企业级应用',
    status: '规划中',
    progress: 30,
    tech: ['qiankun', 'Vue', 'React', 'Webpack'],
    color: '#9b59b6'
  },
  {
    name: '全栈电商平台',
    description: '完整的电商解决方案，包含前后端和管理系统',
    status: '进行中',
    progress: 60,
    tech: ['Vue 3', 'Node.js', 'MongoDB', 'Redis'],
    color: '#2ecc71'
  }
]);

// 学习目标
const learningGoals = ref([
  { name: 'Web3 开发', progress: 45, target: '2024年12月', color: '#e74c3c' },
  { name: 'Rust 编程', progress: 30, target: '2025年3月', color: '#f39c12' },
  { name: '系统设计', progress: 65, target: '2024年11月', color: '#3498db' },
  { name: 'AI/ML 基础', progress: 20, target: '2025年6月', color: '#9b59b6' }
]);

// 个人能力卡片
const skills = ref([
  {
    title: '前端开发',
    icon: Cpu,
    description: '精通现代前端框架和工具链',
    level: '高级',
    color: '#3498db'
  },
  {
    title: '后端开发',
    icon: Cpu,
    description: '熟悉 Node.js 生态和数据库设计',
    level: '中级',
    color: '#2ecc71'
  },
  {
    title: '系统架构',
    icon: TrendCharts,
    description: '具备大型项目架构设计能力',
    level: '中级',
    color: '#9b59b6'
  },
  {
    title: '技术写作',
    icon: Document,
    description: '擅长技术文档和博客写作',
    level: '高级',
    color: '#e67e22'
  }
]);

// 文章热力图数据（模拟一年的数据）
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1); // 今年1月1日
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // 随机生成文章数量（0-5篇）
    const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
    
    data.push({
      date: date.toISOString().split('T')[0],
      count: count
    });
  }
  
  return data;
};

const heatmapData = ref(generateHeatmapData());

// 获取热力图颜色
const getHeatmapColor = (count: number) => {
  if (count === 0) return '#ebedf0';
  if (count === 1) return '#c6e48b';
  if (count === 2) return '#7bc96f';
  if (count === 3) return '#239a3b';
  return '#196127';
};
function typeToText(type: string|null){
  if (type === 'success'){
    return '熟练';
  }
  if (type === 'warning'){
    return '入门';
  }
  if (type === 'info'){
    return '掌握';
  }
  if (type === 'danger'){
    return '理解';
  }
}

// 按周分组热力图数据
const heatmapWeeks = computed(() => {
  const weeks: any[] = [];
  let currentWeek: any[] = [];
  
  heatmapData.value.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();
    
    if (index === 0 && dayOfWeek !== 0) {
      // 填充第一周的空白
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push(day);
    
    if (dayOfWeek === 6 || index === heatmapData.value.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  return weeks;
});

// 统计数据
const stats = computed(() => {
  const totalArticles = heatmapData.value.reduce((sum, day) => sum + day.count, 0);
  const activeDays = heatmapData.value.filter(day => day.count > 0).length;
  const maxStreak = calculateMaxStreak();
  
  return {
    totalArticles,
    activeDays,
    maxStreak
  };
});

// 计算最长连续天数
const calculateMaxStreak = () => {
  let maxStreak = 0;
  let currentStreak = 0;
  
  heatmapData.value.forEach(day => {
    if (day.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });
  
  return maxStreak;
};

</script>

<template>
  <div :class="$style.container">
    <!-- 页面头部 -->
    <div :class="$style.pageHeader">
      <el-avatar :size="120" src="/Avatar.jpg" :class="$style.avatar" />
      <h1 :class="$style.pageTitle">RyaoVen</h1>
      <p :class="$style.pageDesc">全栈开发者 · 终身学习者 · 技术分享者</p>
      <div :class="$style.socialLinks">
        <el-button circle><img src="/icon/github.png" :class="$style.socialIcon" /></el-button>
        <el-button circle><img src="/icon/gitee.png" :class="$style.socialIcon" /></el-button>
        <el-button circle><img src="/icon/weibo.png" :class="$style.socialIcon" /></el-button>
        <el-button circle><img src="/icon/bilibili.png" :class="$style.socialIcon" /></el-button>
      </div>
    </div>

    <div :class="$style.content">
      <!-- 个人能力卡片 -->
      <section :class="$style.section">
        <h2 :class="$style.sectionTitle">核心能力</h2>
        <div :class="$style.skillsGrid">
          <div
            v-for="skill in skills"
            :key="skill.title"
            :class="$style.skillCard"
          >
            <div :class="$style.skillIcon" :style="{ background: `${skill.color}15` }">
              <el-icon :size="32" :color="skill.color"><component :is="skill.icon" /></el-icon>
            </div>
            <h3 :class="$style.skillTitle">{{ skill.title }}</h3>
            <p :class="$style.skillDesc">{{ skill.description }}</p>
            <span :class="$style.skillLevel" :style="{ color: skill.color }">{{ skill.level }}</span>
          </div>
        </div>
      </section>

      <div style="display: flex;flex-direction: row;justify-content: space-between;">
        <section :class="$style.sectionHalf">
          <h2 :class="$style.sectionTitle">技术栈</h2>
          <div :class="$style.StackList">
            <div v-for="part in techStack" :key="part.title" >
              <h3 :class="$style.LTitle">{{ part.title }}</h3>

              <!-- 关键修复：把 v-if/v-else 放在 v-for 循环内部 -->
              <template v-for="(tech, category) in part.content" :key="category" >
                <!-- ✅ 重点：span 永远渲染，tooltip 仅当 tech.type 存在时包裹 -->
                <el-tooltip
                    v-if="tech.type"
                    :content="typeToText(tech.type)"
                    placement="bottom"
                    effect="light"
                >
        <span :class="[$style.tag, tech.type && $style[`tag--${tech.type}`]]">
          {{ tech.name }}
        </span>
                </el-tooltip>

                <!-- 没有 type 时直接显示 span -->
                <span
                    v-else
                    :class="[$style.tag, tech.type && $style[`tag--${tech.type}`]]"
                >
        {{ tech.name }}
      </span>
              </template>
            </div>
          </div>

        </section>

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

      </div>

      <!-- 当前项目 -->
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

      <!-- 学习目标 -->


      <!-- 文章热力图 -->
      <section :class="$style.section">
        <h2 :class="$style.sectionTitle">文章更新热力图</h2>
        <div :class="$style.heatmapStats">
          <div :class="$style.statItem">
            <span :class="$style.statValue">{{ stats.totalArticles }}</span>
            <span :class="$style.statLabel">今年文章</span>
          </div>
          <div :class="$style.statItem">
            <span :class="$style.statValue">{{ stats.activeDays }}</span>
            <span :class="$style.statLabel">活跃天数</span>
          </div>
          <div :class="$style.statItem">
            <span :class="$style.statValue">{{ stats.maxStreak }}</span>
            <span :class="$style.statLabel">最长连续</span>
          </div>
        </div>
        
        <div :class="$style.heatmapContainer">
          <div :class="$style.heatmapGrid">
            <div v-for="(week, weekIndex) in heatmapWeeks" :key="weekIndex" :class="$style.heatmapWeek">
              <div
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                :class="$style.heatmapDay"
                :style="{ background: day ? getHeatmapColor(day.count) : 'transparent' }"
                :title="day ? `${day.date}: ${day.count} 篇文章` : ''"
              ></div>
            </div>
          </div>
          <div :class="$style.heatmapLegend">
            <span :class="$style.legendLabel">少</span>
            <div :class="$style.legendItem" style="background: #ebedf0;"></div>
            <div :class="$style.legendItem" style="background: #c6e48b;"></div>
            <div :class="$style.legendItem" style="background: #7bc96f;"></div>
            <div :class="$style.legendItem" style="background: #239a3b;"></div>
            <div :class="$style.legendItem" style="background: #196127;"></div>
            <span :class="$style.legendLabel">多</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style module>
/* 在现有样式中添加以下内容 */
.goalsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.goalCard {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.goalCard:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.circularProgressWrapper {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.goalFooter {
  margin-top: 10px;
}

.goalProgressText {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.goalHeader {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.goalName {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.goalTarget {
  font-size: 12px;
  color: #999;
}

.sectionHalf{
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  width: 47%;
}
/* 技术栈标签基础样式 */
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  margin: 0 0.5rem 0.5rem 0;
  transition: all 0.2s ease;
  cursor: pointer;
}

/* 悬停效果 */
.tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.LTitle{
  margin: 4px 2px;
  padding: 1px 2px;
  font-size: 20px;
}

.StackList{
  display: flex;
  flex-direction: column;
  gap: 8px;
}


/* 类型变体（背景/边框/文字色）*/
.tag--success {
  background-color: #ecfdf5;
  border-color: #a7f3d0;
  color: #065f46;
}

.tag--warning {
  background-color: #fffbeb;
  border-color: #fcd34d;
  color: #92400e;
}

.tag--danger {
  background-color: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}

.tag--info {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  padding: 80px 20px 60px;
}

/* 页面头部 */
.pageHeader {
  max-width: 1200px;
  margin: 0 auto 64px;
  text-align: center;
}

.avatar {
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 4px solid #fff;
}

.pageTitle {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: -1px;
}

.pageDesc {
  font-size: 18px;
  color: #666;
  margin: 0 0 24px 0;
}

.socialLinks {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.socialIcon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* 内容区 */
.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.section {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.sectionTitle {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

/* 能力卡片 */
.skillsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.skillCard {
  padding: 28px;
  background: #f8f9fa;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.skillCard:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.skillDesc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.skillLevel {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 12px;
  display: inline-block;
}

/* 技术栈 */
.techCategory {
  margin-bottom: 32px;
}

.techCategory:last-child {
  margin-bottom: 0;
}

.categoryTitle {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.techList {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.techItem {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.techHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.techName {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.techLevel {
  font-size: 13px;
  color: #999;
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

/* 学习目标 */
.goalsList {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.goalItem {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.goalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.goalName {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.goalTarget {
  font-size: 13px;
  color: #999;
}

.goalProgress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.goalProgress .progressBar {
  flex: 1;
}

.goalPercent {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  min-width: 45px;
  text-align: right;
}

/* 热力图 */
.heatmapStats {
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.statValue {
  font-size: 32px;
  font-weight: 700;
  color: #3498db;
}

.statLabel {
  font-size: 13px;
  color: #999;
}

.heatmapContainer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.heatmapGrid {
  display: flex;
  gap: 3px;
  overflow-x: auto;
  padding: 4px;
}

.heatmapWeek {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.heatmapDay {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.heatmapDay:hover {
  transform: scale(1.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.heatmapLegend {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.legendLabel {
  font-size: 12px;
  color: #999;
}

.legendItem {
  width: 12px;
  height: 12px;
  border-radius: 2px;
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