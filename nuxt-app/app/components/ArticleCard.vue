<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "文章标题"
  },
  author: {
    type: String,
    default: "作者"
  },
  date: {
    type: String,
    default: "2023-05-15"
  },
  category: {
    type: String,
    default: "分类"
  },
  tags: {
    type: Array,
    default: () => ["标签1", "标签2"]
  },
  summary: {
    type: String,
    default: "这是文章的简介，描述了文章的主要内容和亮点..."
  },
  coverImage: {
    type: String,
    default: "/images/default-cover.jpg"
  }
})
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.coverContainer">
      <img :src="coverImage" :class="$style.coverImage" alt="文章封面" />
      <div :class="$style.category">{{ category }}</div>
    </div>
    <div :class="$style.content">
      <h3 :class="$style.title">{{ title }}</h3>
      <p :class="$style.summary">{{ summary }}</p>
      <div :class="$style.meta">
        <div :class="$style.authorDate">
          <span :class="$style.author">{{ author }}</span>
          <span :class="$style.date">{{ date }}</span>
        </div>
        <div :class="$style.tags">
          <span v-for="(tag, index) in tags" :key="index" :class="$style.tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.card {
  width: 100%;
  max-width: 680px;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.coverContainer {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.coverImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .coverImage {
  transform: scale(1.05);
}

.category {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.summary {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.authorDate {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author {
  font-size: 13px;
  font-weight: 500;
  color: #444;
}

.date {
  font-size: 12px;
  color: #888;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  background-color: #f5f5f5;
  color: #666;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}
</style>