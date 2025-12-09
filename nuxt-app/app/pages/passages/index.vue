<script setup lang="ts">
import { ref } from 'vue';
import { Clock, View, Star } from '@element-plus/icons-vue';

// 文章列表数据
const articles = ref([
  {
    id: 1,
    title: "深入理解 Vue 3 Composition API",
    summary: "探索 Vue 3 Composition API 的核心概念，学习如何使用 setup、ref、reactive 等 API 构建更加灵活和可维护的组件...",
    author: "RyaoVen",
    date: "2024-11-15",
    category: "前端开发",
    tags: ["Vue", "JavaScript", "前端"],
    views: 1234,
    likes: 89
  },
  {
    id: 2,
    title: "TypeScript 类型体操实战指南",
    summary: "通过实际案例深入学习 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等进阶技巧...",
    author: "RyaoVen",
    date: "2024-11-10",
    category: "编程语言",
    tags: ["TypeScript", "类型系统", "进阶"],
    views: 2156,
    likes: 145
  },
  {
    id: 3,
    title: "现代 CSS 布局技术全解析",
    summary: "从 Flexbox 到 Grid，从传统布局到容器查询，全面掌握现代 CSS 布局技术，打造响应式网页设计...",
    author: "RyaoVen",
    date: "2024-11-05",
    category: "CSS",
    tags: ["CSS", "布局", "响应式"],
    views: 1876,
    likes: 112
  },
  {
    id: 4,
    title: "Nuxt 3 全栈开发实践",
    summary: "使用 Nuxt 3 构建全栈应用，涵盖服务端渲染、API 路由、数据获取、状态管理等核心功能的最佳实践...",
    author: "RyaoVen",
    date: "2024-10-28",
    category: "全栈开发",
    tags: ["Nuxt", "SSR", "全栈"],
    views: 3421,
    likes: 234
  },
  {
    id: 5,
    title: "前端性能优化完全指南",
    summary: "从加载优化到运行时性能，从代码分割到懒加载，全方位提升 Web 应用性能的实用技巧和最佳实践...",
    author: "RyaoVen",
    date: "2024-10-20",
    category: "性能优化",
    tags: ["性能", "优化", "最佳实践"],
    views: 2890,
    likes: 198
  },
  {
    id: 6,
    title: "React Hooks 深度解析与实践",
    summary: "深入探讨 React Hooks 的工作原理，掌握 useState、useEffect、useContext 等核心 Hooks 的使用技巧...",
    author: "RyaoVen",
    date: "2024-10-12",
    category: "前端开发",
    tags: ["React", "Hooks", "前端"],
    views: 2345,
    likes: 167
  },
  {
    id: 7,
    title: "Node.js 微服务架构设计",
    summary: "使用 Node.js 构建微服务架构，涵盖服务拆分、API 网关、服务发现、负载均衡等核心概念和实践...",
    author: "RyaoVen",
    date: "2024-10-05",
    category: "后端开发",
    tags: ["Node.js", "微服务", "架构"],
    views: 1987,
    likes: 134
  },
  {
    id: 8,
    title: "GraphQL 实战：从入门到精通",
    summary: "全面学习 GraphQL 查询语言，掌握 Schema 设计、Resolver 实现、性能优化等关键技术...",
    author: "RyaoVen",
    date: "2024-09-28",
    category: "API 设计",
    tags: ["GraphQL", "API", "后端"],
    views: 1654,
    likes: 98
  },
  {
    id: 9,
    title: "Docker 容器化部署最佳实践",
    summary: "学习使用 Docker 进行应用容器化，掌握镜像构建、容器编排、CI/CD 集成等实用技能...",
    author: "RyaoVen",
    date: "2024-09-20",
    category: "DevOps",
    tags: ["Docker", "容器化", "部署"],
    views: 2567,
    likes: 189
  },
  {
    id: 10,
    title: "Web 安全防护完全指南",
    summary: "深入了解常见的 Web 安全漏洞，学习 XSS、CSRF、SQL 注入等攻击的防护方法和最佳实践...",
    author: "RyaoVen",
    date: "2024-09-15",
    category: "安全",
    tags: ["安全", "Web", "防护"],
    views: 3124,
    likes: 245
  }
]);

// 热门文章数据
const hotArticles = ref([
  { id: 4, title: "Nuxt 3 全栈开发实践", views: 3421 },
  { id: 5, title: "前端性能优化完全指南", views: 2890 },
  { id: 2, title: "TypeScript 类型体操实战指南", views: 2156 },
  { id: 3, title: "现代 CSS 布局技术全解析", views: 1876 },
  { id: 1, title: "深入理解 Vue 3 Composition API", views: 1234 }
]);

// 标签分类数据
const tags = ref([
  { name: "Vue", count: 12, color: "#42b883" },
  { name: "TypeScript", count: 18, color: "#3178c6" },
  { name: "JavaScript", count: 25, color: "#f7df1e" },
  { name: "CSS", count: 15, color: "#1572b6" },
  { name: "Nuxt", count: 8, color: "#00dc82" },
  { name: "前端", count: 30, color: "#646cff" },
  { name: "性能优化", count: 10, color: "#ff6b6b" },
  { name: "全栈", count: 14, color: "#4ecdc4" },
  { name: "最佳实践", count: 20, color: "#95e1d3" },
  { name: "进阶", count: 16, color: "#f38181" }
]);

// 分类数据
const categories = ref([
  { name: "前端开发", count: 28 },
  { name: "编程语言", count: 15 },
  { name: "全栈开发", count: 12 },
  { name: "性能优化", count: 10 },
  { name: "CSS", count: 18 }
]);

const navigateToArticle = (id: number) => {
  navigateTo(`/passages/${id}`);
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.layout">
      <!-- 左侧边栏 - 热门文章 -->
      <aside :class="$style.leftSidebar">
        <div :class="$style.sidebarCard">
          <h3 :class="$style.sidebarTitle">
            <el-icon><Star /></el-icon>
            热门
          </h3>
          <div :class="$style.hotList">
            <div 
              v-for="(article, index) in hotArticles" 
              :key="article.id"
              :class="$style.hotItem"
              @click="navigateToArticle(article.id)"
            >
              <span :class="$style.hotRank">
                {{ index + 1 }}
              </span>
              <div :class="$style.hotContent">
                <p :class="$style.hotTitle">{{ article.title }}</p>
                <span :class="$style.hotViews">
                  <el-icon><View /></el-icon>
                  {{ article.views }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div :class="$style.sidebarCard">
          <h3 :class="$style.sidebarTitle">分类</h3>
          <div :class="$style.categoryList">
            <div 
              v-for="category in categories" 
              :key="category.name"
              :class="$style.categoryItem"
            >
              <span :class="$style.categoryName">{{ category.name }}</span>
              <span :class="$style.categoryCount">{{ category.count }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- 中间主内容 - 文章列表 -->
      <main :class="$style.mainContent">
        <div :class="$style.pageHeader">
          <h1 :class="$style.pageTitle">全部</h1>
        </div>

        <div :class="$style.articleList">
          <article 
            v-for="article in articles" 
            :key="article.id"
            :class="$style.articleItem"
            @click="navigateToArticle(article.id)"
          >
            <div :class="$style.articleHeader">
              <span :class="$style.articleCategory">{{ article.category }}</span>
              <h2 :class="$style.articleTitle">{{ article.title }}</h2>
            </div>
            <p :class="$style.articleSummary">{{ article.summary }}</p>
            <div :class="$style.articleMeta">
              <div :class="$style.metaLeft">
                <span :class="$style.metaItem">
                  <el-icon><Clock /></el-icon>
                  {{ article.date }}
                </span>
                <span :class="$style.metaItem">
                  <el-icon><View /></el-icon>
                  {{ article.views }}
                </span>
              </div>
              <div :class="$style.articleTags">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  :class="$style.tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- 分页 -->
        <div :class="$style.pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50"
            :page-size="10"
          />
        </div>
      </main>

      <!-- 右侧边栏 - 标签云 -->
      <aside :class="$style.rightSidebar">
        <div :class="$style.sidebarCard">
          <h3 :class="$style.sidebarTitle">标签云</h3>
          <div :class="$style.tagCloud">
            <span 
              v-for="tag in tags" 
              :key="tag.name"
              :class="$style.tagItem"
            >
              {{ tag.name }}
              <span :class="$style.tagCount">{{ tag.count }}</span>
            </span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style module>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  padding: 80px 20px 40px;
}

.layout {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 30px;
}

/* 页面头部 */
.pageHeader {
  margin-bottom: 15px;
  margin-top: 20px;
  margin-left: 8px;
  text-align: start;
}

.pageTitle {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 5px 0;
}

.pageDesc {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 侧边栏通用样式 */
.leftSidebar,
.rightSidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebarCard {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.sidebarCard:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.sidebarTitle {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 热门文章列表 */
.hotList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hotItem {
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 12px 12px 6px 12px;
  border: 1px solid transparent;
  border-radius: 6px;
}

.hotItem:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transform: translate(-2px,-2px);
}
.hotItem:hover .hotTitle{
  color: #3498db;

}

.hotRank {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  padding-bottom: 6px;
  padding-top: 6px;
  border-bottom: 2px solid #3498db;
}



.hotContent {
  flex: 1;
  min-width: 0;
}

.hotTitle {
  transition:color 0.3s ease;
  font-size: 14px;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 600;
}

.hotViews {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 4px;
}

/* 分类列表 */
.categoryList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.categoryItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border:1px solid transparent;
}

.categoryItem:hover {
  transform: translate(-2px,-2px);
  box-shadow:0 4px 12px rgba(0, 0, 0, 0.08);
  border:1px solid rgba(0, 0, 0, 0.08);
}

.categoryName {
  transition: all 0.3s ease;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.categoryItem:hover .categoryName {
  color: #3498db;
}

.categoryCount {
  font-size: 13px;
  color: #999;
  background: #fff;
  padding: 2px 8px;
  border-radius: 12px;
}

/* 主内容区 */
.mainContent {
  min-width: 0;
}

.articleList {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.articleItem {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.articleItem:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: rgba(52, 152, 219, 0.2);
}

.articleHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.articleCategory {
  flex-shrink: 0;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(52, 152, 219, 0.2);
}

.articleTitle {
  flex: 1;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.articleSummary {
  font-size: 15px;
  color: #666;
  line-height: 1.7;
  margin: 0 0 20px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.articleMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.metaLeft {
  display: flex;
  gap: 16px;
}

.metaItem {
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

.articleTags {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 12px;
  color: #666;
  padding: 4px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.tag:hover {
  border-color: rgba(52, 152, 219, 0.4);
  background: rgba(52, 152, 219, 0.05);
  color: #3498db;
}

/* 标签云 */
.tagCloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

}

.tagItem {
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid transparent;
}

.tagItem:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.tagCount {
  font-size: 11px;
  opacity: 0.8;
  margin-left: 4px;
}


/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .leftSidebar,
  .rightSidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 60px 16px 40px;
  }

  .articleItem {
    padding: 20px;
  }

  .articleHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .articleTitle {
    font-size: 18px;
  }
}
</style>