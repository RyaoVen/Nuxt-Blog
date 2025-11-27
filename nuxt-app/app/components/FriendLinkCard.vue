<script setup lang="ts">
const props = defineProps({
  avatar: {
    type: String,
    default: "/images/default-avatar.jpg"
  },
  siteName: {
    type: String,
    default: "网站名称"
  },
  ownerName: {
    type: String,
    default: "站主名称"
  },
  description: {
    type: String,
    default: "网站简介"
  },
  screenshot: {
    type: String,
    default: "/images/default-screenshot.jpg"
  },
  url: {
    type: String,
    default: "#"
  }
})
</script>

<template>
  <a :href="url" target="_blank" :class="$style.card">
    <div :class="$style.screenshotContainer">
      <img :src="screenshot" :class="$style.screenshot" alt="网站截图" />
      <div :class="$style.overlay">
        <span :class="$style.visitText">访问网站</span>
      </div>
    </div>
    <div :class="$style.content">
      <div :class="$style.siteInfo">
        <img :src="avatar" :class="$style.avatar" alt="站主头像" />
        <div :class="$style.nameContainer">
          <h4 :class="$style.siteName">{{ siteName }}</h4>
          <span :class="$style.ownerName">{{ ownerName }}</span>
        </div>
      </div>
      <p :class="$style.description">{{ description }}</p>
    </div>
  </a>
</template>

<style module>
.card {
  width: 280px;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 12px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.screenshotContainer {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.visitText {
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 20px;
}

.card:hover .screenshot {
  transform: scale(1.05);
}

.card:hover .overlay {
  opacity: 1;
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.siteInfo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f5f5f5;
}

.nameContainer {
  display: flex;
  flex-direction: column;
}

.siteName {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.ownerName {
  font-size: 12px;
  color: #888;
}

.description {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>