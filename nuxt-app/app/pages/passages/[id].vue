<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// Import Components
import PassagesDetailToc from '~/components/Passages/Detail/Toc.vue';
import PassagesDetailHeader from '~/components/Passages/Detail/Header.vue';
import PassagesDetailContent from '~/components/Passages/Detail/Content.vue';
import PassagesDetailFooter from '~/components/Passages/Detail/Footer.vue';
import PassagesDetailRelated from '~/components/Passages/Detail/Related.vue';
import PassagesDetailComments from '~/components/Passages/Detail/Comments.vue';

// Import Types
import type { 
  ArticleDetail, 
  ContentSection, 
  TocItem, 
  Comment, 
  RelatedArticle 
} from '~/stores/type/passages/detail';

// TODO 工程化
// TODO 完成逻辑层编写
const route = useRoute();
const articleId = computed(() => route.params.id);

// Scroll Progress
const scrollProgress = ref(0);
const scrollPercent = computed(() => Math.round(scrollProgress.value * 100));

// Active TOC Section
const activeSection = ref('intro');

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.value = docHeight > 0 ? scrollTop / docHeight : 0;

  // Active TOC
  const headings = contentSections.value
    .filter(section => section.type === 'heading' && section.id)
    .map(section => document.getElementById(section.id!));
  
  for (const heading of headings) {
    if (heading && heading.getBoundingClientRect().top >= 0 && heading.getBoundingClientRect().top < 300) {
      activeSection.value = heading.id;
      break;
    }
  }
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100; // Offset for sticky header or top spacing
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    activeSection.value = id;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 文章数据（实际应该从 API 获取）
const article = ref<ArticleDetail>({
  id: 1,
  title: "深入理解 Vue 3 Composition API",
  subtitle: "探索 Vue 3 的核心特性与最佳实践",
  author: {
    name: "RyaoVen",
    avatar: "/Avatar.jpg",
    bio: "全栈开发者 · 技术分享者"
  },
  date: "2024-11-15",
  updateDate: "2024-11-16",
  category: "前端开发",
  tags: ["Vue", "JavaScript", "前端", "Composition API"],
  views: 1234,
  readTime: "8 分钟"
});

// 文章内容段落
const contentSections = ref<ContentSection[]>([
  {
    type: 'heading',
    level: 1,
    text: '引言',
    id: 'intro'
  },
  {
    type: 'paragraph',
    text: 'Vue 3 带来了许多令人兴奋的新特性，其中最重要的就是 Composition API。这个新的 API 为我们提供了更灵活的代码组织方式，让我们能够更好地复用逻辑和管理复杂的组件状态。'
  },
  {
    type: 'heading',
    level: 2,
    text: '什么是 Composition API？',
    id: 'what'
  },
  {
    type: 'paragraph',
    text: 'Composition API 是 Vue 3 中引入的一组新的 API，它允许我们使用函数的方式来组织组件逻辑。与 Options API 相比，Composition API 提供了更好的类型推导、更灵活的代码组织方式，以及更好的逻辑复用能力。'
  },
  {
    type: 'heading',
    level: 3,
    text: '核心概念',
    id: 'core'
  },
  {
    type: 'heading',
    level: 4,
    text: '1. setup 函数',
    id: 'setup'
  },
  {
    type: 'alert',
    variant: 'info',
    title: '提示',
    content: 'setup 函数是 Composition API 的核心，它在 props 被解析之后，组件实例创建之前执行。'
  },
  {
    type: 'paragraph',
    text: 'setup 函数是 Composition API 的入口点。它在组件创建之前执行，接收 props 和 context 作为参数。'
  },
  {
    type: 'code',
    language: 'javascript',
    code: `import { ref, reactive } from 'vue'

export default {
  setup(props, context) {
    const count = ref(0)
    const state = reactive({ name: 'Vue 3' })
    
    function increment() {
      count.value++
    }
    
    return { count, state, increment }
  }
}`
  },
  {
    type: 'quote',
    content: 'Composition API 的设计初衷是解决复杂组件中逻辑复用和代码组织的问题。',
    author: 'Vue.js 团队'
  },
  {
    type: 'heading',
    level: 4,
    text: '2. 响应式引用 (ref)',
    id: 'ref'
  },
  {
    type: 'paragraph',
    text: 'ref 用于创建响应式的数据引用。它接受一个内部值并返回一个响应式且可变的 ref 对象。'
  },
  {
    type: 'code',
    language: 'javascript',
    code: `const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1`
  },
  {
    type: 'heading',
    level: 4,
    text: '3. 响应式对象 (reactive)',
    id: 'reactive'
  },
  {
    type: 'paragraph',
    text: 'reactive 用于创建响应式的对象。它返回对象的响应式副本。'
  },
  {
    type: 'code',
    language: 'javascript',
    code: `const state = reactive({
  count: 0,
  message: 'Hello Vue 3'
})

state.count++`
  },
  {
    type: 'heading',
    level: 2,
    text: '实战示例',
    id: 'example'
  },
  {
    type: 'paragraph',
    text: '让我们通过一个实际的例子来看看如何使用 Composition API 构建一个待办事项列表。'
  },
  {
    type: 'heading',
    level: 2,
    text: '最佳实践',
    id: 'best'
  },
  {
    type: 'heading',
    level: 3,
    text: '1. 逻辑复用'
  },
  {
    type: 'paragraph',
    text: '使用组合式函数（Composables）来复用逻辑，可以让代码更加模块化和可维护。'
  },
  {
    type: 'heading',
    level: 3,
    text: '2. 代码组织'
  },
  {
    type: 'paragraph',
    text: '将相关的逻辑组织在一起，而不是按照选项类型分散。这样可以让代码更加清晰，更容易理解和维护。'
  },
  {
    type: 'heading',
    level: 2,
    text: '总结',
    id: 'summary'
  },
  {
    type: 'paragraph',
    text: 'Composition API 为 Vue 3 带来了更强大的功能和更好的开发体验。通过合理使用 Composition API，我们可以写出更加清晰、可维护的代码。希望这篇文章能帮助你更好地理解和使用 Vue 3 的 Composition API。'
  },
  {
    type: 'heading',
    level: 2,
    text: '参考资料'
  },
  {
    type: 'list',
    items: [
      'Vue 3 官方文档',
      'Composition API RFC',
      'Vue 3 迁移指南'
    ]
  }
]);

// 相关文章
const relatedArticles = ref<RelatedArticle[]>([
  { id: 2, title: "TypeScript 类型体操实战指南", category: "编程语言" },
  { id: 4, title: "Nuxt 3 全栈开发实践", category: "全栈开发" },
  { id: 6, title: "React Hooks 深度解析与实践", category: "前端开发" }
]);

// 目录数据
const toc = ref<TocItem[]>([
  { id: 'intro', title: '引言', level: 1 },
  { id: 'what', title: '什么是 Composition API？', level: 1 },
  { id: 'core', title: '核心概念', level: 2 },
  { id: 'setup', title: 'setup 函数', level: 3 },
  { id: 'ref', title: '响应式引用 (ref)', level: 3 },
  { id: 'reactive', title: '响应式对象 (reactive)', level: 3 },
  { id: 'example', title: '实战示例', level: 1 },
  { id: 'best', title: '最佳实践', level: 1 },
  { id: 'summary', title: '总结', level: 1 }
]);

// 评论数据
const comments = ref<Comment[]>([
  {
    id: 1,
    author: {
      name: "张三",
      avatar: "/Avatar.jpg"
    },
    content: "写得非常好！Composition API 确实让 Vue 3 的代码组织更加灵活了。",
    date: "2024-11-16 10:30",
    likes: 12,
    replies: [
      {
        id: 11,
        author: {
          name: "RyaoVen",
          avatar: "/Avatar.jpg"
        },
        content: "感谢支持！希望这篇文章对你有帮助。",
        date: "2024-11-16 11:00",
        likes: 5
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "李四",
      avatar: "/Avatar.jpg"
    },
    content: "请问 Composition API 和 Options API 可以混用吗？",
    date: "2024-11-16 14:20",
    likes: 8,
    replies: [
      {
        id: 21,
        author: {
          name: "RyaoVen",
          avatar: "/Avatar.jpg"
        },
        content: "可以的！Vue 3 完全支持两种 API 混用，但建议在同一个项目中保持风格统一。",
        date: "2024-11-16 15:00",
        likes: 6
      },
      {
        id: 22,
        author: {
          name: "王五",
          avatar: "/Avatar.jpg"
        },
        content: "我在项目中就是混用的，主要看具体场景选择合适的 API。",
        date: "2024-11-16 16:30",
        likes: 3
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "赵六",
      avatar: "/Avatar.jpg"
    },
    content: "代码示例很清晰，期待更多关于 Vue 3 的文章！",
    date: "2024-11-16 18:45",
    likes: 15,
    replies: []
  }
]);

// Event Handlers
const submitComment = (content: string) => {
  comments.value.unshift({
    id: Date.now(),
    author: {
      name: "访客",
      avatar: "/Avatar.jpg"
    },
    content: content,
    date: new Date().toLocaleString('zh-CN'),
    likes: 0,
    replies: []
  });
  
  ElMessage.success('评论发表成功！');
};

const submitReply = (commentId: number, content: string) => {
  const comment = comments.value.find(c => c.id === commentId);
  if (comment) {
    comment.replies.push({
      id: Date.now(),
      author: {
        name: "访客",
        avatar: "/Avatar.jpg"
      },
      content: content,
      date: new Date().toLocaleString('zh-CN'),
      likes: 0
    });
  }
  ElMessage.success('回复成功！');
};

const likeComment = (comment: Comment) => {
  comment.likes++;
};

const navigateToArticle = (id: number) => {
  navigateTo(`/passages/${id}`);
};

const goBack = () => {
  navigateTo('/passages');
};
</script>

<template>
  <div :class="$style.container">
    <!-- 返回按钮 -->
    <div :class="$style.backButton" @click="goBack">
      <el-icon><ArrowLeft /></el-icon>
      <span>返回列表</span>
    </div>

    <div :class="$style.layout">
      <!-- 左侧目录 -->
      <PassagesDetailToc 
        :toc="toc"
        :activeSection="activeSection"
        :scrollPercent="scrollPercent"
        :scrollProgress="scrollProgress"
        @click="scrollToSection"
      />

      <!-- 主内容区 -->
      <main :class="$style.mainContent">
        <!-- 文章头部 -->
        <PassagesDetailHeader 
          :article="article"
        />

        <!-- 文章内容 -->
        <PassagesDetailContent 
          :sections="contentSections"
        />

        <!-- 文章底部 -->
        <PassagesDetailFooter 
          :updateDate="article.updateDate"
        />

        <!-- 相关文章 -->
        <PassagesDetailRelated 
          :articles="relatedArticles"
          @click="navigateToArticle"
        />

        <!-- 评论区 -->
        <PassagesDetailComments 
          :comments="comments"
          @submitComment="submitComment"
          @submitReply="submitReply"
          @likeComment="likeComment"
        />
      </main>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100%;
  padding: 40px 20px;
}

.backButton {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  cursor: pointer;
  color: var(--el-text-color-secondary);
  font-size: 15px;
  transition: all 0.3s;
  padding: 8px 16px;
  border-radius: 8px;
  /* 限制返回按钮最大宽度与内容区一致并居中，或者直接放在左上角 */
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  display: flex; /* Override inline-flex to center properly if needed, but flex is fine */
}

.backButton:hover {
  color: var(--el-color-primary);
  background: var(--el-fill-color);
}

.layout {
  display: grid;
  grid-template-columns: 1fr 900px 1fr;
  gap: 40px;
  align-items: start;
}

.tocWrapper {
  justify-self: end;
  width: 260px;
}

.mainContent {
  width: 100%;
  min-width: 0;
  background: var(--el-bg-color);
  border-radius: 16px;
  padding: 60px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
}

@media (max-width: 1440px) {
  .layout {
    grid-template-columns: 260px 1fr;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .tocWrapper {
    justify-self: start;
    width: 100%;
  }
}

@media (max-width: 1280px) {
  .container {
    padding: 30px 16px;
  }
  
  .layout {
    gap: 30px;
  }
}

@media (max-width: 1024px) {
  .layout {
    display: block;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .tocWrapper {
    display: none;
  }
  
  .mainContent {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .mainContent {
    padding: 24px;
  }
}
</style>
