<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import MomentsStore from '~/stores/moments';
import type { Moment } from '~/stores/type/moments';

// 动态/瞬间 模拟数据
const moments = ref<Moment[]>([
  {
    id: 1,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "刚完成了博客的重构，采用了 Nuxt 3 + Element Plus，整体体验提升了不少。现代化的设计风格让人眼前一亮！✨",
    images: ["/images/blog-refactor-1.jpg", "/images/blog-refactor-2.jpg"],
    date: "2024-11-16 18:30",
    likes: 28,
    comments: [
      {
        id: 1,
        author: {
          name: "前端小枫",
          avatar: "/avatars/feng.jpg"
        },
        content: "Nuxt 3 的性能确实比 2 提升很多，我也刚重构完个人博客，一起交流下～",
        images: [],
        date: "2024-11-16 19:05",
        likes: 8
      },
      {
        id: 2,
        author: {
          name: "UI设计师阿琳",
          avatar: "/avatars/lin.jpg"
        },
        content: "现代化设计风格求参考！最近也在做博客视觉升级 😊",
        images: [],
        date: "2024-11-16 20:12",
        likes: 5
      }
    ],
    type: "text"
  },
  {
    id: 2,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "今天学习了 Vue 3 的 Composition API，感觉打开了新世界的大门。代码组织更加灵活了，逻辑复用也变得简单。分享一下学习笔记 📝",
    images: [],
    link: {
      title: "深入理解 Vue 3 Composition API",
      url: "/passages/1",
      cover: "/images/vue3-notes-cover.jpg"
    },
    date: "2024-11-15 14:20",
    likes: 45,
    comments: [
      {
        id: 1,
        author: {
          name: "菜鸟学前端",
          avatar: "/avatars/cainiao.jpg"
        },
        content: "Composition API 确实比 Options API 更灵活，就是刚开始上手有点绕",
        images: [],
        date: "2024-11-15 15:01",
        likes: 12
      },
      {
        id: 2,
        author: {
          name: "全栈老杨",
          avatar: "/avatars/yang.jpg"
        },
        content: "笔记能发出来看看吗？最近也在系统学 Vue 3",
        images: [],
        date: "2024-11-15 16:40",
        likes: 7
      }
    ],
    type: "link"
  },
  {
    id: 3,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "周末去了趟郊外，风景真不错。工作之余也要记得放松自己 🌲🌤️",
    images: ["/images/outdoor-1.jpg", "/images/outdoor-2.jpg"],
    date: "2024-11-14 10:15",
    likes: 67,
    comments: [
      {
        id: 1,
        author: {
          name: "旅行爱好者",
          avatar: "/avatars/travel.jpg"
        },
        content: "这是哪里呀？风景也太好了，求定位～",
        images: [],
        date: "2024-11-14 11:30",
        likes: 15
      },
      {
        id: 2,
        author: {
          name: "打工人小周",
          avatar: "/avatars/zhou.jpg"
        },
        content: "羡慕了，天天加班根本没时间出门 😭",
        images: [],
        date: "2024-11-14 13:25",
        likes: 9
      }
    ],
    type: "text"
  },
  {
    id: 4,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "分享一个很棒的 CSS 技巧，使用 backdrop-filter 可以实现毛玻璃效果，让界面更有层次感。现代浏览器都支持了！",
    images: ["/images/backdrop-filter-demo.jpg"],
    date: "2024-11-13 16:45",
    likes: 52,
    comments: [
      {
        id: 1,
        author: {
          name: "CSS爱好者",
          avatar: "/avatars/css.jpg"
        },
        content: "试了下真的好用！不过低版本 Safari 好像还有点兼容问题",
        images: [],
        date: "2024-11-13 17:20",
        likes: 11
      },
      {
        id: 2,
        author: {
          name: "前端切图仔",
          avatar: "/avatars/cutter.jpg"
        },
        content: "收藏了！正好新项目要做毛玻璃效果，太及时了",
        images: [],
        date: "2024-11-13 18:05",
        likes: 6
      }
    ],
    type: "text"
  },
  {
    id: 5,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "凌晨修复了一个困扰很久的 bug，原来是异步处理的问题。debug 的过程虽然痛苦，但解决后的成就感无与伦比 💪",
    images: [],
    date: "2024-11-12 02:30",
    likes: 38,
    comments: [
      {
        id: 1,
        author: {
          name: "程序猿阿杰",
          avatar: "/avatars/jie.jpg"
        },
        content: "懂这种感觉！上次改 bug 改到凌晨 4 点，解决后直接精神了",
        images: [],
        date: "2024-11-12 09:10",
        likes: 8
      },
      {
        id: 2,
        author: {
          name: "测试小姐姐",
          avatar: "/avatars/test.jpg"
        },
        content: "辛苦啦！还好解决了，不然又要提bug了哈哈",
        images: [],
        date: "2024-11-12 10:20",
        likes: 4
      }
    ],
    type: "text"
  },
  {
    id: 6,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "最近在研究微前端架构，qiankun 框架确实很强大。大型项目的模块化管理有了新的思路。",
    images: [],
    date: "2024-11-11 11:20",
    likes: 41,
    comments: [
      {
        id: 1,
        author: {
          name: "架构师老陈",
          avatar: "/avatars/chen.jpg"
        },
        content: "qiankun 确实成熟，不过也要注意应用间的通信和样式隔离问题",
        images: [],
        date: "2024-11-11 12:15",
        likes: 10
      },
      {
        id: 2,
        author: {
          name: "前端进阶中",
          avatar: "/avatars/advance.jpg"
        },
        content: "求分享学习资料！公司准备做微前端，正在选型",
        images: [],
        date: "2024-11-11 14:30",
        likes: 7
      }
    ],
    type: "text"
  },
  {
    id: 7,
    author: {
      name: "RyaoVen",
      avatar: "/avatar.jpg"
    },
    content: "今天的咖啡特别香 ☕，继续写代码！",
    images: ["/images/coffee.jpg"],
    date: "2024-11-10 09:00",
    likes: 89,
    comments: [
      {
        id: 1,
        author: {
          name: "咖啡控",
          avatar: "/avatars/coffee.jpg"
        },
        content: "同款咖啡豆！喝了咖啡写代码效率翻倍 ☕",
        images: [],
        date: "2024-11-10 09:25",
        likes: 20
      },
      {
        id: 2,
        author: {
          name: "早起困难户",
          avatar: "/avatars/lazy.jpg"
        },
        content: "羡慕能早起的人，我都是靠咖啡续命到中午 😂",
        images: [],
        date: "2024-11-10 10:10",
        likes: 12
      }
    ],
    type: "text"
  },
  {
    id: 8,
    author: {
      name: "RyaoVen",
      avatar: "/avatars/ryaoven.jpg"
    },
    content: "TypeScript 5.0 发布了，新特性值得关注。类型系统越来越强大，开发体验也在不断提升。",
    images: [],
    date: "2024-11-09 15:30",
    likes: 56,
    comments: [
      {
        id: 1,
        author: {
          name: "TS爱好者",
          avatar: "/avatars/ts.jpg"
        },
        content: "5.0 的装饰器终于稳定了，不用再用 experimental 模式了",
        images: [],
        date: "2024-11-09 16:05",
        likes: 9
      },
      {
        id: 2,
        author: {
          name: "后端转前端",
          avatar: "/avatars/backend.jpg"
        },
        content: "一直不敢学TS，现在是不是该入坑了？",
        images: [],
        date: "2024-11-09 17:10",
        likes: 5
      }
    ],
    type: "text"
  }
]);

const momentsStore = MomentsStore();

// 统计数据
const totalMoments = computed(() => moments.value.length);
const totalLikes = computed(() => moments.value.reduce((sum, m) => sum + m.likes, 0));
const totalComments = computed(() => moments.value.reduce((sum, m) => sum + m.comments.length, 0));

// 点赞动态
const likeMoment = (moment: Moment) => {
  moment.likes++;
};

const submitComment = (momentId: number, content: string) => {
  const moment = moments.value.find(m => m.id === momentId);
  if (moment) {
    moment.comments.unshift({
      id: Date.now(),
      author: {
        name: "我",
        avatar: "/Avatar.jpg"
      },
      content: content,
      images: [],
      date: "刚刚",
      likes: 0
    });
    ElMessage.success('评论发表成功');
  }
};
</script>

<template>
  <div :class="$style.body">
    <div :class="$style.layout">
      <!-- 左侧个人信息卡片 -->
      <aside :class="$style.sidebar">
        <MomentsProfileCard
          :totalMoments="totalMoments"
          :totalLikes="totalLikes"
          :totalComments="totalComments"
        />
        <MomentsInfoCard />
      </aside>

      <!-- 主内容区 -->
      <main :class="$style.mainContent">
        <!-- 页面标题 -->
        <div :class="$style.pageHeader">
          <h1 :class="$style.pageTitle">闲话</h1>
          <p :class="$style.pageDesc">记录生活点滴，分享技术心得</p>
        </div>

        <!-- 动态列表 -->
        <MomentsList
          :moments="moments"
          @like="likeMoment"
          @submitComment="submitComment"
        />
      </main>
    </div>
  </div>
</template>

<style module>
.body {
  min-height: 100vh;
  background: linear-gradient(to bottom, var(--el-bg-color) 0%, var(--el-bg-color-page) 100%);
  padding: 80px 20px 60px;
  transition: background 0.3s ease;
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
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.pageDesc {
  font-size: 16px;
  color: var(--el-text-color-regular);
  margin: 0;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 240px 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .body {
    padding: 60px 16px 40px;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .pageTitle {
    font-size: 28px;
  }
}
</style>
