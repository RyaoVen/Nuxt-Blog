<template>
  <div :class="$style.passageCard">
    <img src="/Avatar.jpg" :class="$style.bgImage" />
    <div :class="$style.overlay"></div>
    <div :class="$style.content">
      <div :class="$style.title">测试标题</div>
      <div :class="$style.summary">这里面是一段测试用的内容</div>
    </div>
  </div>
</template>

<style module>
.passageCard {
  position: relative;
  width: 300px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.passageCard:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.bgImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.9;
  z-index: 1;
  transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.passageCard:hover .overlay {
  opacity: 0.7;
}

.content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 2;
  transition: bottom 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.passageCard:hover .content {
  bottom: 24px;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.passageCard:hover .title {
  transform: translateY(-4px);
}

/* 关键：summary 默认在下方隐藏 */
.summary {
  font-size: 1em;
  color: #606266;
  opacity: 0;
  transform: translateY(10px); /* 向下偏移 */
  transition:
      opacity 0.4s ease,
      transform 0.4s ease;
}

.passageCard:hover .summary {
  opacity: 1;
  transform: translateY(0); /* 滑入 */
}
</style>

<script setup lang="ts">
</script>