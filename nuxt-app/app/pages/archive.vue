<script setup lang="ts">
import { ref, computed } from 'vue';
import { Calendar, Document, TrendCharts } from '@element-plus/icons-vue';

// 文章归档数据
const articles = ref([
  { id: 1, title: "深入理解 Vue 3 Composition API", date: "2025-11-15", category: "前端开发", views: 1234 },
  { id: 2, title: "TypeScript 类型体操实战指南", date: "2024-11-10", category: "编程语言", views: 2156 },
  { id: 3, title: "现代 CSS 布局技术全解析", date: "2024-11-05", category: "CSS", views: 1876 },
  { id: 4, title: "Nuxt 3 全栈开发实践", date: "2024-10-28", category: "全栈开发", views: 3421 },
  { id: 5, title: "前端性能优化完全指南", date: "2024-10-20", category: "性能优化", views: 2890 },
  { id: 6, title: "React Hooks 深度解析与实践", date: "2024-10-12", category: "前端开发", views: 2345 },
  { id: 7, title: "Node.js 微服务架构设计", date: "2024-10-05", category: "后端开发", views: 1987 },
  { id: 8, title: "GraphQL 实战：从入门到精通", date: "2024-09-28", category: "API 设计", views: 1654 },
  { id: 9, title: "Docker 容器化部署最佳实践", date: "2024-09-20", category: "DevOps", views: 2567 },
  { id: 10, title: "Web 安全防护完全指南", date: "2024-09-15", category: "安全", views: 3124 },
  { id: 11, title: "Webpack 5 配置优化实战", date: "2024-08-25", category: "构建工具", views: 1890 },
  { id: 12, title: "MongoDB 数据库设计最佳实践", date: "2024-08-18", category: "数据库", views: 2234 },
  { id: 13, title: "Git 工作流与团队协作", date: "2024-08-10", category: "版本控制", views: 1567 },
  { id: 14, title: "Tailwind CSS 实用技巧", date: "2024-07-28", category: "CSS", views: 2890 },
  { id: 15, title: "Vite 构建工具深度解析", date: "2024-07-15", category: "构建工具", views: 2123 }
]);

// 按年月分组
const archiveByYearMonth = computed(() => {
  const grouped: Record<string, Record<string, typeof articles.value>> = {};
  
  articles.value.forEach(article => {
    const date = new Date(article.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(article);
  });
  
  return grouped;
});

// 获取排序后的年份
const sortedYears = computed(() => {
  return Object.keys(archiveByYearMonth.value).sort((a, b) => parseInt(b) - parseInt(a));
});

// 获取月份名称
const getMonthName = (month: string) => {
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return months[parseInt(month) - 1];
};

// 统计数据
const totalArticles = computed(() => articles.value.length);
const totalViews = computed(() => articles.value.reduce((sum, article) => sum + article.views, 0));
const categories = computed(() => {
  const cats = new Set(articles.value.map(a => a.category));
  return cats.size;
});

// 导航到文章
const navigateToArticle = (id: number) => {
  navigateTo(`/passages/${id}`);
};

// 时间轴视图切换
const viewMode = ref<'timeline' | 'list'>('timeline');
</script>

<template>
  <div :class="$style.container">
    <!-- 页面头部 -->
    <div :class="$style.pageHeader">
      <h1 :class="$style.pageTitle">文章归档</h1>
      <p :class="$style.pageDesc">按时间顺序浏览所有文章</p>
    </div>

    <!-- 统计卡片 -->
    <div :class="$style.statsCards">
      <div :class="$style.statCard">
        <div :class="$style.statIcon" style="background: rgba(52, 152, 219, 0.1);">
          <el-icon :size="28" color="#3498db"><Document /></el-icon>
        </div>
        <div :class="$style.statContent">
          <span :class="$style.statValue">{{ totalArticles }}</span>
          <span :class="$style.statLabel">文章总数</span>
        </div>
      </div>

      <div :class="$style.statCard">
        <div :class="$style.statIcon" style="background: rgba(46, 204, 113, 0.1);">
          <el-icon :size="28" color="#2ecc71"><TrendCharts /></el-icon>
        </div>
        <div :class="$style.statContent">
          <span :class="$style.statValue">{{ totalViews.toLocaleString() }}</span>
          <span :class="$style.statLabel">总阅读量</span>
        </div>
      </div>

      <div :class="$style.statCard">
        <div :class="$style.statIcon" style="background: rgba(155, 89, 182, 0.1);">
          <el-icon :size="28" color="#9b59b6"><Calendar /></el-icon>
        </div>
        <div :class="$style.statContent">
          <span :class="$style.statValue">{{ categories }}</span>
          <span :class="$style.statLabel">文章分类</span>
        </div>
      </div>
    </div>

    <!-- 归档内容 -->
    <div :class="$style.archiveContent">
      <div v-for="year in sortedYears" :key="year" :class="$style.yearSection">
        <div :class="$style.yearHeader">
          <h2 :class="$style.yearTitle">{{ year }}</h2>
          <span :class="$style.yearCount">
            {{ Object.values(archiveByYearMonth[year]).flat().length }} 篇文章
          </span>
        </div>

        <div :class="$style.monthsList">
          <div
            v-for="month in Object.keys(archiveByYearMonth[year]).sort((a, b) => parseInt(b) - parseInt(a))"
            :key="month"
            :class="$style.monthSection"
          >
            <div :class="$style.monthHeader">
              <div :class="$style.monthDot"></div>
              <h3 :class="$style.monthTitle">{{ getMonthName(month) }}</h3>
              <span :class="$style.monthCount">{{ archiveByYearMonth[year][month].length }}</span>
            </div>

            <div :class="$style.articlesList">
              <div
                v-for="article in archiveByYearMonth[year][month]"
                :key="article.id"
                :class="$style.articleItem"
                @click="navigateToArticle(article.id)"
              >
                <div :class="$style.articleDate">
                  {{ new Date(article.date).getDate() }}
                </div>
                <div :class="$style.articleInfo">
                  <h4 :class="$style.articleTitle">{{ article.title }}</h4>
                  <div :class="$style.articleMeta">
                    <span :class="$style.articleCategory">{{ article.category }}</span>
                    <span :class="$style.articleViews">{{ article.views }} 阅读</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  padding: 80px 20px 60px;
}

/* 页面头部 */
.pageHeader {
  max-width: 1200px;
  margin: 0 auto 48px;
  text-align: center;
}

.pageTitle {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  letter-spacing: -1px;
}

.pageDesc {
  font-size: 18px;
  color: #666;
  margin: 0;
}

/* 统计卡片 */
.statsCards {
  max-width: 1200px;
  margin: 0 auto 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.statCard {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.statCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.statIcon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.statContent {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.statValue {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
}

.statLabel {
  font-size: 14px;
  color: #999;
}

/* 归档内容 */
.archiveContent {
  max-width: 1200px;
  margin: 0 auto;
}

.yearSection {
  margin-bottom: 48px;
}

.yearHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.yearTitle {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
}

.yearCount {
  font-size: 14px;
  color: #999;
  padding: 6px 14px;
  background: #f8f9fa;
  border-radius: 20px;
}

.monthsList {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.monthSection {
  position: relative;
  padding-left: 40px;
}

.monthSection::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 32px;
  bottom: -20px;
  width: 2px;
  background: linear-gradient(to bottom, #3498db 0%, transparent 100%);
}

.monthHeader {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
}

.monthDot {
  position: absolute;
  left: -34px;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 4px #fff, 0 0 0 6px rgba(52, 152, 219, 0.2);
}

.monthTitle {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.monthCount {
  font-size: 13px;
  color: #999;
  padding: 4px 10px;
  background: #f8f9fa;
  border-radius: 12px;
}

.articlesList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.articleItem {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.articleItem:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-color: rgba(52, 152, 219, 0.2);
}

.articleDate {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  border-radius: 12px;
}

.articleInfo {
  flex: 1;
  min-width: 0;
}

.articleTitle {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.articleMeta {
  display: flex;
  gap: 16px;
  align-items: center;
}

.articleCategory {
  font-size: 13px;
  color: #3498db;
  padding: 4px 12px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(52, 152, 219, 0.2);
}

.articleViews {
  font-size: 13px;
  color: #999;
}

/* 响应式 */
@media (max-width: 768px) {
  .container {
    padding: 60px 16px 40px;
  }

  .pageTitle {
    font-size: 36px;
  }

  .statsCards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .yearTitle {
    font-size: 28px;
  }

  .monthSection {
    padding-left: 32px;
  }

  .monthDot {
    left: -28px;
    width: 20px;
    height: 20px;
  }

  .articleItem {
    flex-direction: column;
    align-items: flex-start;
  }

  .articleTitle {
    white-space: normal;
  }
}
</style>