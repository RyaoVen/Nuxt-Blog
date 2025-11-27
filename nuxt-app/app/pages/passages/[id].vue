<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Clock, View, Calendar, ArrowLeft, ArrowRight, Share, Star } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const route = useRoute();
const articleId = computed(() => route.params.id);

// 文章数据（实际应该从 API 获取）
const article = ref({
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
const contentSections = ref([
  {
    type: 'heading',
    level: 1,
    text: '引言'
  },
  {
    type: 'paragraph',
    text: 'Vue 3 带来了许多令人兴奋的新特性，其中最重要的就是 Composition API。这个新的 API 为我们提供了更灵活的代码组织方式，让我们能够更好地复用逻辑和管理复杂的组件状态。'
  },
  {
    type: 'heading',
    level: 2,
    text: '什么是 Composition API？'
  },
  {
    type: 'paragraph',
    text: 'Composition API 是 Vue 3 中引入的一组新的 API，它允许我们使用函数的方式来组织组件逻辑。与 Options API 相比，Composition API 提供了更好的类型推导、更灵活的代码组织方式，以及更好的逻辑复用能力。'
  },
  {
    type: 'heading',
    level: 3,
    text: '核心概念'
  },
  {
    type: 'heading',
    level: 4,
    text: '1. setup 函数'
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
    type: 'heading',
    level: 4,
    text: '2. 响应式引用 (ref)'
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
    text: '3. 响应式对象 (reactive)'
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
    text: '实战示例'
  },
  {
    type: 'paragraph',
    text: '让我们通过一个实际的例子来看看如何使用 Composition API 构建一个待办事项列表。'
  },
  {
    type: 'heading',
    level: 2,
    text: '最佳实践'
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
    text: '总结'
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
const relatedArticles = ref([
  { id: 2, title: "TypeScript 类型体操实战指南", category: "编程语言" },
  { id: 4, title: "Nuxt 3 全栈开发实践", category: "全栈开发" },
  { id: 6, title: "React Hooks 深度解析与实践", category: "前端开发" }
]);

// 目录数据
const toc = ref([
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

const activeSection = ref('intro');

// 评论数据
const comments = ref([
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

// 新评论内容
const newComment = ref('');
const replyingTo = ref<number | null>(null);
const replyContent = ref('');

// 发表评论
const submitComment = () => {
  if (!newComment.value.trim()) return;
  
  comments.value.unshift({
    id: Date.now(),
    author: {
      name: "访客",
      avatar: "/Avatar.jpg"
    },
    content: newComment.value,
    date: new Date().toLocaleString('zh-CN'),
    likes: 0,
    replies: []
  });
  
  newComment.value = '';
  ElMessage.success('评论发表成功！');
};

// 回复评论
const submitReply = (commentId: number) => {
  if (!replyContent.value.trim()) return;
  
  const comment = comments.value.find(c => c.id === commentId);
  if (comment) {
    comment.replies.push({
      id: Date.now(),
      author: {
        name: "访客",
        avatar: "/Avatar.jpg"
      },
      content: replyContent.value,
      date: new Date().toLocaleString('zh-CN'),
      likes: 0
    });
  }
  
  replyContent.value = '';
  replyingTo.value = null;
  ElMessage.success('回复成功！');
};

// 点赞评论
const likeComment = (comment: any) => {
  comment.likes++;
};

// 显示回复框
const showReplyBox = (commentId: number) => {
  replyingTo.value = commentId;
  replyContent.value = '';
};

// 取消回复
const cancelReply = () => {
  replyingTo.value = null;
  replyContent.value = '';
};

const navigateToArticle = (id: number) => {
  navigateTo(`/passages/${id}`);
};

const goBack = () => {
  navigateTo('/passages');
};

const shareArticle = () => {
  // 分享功能
  if (navigator.share) {
    navigator.share({
      title: article.value.title,
      url: window.location.href
    });
  }
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
      <aside :class="$style.tocSidebar">
        <div :class="$style.tocCard">
          <h3 :class="$style.tocTitle">目录</h3>
          <nav :class="$style.tocNav">
            <a
              v-for="item in toc"
              :key="item.id"
              :class="[$style.tocItem, $style[`level${item.level}`], activeSection === item.id ? $style.active : '']"
              :href="`#${item.id}`"
            >
              {{ item.title }}
            </a>
          </nav>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main :class="$style.mainContent">
        <!-- 文章头部 -->
        <header :class="$style.articleHeader">
          <div :class="$style.categoryBadge">{{ article.category }}</div>
          <h1 :class="$style.articleTitle">{{ article.title }}</h1>
          <p :class="$style.articleSubtitle">{{ article.subtitle }}</p>
          
          <div :class="$style.articleMeta">
            <div :class="$style.authorInfo">
              <el-avatar :size="48" :src="article.author.avatar" />
              <div :class="$style.authorDetails">
                <span :class="$style.authorName">{{ article.author.name }}</span>
                <span :class="$style.authorBio">{{ article.author.bio }}</span>
              </div>
            </div>
            
            <div :class="$style.metaInfo">
              <span :class="$style.metaItem">
                <el-icon><Calendar /></el-icon>
                {{ article.date }}
              </span>
              <span :class="$style.metaItem">
                <el-icon><Clock /></el-icon>
                {{ article.readTime }}
              </span>
              <span :class="$style.metaItem">
                <el-icon><View /></el-icon>
                {{ article.views }}
              </span>
            </div>
          </div>

          <div :class="$style.articleTags">
            <span v-for="tag in article.tags" :key="tag" :class="$style.tag">
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- 文章内容 -->
        <article :class="$style.articleContent">
          <div :class="$style.markdown">
            <template v-for="(section, index) in contentSections" :key="index">
              <h1 v-if="section.type === 'heading' && section.level === 1" :class="$style.h1">
                {{ section.text }}
              </h1>
              <h2 v-else-if="section.type === 'heading' && section.level === 2" :class="$style.h2">
                {{ section.text }}
              </h2>
              <h3 v-else-if="section.type === 'heading' && section.level === 3" :class="$style.h3">
                {{ section.text }}
              </h3>
              <h4 v-else-if="section.type === 'heading' && section.level === 4" :class="$style.h4">
                {{ section.text }}
              </h4>
              <p v-else-if="section.type === 'paragraph'" :class="$style.paragraph">
                {{ section.text }}
              </p>
              <pre v-else-if="section.type === 'code'" :class="$style.codeBlock"><code>{{ section.code }}</code></pre>
              <ul v-else-if="section.type === 'list'" :class="$style.list">
                <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
              </ul>
            </template>
          </div>
        </article>

        <!-- 文章底部 -->
        <footer :class="$style.articleFooter">
          <div :class="$style.updateInfo">
            最后更新于 {{ article.updateDate }}
          </div>
          
          <div :class="$style.shareSection">
            <span :class="$style.shareText">分享这篇文章</span>
            <el-button circle :icon="Share" @click="shareArticle" />
          </div>
        </footer>

        <!-- 相关文章 -->
        <section :class="$style.relatedSection">
          <h3 :class="$style.relatedTitle">相关文章</h3>
          <div :class="$style.relatedList">
            <div
              v-for="related in relatedArticles"
              :key="related.id"
              :class="$style.relatedItem"
              @click="navigateToArticle(related.id)"
            >
              <span :class="$style.relatedCategory">{{ related.category }}</span>
              <h4 :class="$style.relatedItemTitle">{{ related.title }}</h4>
              <el-icon :class="$style.relatedArrow"><ArrowRight /></el-icon>
            </div>
          </div>
        </section>

        <!-- 评论区 -->
        <section :class="$style.commentsSection">
          <div :class="$style.commentsHeader">
            <h3 :class="$style.commentsTitle">评论 ({{ comments.length }})</h3>
          </div>

          <!-- 发表评论 -->
          <div :class="$style.commentForm">
            <el-avatar :size="40" src="/Avatar.jpg" />
            <div :class="$style.formContent">
              <el-input
                v-model="newComment"
                type="textarea"
                :rows="4"
                placeholder="写下你的评论..."
                :class="$style.commentInput"
              />
              <div :class="$style.formActions">
                <el-button type="primary" @click="submitComment" round>发表评论</el-button>
              </div>
            </div>
          </div>

          <!-- 评论列表 -->
          <div :class="$style.commentsList">
            <div
              v-for="comment in comments"
              :key="comment.id"
              :class="$style.commentItem"
            >
              <el-avatar :size="44" :src="comment.author.avatar" :class="$style.commentAvatar" />
              <div :class="$style.commentContent">
                <div :class="$style.commentHeader">
                  <span :class="$style.commentAuthor">{{ comment.author.name }}</span>
                  <span :class="$style.commentDate">{{ comment.date }}</span>
                </div>
                <p :class="$style.commentText">{{ comment.content }}</p>
                <div :class="$style.commentActions">
                  <button :class="$style.actionBtn" @click="likeComment(comment)">
                    <el-icon><Star /></el-icon>
                    <span>{{ comment.likes }}</span>
                  </button>
                  <button :class="$style.actionBtn" @click="showReplyBox(comment.id)">
                    <span>回复</span>
                  </button>
                </div>

                <!-- 回复框 -->
                <div v-if="replyingTo === comment.id" :class="$style.replyForm">
                  <el-input
                    v-model="replyContent"
                    type="textarea"
                    :rows="3"
                    placeholder="写下你的回复..."
                  />
                  <div :class="$style.replyActions">
                    <el-button size="small" @click="cancelReply">取消</el-button>
                    <el-button size="small" type="primary" @click="submitReply(comment.id)">回复</el-button>
                  </div>
                </div>

                <!-- 回复列表 -->
                <div v-if="comment.replies.length > 0" :class="$style.repliesList">
                  <div
                    v-for="reply in comment.replies"
                    :key="reply.id"
                    :class="$style.replyItem"
                  >
                    <el-avatar :size="32" :src="reply.author.avatar" />
                    <div :class="$style.replyContent">
                      <div :class="$style.replyHeader">
                        <span :class="$style.replyAuthor">{{ reply.author.name }}</span>
                        <span :class="$style.replyDate">{{ reply.date }}</span>
                      </div>
                      <p :class="$style.replyText">{{ reply.content }}</p>
                      <button :class="$style.replyLikeBtn" @click="likeComment(reply)">
                        <el-icon><Star /></el-icon>
                        <span>{{ reply.likes }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- 右侧边栏 -->
      <aside :class="$style.rightSidebar">
        <div :class="$style.sidebarCard">
          <h3 :class="$style.sidebarTitle">关于作者</h3>
          <div :class="$style.authorCard">
            <el-avatar :size="80" :src="article.author.avatar" />
            <h4 :class="$style.authorCardName">{{ article.author.name }}</h4>
            <p :class="$style.authorCardBio">{{ article.author.bio }}</p>
            <el-button type="primary" round size="small">关注</el-button>
          </div>
        </div>

        <div :class="$style.sidebarCard">
          <h3 :class="$style.sidebarTitle">文章信息</h3>
          <div :class="$style.infoList">
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">发布时间</span>
              <span :class="$style.infoValue">{{ article.date }}</span>
            </div>
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">阅读时长</span>
              <span :class="$style.infoValue">{{ article.readTime }}</span>
            </div>
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">浏览次数</span>
              <span :class="$style.infoValue">{{ article.views }}</span>
            </div>
            <div :class="$style.infoItem">
              <span :class="$style.infoLabel">分类</span>
              <span :class="$style.infoValue">{{ article.category }}</span>
            </div>
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
  padding: 80px 20px 60px;
}

.backButton {
  max-width: 1400px;
  margin: 0 auto 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 14px;
  color: #666;
}

.backButton:hover {
  background: #f8f9fa;
  transform: translateX(-4px);
  color: #3498db;
}

.layout {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 240px 1fr 300px;
  gap: 40px;
}

/* 左侧目录 */
.tocSidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.tocCard {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.tocTitle {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.tocNav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tocItem {
  padding: 8px 12px;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
}

.tocItem:hover {
  background: #f8f9fa;
  color: #3498db;
}

.tocItem.active {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  border-left-color: #3498db;
}

.level1 {
  padding-left: 12px;
}

.level2 {
  padding-left: 24px;
  font-size: 13px;
}

.level3 {
  padding-left: 36px;
  font-size: 12px;
}

/* 主内容区 */
.mainContent {
  min-width: 0;
}

.articleHeader {
  background: #fff;
  border-radius: 20px;
  padding: 48px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.categoryBadge {
  display: inline-block;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  border: 1px solid rgba(52, 152, 219, 0.2);
}

.articleTitle {
  font-size: 42px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  line-height: 1.3;
  letter-spacing: -1px;
}

.articleSubtitle {
  font-size: 18px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.articleMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.authorInfo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.authorDetails {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.authorName {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.authorBio {
  font-size: 13px;
  color: #999;
}

.metaInfo {
  display: flex;
  gap: 24px;
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.articleTags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tag {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag:hover {
  border-color: rgba(52, 152, 219, 0.4);
  background: rgba(52, 152, 219, 0.05);
  color: #3498db;
}

/* 文章内容 */
.articleContent {
  background: #fff;
  border-radius: 20px;
  padding: 48px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.markdown {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 48px 0 24px 0;
  color: #1a1a1a;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.h1:first-child {
  margin-top: 0;
}

.h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 40px 0 20px 0;
  color: #1a1a1a;
}

.h3 {
  font-size: 22px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  color: #1a1a1a;
}

.h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 24px 0 12px 0;
  color: #333;
}

.paragraph {
  margin: 16px 0;
  line-height: 1.8;
  color: #333;
}

.codeBlock {
  background: #282c34;
  color: #abb2bf;
  padding: 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 24px 0;
  line-height: 1.6;
}

.codeBlock code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 14px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
}

.list {
  margin: 16px 0;
  padding-left: 32px;
}

.list li {
  margin: 8px 0;
  line-height: 1.6;
}

/* 文章底部 */
.articleFooter {
  background: #fff;
  border-radius: 20px;
  padding: 32px 48px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.updateInfo {
  font-size: 14px;
  color: #999;
}

.shareSection {
  display: flex;
  align-items: center;
  gap: 16px;
}

.shareText {
  font-size: 14px;
  color: #666;
}

/* 相关文章 */
.relatedSection {
  background: #fff;
  border-radius: 20px;
  padding: 40px 48px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.relatedTitle {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 24px 0;
}

.relatedList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.relatedItem {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.relatedItem:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
  transform: translateX(4px);
}

.relatedCategory {
  flex-shrink: 0;
  padding: 4px 12px;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.relatedItemTitle {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.relatedArrow {
  flex-shrink: 0;
  color: #999;
  transition: all 0.3s ease;
}

.relatedItem:hover .relatedArrow {
  color: #3498db;
  transform: translateX(4px);
}

/* 右侧边栏 */
.rightSidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
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
}

.sidebarTitle {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.authorCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.authorCard :global(.el-avatar) {
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.authorCardName {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.authorCardBio {
  font-size: 13px;
  color: #666;
  margin: 0 0 20px 0;
}

.infoList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.infoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.infoLabel {
  font-size: 13px;
  color: #999;
}

.infoValue {
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

/* 评论区 */
.commentsSection {
  background: #fff;
  border-radius: 20px;
  padding: 40px 48px;
  margin-top: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.commentsHeader {
  margin-bottom: 32px;
}

.commentsTitle {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.commentForm {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f0f0f0;
}

.formContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.commentInput :global(.el-textarea__inner) {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.commentInput :global(.el-textarea__inner):focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.formActions {
  display: flex;
  justify-content: flex-end;
}

.commentsList {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.commentItem {
  display: flex;
  gap: 16px;
}

.commentAvatar {
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.commentContent {
  flex: 1;
  min-width: 0;
}

.commentHeader {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.commentAuthor {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.commentDate {
  font-size: 13px;
  color: #999;
}

.commentText {
  font-size: 15px;
  color: #333;
  line-height: 1.7;
  margin: 0 0 12px 0;
}

.commentActions {
  display: flex;
  gap: 16px;
}

.actionBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.actionBtn:hover {
  background: #f8f9fa;
  color: #3498db;
}

.replyForm {
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.replyForm :global(.el-textarea__inner) {
  border-radius: 8px;
  background: #fff;
}

.replyActions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.repliesList {
  margin-top: 20px;
  padding-left: 20px;
  border-left: 2px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.replyItem {
  display: flex;
  gap: 12px;
}

.replyContent {
  flex: 1;
  min-width: 0;
}

.replyHeader {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.replyAuthor {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.replyDate {
  font-size: 12px;
  color: #999;
}

.replyText {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin: 0 0 8px 0;
}

.replyLikeBtn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.replyLikeBtn:hover {
  background: #f8f9fa;
  color: #3498db;
}

/* 响应式 */
@media (max-width: 1200px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .tocSidebar,
  .rightSidebar {
    display: none;
  }

  .articleHeader,
  .articleContent,
  .articleFooter,
  .relatedSection,
  .commentsSection {
    padding: 32px 24px;
  }

  .articleTitle {
    font-size: 32px;
  }

  .commentForm {
    flex-direction: column;
  }
}
</style>