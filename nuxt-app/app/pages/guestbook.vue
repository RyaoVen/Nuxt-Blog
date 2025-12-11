<script setup lang="ts">
import { ref } from 'vue';
import { ChatDotRound, Star, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 留言数据
const messages = ref([
  {
    id: 1,
    author: {
      name: "张三",
      avatar: "/Avatar.jpg",
      location: "北京"
    },
    content: "博客做得很棒！内容质量很高，学到了很多东西。",
    date: "2024-11-16 10:30",
    likes: 15,
    isOwner: false
  },
  {
    id: 2,
    author: {
      name: "李四",
      avatar: "/Avatar.jpg",
      location: "上海"
    },
    content: "界面设计很现代化，阅读体验非常好！期待更多优质内容。",
    date: "2024-11-15 14:20",
    likes: 12,
    isOwner: false
  },
  {
    id: 3,
    author: {
      name: "王五",
      avatar: "/Avatar.jpg",
      location: "深圳"
    },
    content: "技术文章写得很详细，代码示例也很清晰，感谢分享！",
    date: "2024-11-14 09:15",
    likes: 20,
    isOwner: false
  },
  {
    id: 4,
    author: {
      name: "赵六",
      avatar: "/Avatar.jpg",
      location: "杭州"
    },
    content: "从这里学到了很多前端知识，希望博主继续更新！",
    date: "2024-11-13 16:45",
    likes: 18,
    isOwner: false
  },
  {
    id: 5,
    author: {
      name: "孙七",
      avatar: "/Avatar.jpg",
      location: "成都"
    },
    content: "文章质量很高，排版也很舒服，已经收藏了！",
    date: "2024-11-12 11:20",
    likes: 10,
    isOwner: false
  }
]);

// 新留言表单
const newMessage = ref({
  name: '',
  email: '',
  website: '',
  content: ''
});

// 统计数据
const totalMessages = ref(messages.value.length);
const totalLikes = ref(messages.value.reduce((sum, msg) => sum + msg.likes, 0));

// 提交留言
const submitMessage = () => {
  if (!newMessage.value.content.trim()) {
    ElMessage.warning('请输入留言内容');
    return;
  }

  messages.value.unshift({
    id: Date.now(),
    author: {
      name: newMessage.value.name,
      avatar: "/Avatar.jpg",
      location: "未知"
    },
    content: newMessage.value.content,
    date: new Date().toLocaleString('zh-CN'),
    likes: 0,
    isOwner: false
  });

  // 重置表单
  newMessage.value = {
    name: '',
    email: '',
    website: '',
    content: ''
  };

  totalMessages.value = messages.value.length;
  ElMessage.success('留言发表成功！');
};

// 点赞留言
const likeMessage = (message: any) => {
  message.likes++;
  totalLikes.value++;
};

// 删除留言（仅示例，实际需要权限验证）
const deleteMessage = (id: number) => {
  const index = messages.value.findIndex(m => m.id === id);
  if (index > -1) {
    messages.value.splice(index, 1);
    totalMessages.value = messages.value.length;
    ElMessage.success('留言已删除');
  }
};
</script>

<template>
  <div :class="$style.container">
    <!-- 页面头部 -->
    <div :class="$style.pageHeader">
      <h1 :class="$style.pageTitle">留言板</h1>
      <p :class="$style.pageDesc">欢迎在这里留下您的足迹和想法</p>
    </div>

    <!-- 统计卡片 -->
    <div :class="$style.statsCards">
      <div :class="$style.statCard">
        <div :class="$style.statIcon" style="background: rgba(52, 152, 219, 0.1);">
          <el-icon :size="24" color="#3498db"><ChatDotRound /></el-icon>
        </div>
        <div :class="$style.statContent">
          <span :class="$style.statValue">{{ totalMessages }}</span>
          <span :class="$style.statLabel">留言总数</span>
        </div>
      </div>

      <div :class="$style.statCard">
        <div :class="$style.statIcon" style="background: rgba(231, 76, 60, 0.1);">
          <el-icon :size="24" color="#e74c3c"><Star /></el-icon>
        </div>
        <div :class="$style.statContent">
          <span :class="$style.statValue">{{ totalLikes }}</span>
          <span :class="$style.statLabel">获赞总数</span>
        </div>
      </div>
    </div>

    <div :class="$style.content">
      <!-- 留言表单 -->
      <div :class="$style.messageForm">
        <h3 :class="$style.formTitle">发表留言</h3>
        
        <div :class="$style.formFields">
          <el-input
            v-model="newMessage.content"
            type="textarea"
            :rows="6"
            placeholder="写下你想说的话..."
            :class="$style.formTextarea"
          />

          <div :class="$style.formActions">
            <el-button  size="large" @click="submitMessage" plain>
              发表留言
            </el-button>
          </div>
        </div>
      </div>

      <!-- 留言列表 -->
      <div :class="$style.messagesList">
        <h3 :class="$style.listTitle">全部留言 ({{ messages.length }})</h3>

        <div :class="$style.messagesGrid">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="$style.messageCard"
          >
            <div :class="$style.messageHeader">
              <el-avatar :size="56" :src="message.author.avatar" />
              <div :class="$style.messageAuthor">
                <span :class="$style.authorName">{{ message.author.name }}</span>
                <div :class="$style.authorMeta">
                  <span :class="$style.authorLocation">{{ message.author.location }}</span>
                  <span :class="$style.messageDot">·</span>
                  <span :class="$style.messageDate">{{ message.date }}</span>
                </div>
              </div>
            </div>

            <p :class="$style.messageContent">{{ message.content }}</p>

            <div :class="$style.messageFooter">
              <button :class="$style.likeBtn" @click="likeMessage(message)">
                <el-icon><Star /></el-icon>
                <span>{{ message.likes }}</span>
              </button>
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

.headerIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  border-radius: 50%;
  color: #fff;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(52, 152, 219, 0.3);
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
  grid-template-columns: repeat(2, 1fr);
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
  width: 56px;
  height: 56px;
  border-radius: 14px;
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

/* 内容区 */
.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* 留言表单 */
.messageForm {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.formTitle {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 28px 0;
}

.formFields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formRow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.formInput :global(.el-input__wrapper) {
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
}

.formInput :global(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #3498db inset;
}

.formInput :global(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #3498db inset;
}

.formTextarea :global(.el-textarea__inner) {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  font-size: 15px;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.formTextarea :global(.el-textarea__inner):focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.formActions {
  display: flex;
  justify-content: flex-end;
}

/* 留言列表 */
.messagesList {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.listTitle {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 32px 0;
}

.messagesGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.messageCard {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.messageCard:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.messageHeader {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.messageAuthor {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}

.authorName {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.authorMeta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #999;
}

.authorLocation {
  color: #666;
}

.messageDot {
  color: #ddd;
}

.messageDate {
  color: #999;
}

.messageContent {
  font-size: 15px;
  color: #333;
  line-height: 1.7;
  margin: 0 0 16px 0;
}

.messageFooter {
  display: flex;
  justify-content: flex-end;
}

.likeBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.likeBtn:hover {
  background: #3498db;
  border-color: #3498db;
  color: #fff;
  transform: scale(1.05);
}

/* 响应式 */
@media (max-width: 1024px) {
  .messagesGrid {
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

  .statsCards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .messageForm,
  .messagesList {
    padding: 24px;
  }

  .formRow {
    grid-template-columns: 1fr;
  }
}
</style>
