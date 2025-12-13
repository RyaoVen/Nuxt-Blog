<script setup lang="ts">
import type {MyselfHeaderData} from "~/stores/type/myself/header";
//TODO 工程化
//TODO 完成逻辑层编写
const props =defineProps<{
  header:MyselfHeaderData
}>()
const navigateTo = (path: string) => {
  window.location.href = path;
};
</script>

<template>
  <div :class="$style.pageHeader">
    <el-avatar :size="120" :src="header.AvatarSrc" :class="$style.avatar" />
    <h1 :class="$style.pageTitle">{{ header.Name }}</h1>
    <p :class="$style.pageDesc">{{ header.Desc }}</p>
    <div :class="$style.socialLinks">
      <el-button circle v-for="(src, index) in header.Btns" :key="index" @click="navigateTo(src.Link)">
        <img :src="src.ImgSrc" :class="$style.socialIcon" alt="links" />
      </el-button>
    </div>
  </div>
</template>

<style module>
/* 页面头部 */
.pageHeader {
  max-width: 1200px;
  margin: 0 auto 64px;
  text-align: center;
}

.avatar {
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 4px solid #fff;
}
.pageTitle {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: -1px;
}

.pageDesc {
  font-size: 18px;
  color: #666;
  margin: 0 0 24px 0;
}

.socialLinks {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.socialIcon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>