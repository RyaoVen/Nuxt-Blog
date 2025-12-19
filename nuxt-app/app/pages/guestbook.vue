<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { GuestbookMessage } from '~/stores/type/guestbook/message';

// TODO: 工程化
// TODO: 完成逻辑层编写

// 留言数据
const messages = ref<GuestbookMessage[]>([
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
      name: newMessage.value.name || "匿名用户", // Fallback name
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
const likeMessage = (message: GuestbookMessage) => {
  message.likes++;
  totalLikes.value++;
};
</script>

<template>
  <div :class="$style.body">
    <!-- 页面头部 -->
    <div :class="$style.pageHeader">
      <h1 :class="$style.pageTitle">留言板</h1>
      <p :class="$style.pageDesc">欢迎在这里留下您的足迹和想法</p>
    </div>

    <div :class="$style.sectionContainer">
      <!-- 统计卡片 -->
      <GuestbookStats
        :totalMessages="totalMessages"
        :totalLikes="totalLikes"
      />

      <div :class="$style.content">
        <!-- 留言表单 -->
        <GuestbookForm
          v-model="newMessage"
          @submit="submitMessage"
        />

        <!-- 留言列表 -->
        <GuestbookList
          :messages="messages"
          @like="likeMessage"
        />
      </div>
    </div>
  </div>
</template>

<style module>
.body {
  background: linear-gradient(to bottom, var(--el-bg-color) 0%, var(--el-bg-color-page) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  transition: background 0.3s ease;
  padding-top: 80px; /* Align with index layout */
}

.sectionContainer {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 48px;
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
  color: var(--el-text-color-primary);
  margin: 0 0 16px 0;
  letter-spacing: -1px;
}

.pageDesc {
  font-size: 18px;
  color: var(--el-text-color-secondary);
  margin: 0;
}

/* 内容区 */
.content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .body {
    padding-top: 60px;
  }
  
  .sectionContainer {
    padding: 0 16px;
  }

  .pageTitle {
    font-size: 36px;
  }
}
</style>
