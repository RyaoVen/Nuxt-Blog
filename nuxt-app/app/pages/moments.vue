<script setup lang="ts">
import { ref, computed } from 'vue';
import { Picture, VideoCamera, Link, Star, ChatDotRound, Share } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 动态数据
const moments = ref([
  {
    id: 1,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "刚完成了博客的重构，采用了 Nuxt 3 + Element Plus，整体体验提升了不少。现代化的设计风格让人眼前一亮！✨",
    images: [],
    date: "2024-11-16 18:30",
    likes: 28,
    comments: 5,
    type: "text"
  },
  {
    id: 2,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "今天学习了 Vue 3 的 Composition API，感觉打开了新世界的大门。代码组织更加灵活了，逻辑复用也变得简单。分享一下学习笔记 📝",
    images: [],
    link: {
      title: "深入理解 Vue 3 Composition API",
      url: "/passages/1",
      cover: ""
    },
    date: "2024-11-15 14:20",
    likes: 45,
    comments: 12,
    type: "link"
  },
  {
    id: 3,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "周末去了趟郊外，风景真不错。工作之余也要记得放松自己 🌲🌤️",
    images: [],
    date: "2024-11-14 10:15",
    likes: 67,
    comments: 8,
    type: "text"
  },
  {
    id: 4,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "分享一个很棒的 CSS 技巧，使用 backdrop-filter 可以实现毛玻璃效果，让界面更有层次感。现代浏览器都支持了！",
    images: [],
    date: "2024-11-13 16:45",
    likes: 52,
    comments: 15,
    type: "text"
  },
  {
    id: 5,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "凌晨修复了一个困扰很久的 bug，原来是异步处理的问题。debug 的过程虽然痛苦，但解决后的成就感无与伦比 💪",
    images: [],
    date: "2024-11-12 02:30",
    likes: 38,
    comments: 6,
    type: "text"
  },
  {
    id: 6,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "最近在研究微前端架构，qiankun 框架确实很强大。大型项目的模块化管理有了新的思路。",
    images: [],
    date: "2024-11-11 11:20",
    likes: 41,
    comments: 9,
    type: "text"
  },
  {
    id: 7,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "今天的咖啡特别香 ☕，继续写代码！",
    images: [],
    date: "2024-11-10 09:00",
    likes: 89,
    comments: 3,
    type: "text"
  },
  {
    id: 8,
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: "TypeScript 5.0 发布了，新特性值得关注。类型系统越来越强大，开发体验也在不断提升。",
    images: [],
    date: "2024-11-09 15:30",
    likes: 56,
    comments: 11,
    type: "text"
  }
]);

// 统计数据
const totalMoments = computed(() => moments.value.length);
const totalLikes = computed(() => moments.value.reduce((sum, m) => sum + m.likes, 0));
const totalComments = computed(() => moments.value.reduce((sum, m) => sum + m.comments, 0));

// 新动态内容
const newMoment = ref('');

// 发布动态
const publishMoment = () => {
  if (!newMoment.value.trim()) {
    ElMessage.warning('请输入动态内容');
    return;
  }

  moments.value.unshift({
    id: Date.now(),
    author: {
      name: "RyaoVen",
      avatar: "/Avatar.jpg"
    },
    content: newMoment.value,
    images: [],
    date: new Date().toLocaleString('zh-CN'),
    likes: 0,
    comments: 0,
    type: "text"
  });

  newMoment.value = '';
  ElMessage.success('动态发布成功！');
};

// 点赞动态
const likeMoment = (moment: any) => {
  moment.likes++;
};

// 格式化时间
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  return dateStr;
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.layout">
      <!-- 左侧个人信息卡片 -->
      <aside :class="$style.sidebar">
        <div :class="$style.profileCard">
          <el-avatar :size="100" src="/Avatar.jpg" :class="$style.avatar" />
          <h3 :class="$style.profileName">RyaoVen</h3>
          <p :class="$style.profileBio">全栈开发者 · 技术分享者</p>
          
          <div :class="$style.profileStats">
            <div :class="$style.statItem">
              <span :class="$style.statValue">{{ totalMoments }}</span>
              <span :class="$style.statLabel">动态</span>
            </div>
            <div :class="$style.statItem">
              <span :class="$style.statValue">{{ totalLikes }}</span>
              <span :class="$style.statLabel">获赞</span>
            </div>
            <div :class="$style.statItem">
              <span :class="$style.statValue">{{ totalComments }}</span>
              <span :class="$style.statLabel">评论</span>
            </div>
          </div>
        </div>

        <div :class="$style.infoCard">
          <h4 :class="$style.infoTitle">关于我</h4>
          <div :class="$style.infoList">
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">职业</span>
              <span :class="$style.infoValue">全栈工程师</span>
            </div>
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">技能</span>
              <span :class="$style.infoValue">Vue / React / Node.js</span>
            </div>
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">爱好</span>
              <span :class="$style.infoValue">编程 / 摄影 / 音乐</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main :class="$style.mainContent">
        <!-- 页面标题 -->
        <div :class="$style.pageHeader">
          <h1 :class="$style.pageTitle">闲话</h1>
          <p :class="$style.pageDesc">记录生活点滴，分享技术心得</p>
        </div>

        <!-- 发布动态 -->
        <div :class="$style.publishBox">
          <el-avatar :size="48" src="/Avatar.jpg" />
          <div :class="$style.publishContent">
            <el-input
              v-model="newMoment"
              type="textarea"
              :rows="4"
              placeholder="分享新鲜事..."
              :class="$style.publishInput"
            />
            <div :class="$style.publishActions">
              <div :class="$style.publishTools">
                <el-button :icon="Picture" circle size="small" />
                <el-button :icon="VideoCamera" circle size="small" />
                <el-button :icon="Link" circle size="small" />
              </div>
              <el-button type="primary" @click="publishMoment" round>发布</el-button>
            </div>
          </div>
        </div>

        <!-- 动态列表 -->
        <div :class="$style.momentsList">
          <div
            v-for="moment in moments"
            :key="moment.id"
            :class="$style.momentCard"
          >
            <el-avatar :size="48" :src="moment.author.avatar" :class="$style.momentAvatar" />
            
            <div :class="$style.momentContent">
              <div :class="$style.momentHeader">
                <span :class="$style.momentAuthor">{{ moment.author.name }}</span>
                <span :class="$style.momentDate">{{ formatDate(moment.date) }}</span>
              </div>

              <p :class="$style.momentText">{{ moment.content }}</p>

              <!-- 链接卡片 -->
              <div v-if="moment.link" :class="$style.linkCard">
                <div :class="$style.linkIcon">
                  <el-icon :size="24"><Link /></el-icon>
                </div>
                <div :class="$style.linkInfo">
                  <span :class="$style.linkTitle">{{ moment.link.title }}</span>
                  <span :class="$style.linkUrl">{{ moment.link.url }}</span>
                </div>
              </div>

              <!-- 动态操作 -->
              <div :class="$style.momentActions">
                <button :class="$style.actionBtn" @click="likeMoment(moment)">
                  <el-icon><Star /></el-icon>
                  <span>{{ moment.likes }}</span>
                </button>
                <button :class="$style.actionBtn">
                  <el-icon><ChatDotRound /></el-icon>
                  <span>{{ moment.comments }}</span>
                </button>
                <button :class="$style.actionBtn">
                  <el-icon><Share /></el-icon>
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style module>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  padding: 80px 20px 60px;
}

.layout {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.profileCard {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.avatar {
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profileName {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.profileBio {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
}

.profileStats {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.statValue {
  font-size: 24px;
  font-weight: 700;
  color: #3498db;
}

.statLabel {
  font-size: 13px;
  color: #999;
}

.infoCard {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.infoTitle {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.infoList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.infoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.infoLabel {
  font-size: 13px;
  color: #999;
}

.infoValue {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}

/* 主内容区 */
.mainContent {
  min-width: 0;
}

.pageHeader {
  margin-bottom: 32px;
}

.pageTitle {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.pageDesc {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 发布框 */
.publishBox {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.publishContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.publishInput :global(.el-textarea__inner) {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 12px 16px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.publishInput :global(.el-textarea__inner):focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.publishActions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.publishTools {
  display: flex;
  gap: 8px;
}

/* 动态列表 */
.momentsList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.momentCard {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.momentCard:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.momentAvatar {
  flex-shrink: 0;
}

.momentContent {
  flex: 1;
  min-width: 0;
}

.momentHeader {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.momentAuthor {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.momentDate {
  font-size: 13px;
  color: #999;
}

.momentText {
  font-size: 15px;
  color: #333;
  line-height: 1.7;
  margin: 0 0 16px 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.linkCard {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.linkCard:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
}

.linkIcon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 10px;
  color: #3498db;
  flex-shrink: 0;
}

.linkInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  min-width: 0;
}

.linkTitle {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.linkUrl {
  font-size: 13px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.momentActions {
  display: flex;
  gap: 24px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.actionBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.actionBtn:hover {
  background: #f8f9fa;
  color: #3498db;
}

/* 响应式 */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 60px 16px 40px;
  }

  .publishBox {
    flex-direction: column;
  }

  .momentCard {
    padding: 16px;
  }

  .momentActions {
    flex-wrap: wrap;
  }
}
</style>
