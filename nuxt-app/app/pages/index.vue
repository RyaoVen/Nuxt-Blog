<script lang="ts" setup>
import {
  ArrowDownBold,
} from '@element-plus/icons-vue'
import type {friendLinkType} from "~/stores/type/index/friendLink";
import type {hotPassageType} from "~/stores/type/index/hotPassage";
import type {articleType} from "~/stores/type/index/article";
import type {hiroType, tagType,btnType} from "~/stores/type/index/hiro"

const TextH1: string = "Hi,here is RyaoVen."
const TextSpan: string = "I won't stop."
import {ref} from 'vue';

// 文章数据
const articles = ref<articleType[]>([
  {
    id: 1,
    title: "如何使用Nuxt.js构建高性能网站",
    author: "RyaoVen",
    date: "2023-06-15",
    category: "前端开发",
    tags: ["Nuxt.js", "Vue", "性能优化"],
    summary: "本文详细介绍了Nuxt.js的核心特性以及如何利用它们构建高性能的现代化网站...",
    coverImage: "/images/nuxt-cover.jpg"
  },
  {
    id: 2,
    title: "TypeScript进阶技巧分享",
    author: "RyaoVen",
    date: "2023-05-20",
    category: "编程语言",
    tags: ["TypeScript", "JavaScript", "编程技巧"],
    summary: "深入探讨TypeScript的高级特性，包括类型体操、条件类型和映射类型等进阶用法...",
    coverImage: "/images/typescript-cover.jpg"
  },
  {
    id: 3,
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
const friendLinks = ref<friendLinkType[]>([
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

function click() {
  window.scrollTo({top: 1200, behavior: 'smooth'})
}

const hotPassage: hotPassageType = {
  id: 1,
  title: "如何使用Nuxt.js构建高性能网站",
  summary: "本文详细介绍了Nuxt.js的核心特性以及如何利用它们构建高性能的现代化网站...",
  imgSrc: '/Avatar.jpg'
}
// 先定义 tags 和 btns
const tags: tagType[] = [
  { effect: 'light', type: 'info', text: '全栈Web工程师', id: 1 },
  { effect: 'light', type: 'info', text: '摄影爱好者', id: 2 },
  { effect: 'light', type: 'info', text: '音乐发烧友', id: 3 },
  { effect: 'light', type: 'info', text: '进步主义者', id: 4 },
];

const btns: btnType[] = [
  { src: '/icon/github.png', url: 'https://github.com/yourname', id: 1 },
  { src: '/icon/gitee.png', url: 'https://gitee.com/yourname', id: 2 },
  { src: '/icon/weibo.png', url: 'https://weibo.com/yourname', id: 3 },
  { src: '/icon/leetcode.png', url: 'https://leetcode.cn/u/yourname', id: 4 },
  { src: '/icon/bilibili.png', url: 'https://space.bilibili.com/yourid', id: 5 },
];

// 再定义 hiro
const hiro: hiroType = {
  TextH1: "Hi,here is RyaoVen.",
  TextSpan: "I won't stop.",
  tags,
  btns,
};
</script>

<template>
  <div :class="$style.body">

    <IndexHiro
        :hiro="hiro"
    />

    <el-button :icon="ArrowDownBold" circle style="margin-top: -120px;" @click="click()"/>

    <el-divider/>

    <div :class="$style.sectionContainer">

      <div :class="$style.articles">
        <div style="display: flex; flex-direction: column; align-items: start; gap: 10px;">
          <h1 :class="$style.sectionTitle">
            最近
          </h1>
          <div :class="$style.articlesContainer">
            <IndexArticleCard
                v-for="(article, index) in articles"
                :key="index"
                :article="article"
            />
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: start; gap: 10px;">
          <h1 :class="$style.sectionTitle">
            最热
          </h1>
          <IndexHotPassageCard
              :hotPassage="hotPassage"
          />
        </div>
      </div>
    </div>
  </div>

  <el-divider/>

  <div :class="$style.sectionContainer">
    <div :class="$style.sectionHeader">
      <h2 :class="$style.sectionTitle">友链</h2>
    </div>
    <div :class="$style.friendLinksWrapper">
      <div :class="$style.friendLinksContainer">
        <IndexFriendLinkCard
            v-for="(link, index) in friendLinks"
            :key="index"
            :friendLink="link"
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
  justify-content: center;
  min-height: 100vh;
  transition: background 0.3s ease;
}

.sectionContainer {

  width: 80vw;
  max-width: 1200px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sectionHeader {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.sectionTitle {
  font-size: 32px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin-left: 4px;
  letter-spacing: -0.5px;
}


.articles {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4vw;
}

.articlesContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.friendLinksWrapper {
  width: 100%;
  background: var(--el-bg-color-overlay);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
}

.friendLinksContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 0;
}
</style>