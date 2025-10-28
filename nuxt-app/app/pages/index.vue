<script setup lang="ts">
import {
  ArrowDownBold,
    
} from '@element-plus/icons-vue'

const TextH1:string = "Hi,here is RyaoVen."
const TextSpan:string = "I won't stop."
import { ref, onMounted } from 'vue';
import CardPassage from "~/components/CardPassage.vue";
import ArticleCard from "~/components/ArticleCard.vue";
import FriendLinkCard from "~/components/FriendLinkCard.vue";

// 文章数据
const articles = ref([
  {
    title: "如何使用Nuxt.js构建高性能网站",
    author: "RyaoVen",
    date: "2023-06-15",
    category: "前端开发",
    tags: ["Nuxt.js", "Vue", "性能优化"],
    summary: "本文详细介绍了Nuxt.js的核心特性以及如何利用它们构建高性能的现代化网站...",
    coverImage: "/images/nuxt-cover.jpg"
  },
  {
    title: "TypeScript进阶技巧分享",
    author: "RyaoVen",
    date: "2023-05-20",
    category: "编程语言",
    tags: ["TypeScript", "JavaScript", "编程技巧"],
    summary: "深入探讨TypeScript的高级特性，包括类型体操、条件类型和映射类型等进阶用法...",
    coverImage: "/images/typescript-cover.jpg"
  },
  {
    title: "现代Web开发中的CSS架构设计",
    author: "RyaoVen",
    date: "2023-04-10",
    category: "CSS",
    tags: ["CSS", "架构", "设计模式"],
    summary: "探讨在大型项目中如何组织和管理CSS，包括BEM、ITCSS等方法论的实践经验...",
    coverImage: "/images/css-cover.jpg"
  }
]);

// 友链数据
const friendLinks = ref([
  {
    avatar: "/images/friend1-avatar.jpg",
    siteName: "前端进阶之路",
    ownerName: "张三",
    description: "分享前端开发技巧和最新技术动态，专注于Vue.js和React生态",
    screenshot: "/images/friend1-site.jpg",
    url: "https://example.com/friend1"
  },
  {
    avatar: "/images/friend2-avatar.jpg",
    siteName: "设计师日记",
    ownerName: "李四",
    description: "UI/UX设计分享，探讨设计趋势和用户体验优化方法",
    screenshot: "/images/friend2-site.jpg",
    url: "https://example.com/friend2"
  },
  {
    avatar: "/images/friend3-avatar.jpg",
    siteName: "全栈开发笔记",
    ownerName: "王五",
    description: "全栈开发经验分享，涵盖前后端技术和DevOps实践",
    screenshot: "/images/friend3-site.jpg",
    url: "https://example.com/friend3"
  },
  {
    avatar: "/images/friend4-avatar.jpg",
    siteName: "算法之美",
    ownerName: "赵六",
    description: "算法学习与分析，leetcode题解和计算机基础知识",
    screenshot: "/images/friend4-site.jpg",
    url: "https://example.com/friend4"
  }
]);

// 原始字符串（可自定义）
const originalText = "Hi, here is RyaoVen.";
// 存储每个字符的状态：原ASCII码、当前ASCII码、是否正在归位动画中
const charStates = ref<Array<{
  originalCode: number; // 原字符ASCII码
  currentCode: number;  // 当前字符ASCII码
  isAnimating: boolean; // 是否正在执行归位动画
}>>([]);
// 当前显示的字符串
const currentText = ref('');

// 处理ASCII码边界（确保在可打印字符范围内：32~126）
const clampAscii = (code: number): number => {
  const min = 32; // 空格
  const max = 126; // ~
  const range = max - min + 1;
  // 超出范围则循环
  while (code < min) code += range;
  while (code > max) code -= range;
  return code;
};

// 初始化：所有字符先统一前移15位
const initCharStates = () => {
  charStates.value = originalText.split('').map(char => {
    const originalCode = char.charCodeAt(0);
    // 初始偏移：ASCII码 +15（处理边界）
    const currentCode = clampAscii(originalCode + 8);
    return { originalCode, currentCode, isAnimating: false };
  });
  // 初始化显示
  updateCurrentText();
};

// 更新当前显示的字符串
const updateCurrentText = () => {
  currentText.value = charStates.value
      .map(state => String.fromCharCode(state.currentCode))
      .join('');
};

// 单个字符的归位动画（逐次-1，直到回到原码）
const startCharAnimation = (index: number) => {
  const state = charStates.value[index];
  if (state.isAnimating) return; // 避免重复启动

  state.isAnimating = true;
  const animationInterval = setInterval(() => {
    // 每次后移1位（ASCII码-1，处理边界）
    state.currentCode = clampAscii(state.currentCode - 1);
    updateCurrentText();

    // 当回到原字符时，停止动画
    if (state.currentCode === state.originalCode) {
      state.isAnimating = false;
      clearInterval(animationInterval);
    }
  }, 50); // 每50ms移动一次（速度可调整）
};

// 启动整体动画：逐个字符延迟开始归位
const startAnimation = () => {
  charStates.value.forEach((_, index) => {
    // 每个字符延迟 150ms * index 启动（形成依次滚动效果）
    setTimeout(() => startCharAnimation(index), 120 * index);
  });
};

// 挂载后初始化并启动动画
onMounted(() => {
  initCharStates();
  // 稍微延迟一点启动，让用户先看到初始偏移状态
  setTimeout(startAnimation, 500);
});


function click() {
  window.scrollTo({top: 1200, behavior: 'smooth'})
}
</script>

<template>
<div :class="$style.body">


  <div :class="$style.hero">

    <div :class="$style.heroText">
      <div :class="$style.container">
        <h1 :class="$style.h1">{{currentText}}</h1>
        <div :class="$style.tags">
          <el-tag round effect="light" :type="'info'">全栈Web工程师</el-tag>
          <el-tag round effect="light" :type="'info'">摄影爱好者</el-tag>
          <el-tag round effect="light" :type="'info'">音乐发烧友</el-tag>
          <el-tag round effect="light" :type="'info'">进步主义者</el-tag>
        </div>
        <span>{{TextSpan}}</span>
        <div :class="$style.btns">
          <el-button circle size=""><img src="/icon/github.png"></el-button>
          <el-button circle><img src="/icon/gitee.png"></el-button>
          <el-button circle><img src="/icon/weibo.png"></el-button>
          <el-button circle><img src="/icon/leetcode.png"></el-button>
          <el-button circle><img src="/icon/bilibili.png"></el-button>

        </div>
      </div>
    </div>

    <div :class="$style.heroImg">
      <el-avatar :size="235"
                 :class="$style.avatar"
          src="/Avatar.jpg"
      />

    </div>

  </div>
  <el-button circle :icon="ArrowDownBold"  style="margin-top: -120px;" @click="click()"/>


  <el-divider />

  <div :class="$style.sectionContainer">
    <div :class="$style.sectionHeader">
      <h2 :class="$style.sectionTitle">最近文章</h2>
      <div :class="$style.sectionLine"></div>
    </div>
    <div :class="$style.articlesContainer">
      <ArticleCard 
        v-for="(article, index) in articles" 
        :key="index"
        :title="article.title"
        :author="article.author"
        :date="article.date"
        :category="article.category"
        :tags="article.tags"
        :summary="article.summary"
        :coverImage="article.coverImage"
      />
    </div>
  </div>

  <el-divider />

  <div :class="$style.sectionContainer">
    <div :class="$style.sectionHeader">
      <h2 :class="$style.sectionTitle">友情链接</h2>
      <div :class="$style.sectionLine"></div>
    </div>
    <div :class="$style.friendLinksContainer">
      <FriendLinkCard 
        v-for="(link, index) in friendLinks" 
        :key="index"
        :avatar="link.avatar"
        :siteName="link.siteName"
        :ownerName="link.ownerName"
        :description="link.description"
        :screenshot="link.screenshot"
        :url="link.url"
      />
    </div>
  </div>

</div>
</template>

<style module>
.btns{
  display: flex;
  flex-direction: row;
  gap: 3px;
}
.h1{
  margin: 0;
  padding: 0;

}
.body{
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.hero{
  height: 100vh;
  width: 68vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.heroText{

  height: 25vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.heroImg{

  height: 25vh;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;


}
.tags{
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;

}
.avatar{
  box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.05),  /* 底层浅阴影 */
      0 8px 16px rgba(0, 0, 0, 0.1); /* 上层深阴影 */
}
.sectionContainer {
  width: 80vw;
  max-width: 1200px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sectionHeader {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.sectionTitle {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.sectionLine {
  width: 60px;
  height: 3px;
  background-color: #3498db;
  margin-top: 8px;
}

.articlesContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.friendLinksContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
}
</style>