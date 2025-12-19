<template>
  <div :class="$style.body">
    <NuxtLayout>
      <NuxtPage />
      <div :class="$style.routingOverlay" v-if="isRouting">
        <div :class="$style.routingInner">
          <el-skeleton :loading="true" animated :rows="6" :class="$style.skeleton" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isRouting = ref(false)
const nuxtApp = useNuxtApp()

// 使用 Nuxt 钩子控制加载状态
nuxtApp.hook('page:start', () => {
  isRouting.value = true
})

nuxtApp.hook('page:finish', () => {
  // 适当缩短延迟，确保页面已经准备好
  setTimeout(() => {
    isRouting.value = false
  }, 500)
})
</script>

<style module>
.body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

.routingOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: var(--el-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}

/* 配合 Vue Transition 的类名（如果使用了 Transition 组件） */
/* 但这里我们使用 v-if，直接移除可能比较生硬。
   为了简单有效，我们可以保留 v-if，但在移除前通过 class 控制 opacity。
   或者更简单：让它自然消失，因为有了 skeleton 动画。
   当前问题主要是内容不显示，优先解决内容显示问题。
*/

.routingInner {
  width: min(1200px, 90vw);
  padding: 40px;
  background: linear-gradient(180deg, var(--el-bg-color) 0%, var(--el-bg-color-page) 100%);
  border-radius: 16px;
  /* 使用 keyframes 动画 */
  animation: routeFadeUp 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
}

.skeleton {
  width: 100%;
}

@keyframes routeFadeUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

