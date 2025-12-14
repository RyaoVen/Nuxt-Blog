<script setup lang="ts">
import type {hiroType} from "~/stores/type/index/hiro"
const props = defineProps<{
  hiro: hiroType
}>();

// 原始字符串（可自定义）
const originalText = props.hiro.TextH1;
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
    return {originalCode, currentCode, isAnimating: false};
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


</script>

<template>
  <div :class="$style.hero">

    <div :class="$style.heroText">
      <div :class="$style.container">
        <h1 :class="$style.h1">{{ currentText }}</h1>
        <div :class="$style.tags">
          <el-tag
              v-for="tag in hiro.tags"
              :effect="tag.effect"
              :type="tag.type"
              round
          >{{ tag.text }}
          </el-tag>
        </div>
        <span>{{ hiro.TextSpan }}</span>
        <div :class="$style.btns">
          <el-button v-for="btn in hiro.btns" :key="btn.id" circle @click="navigateTo(btn.url, { external: true })"><img :src="btn.src" /></el-button>
        </div>
      </div>
    </div>

    <div :class="$style.heroImg">
      <el-avatar :class="$style.avatar"
                 :size="235"
                 src="/Avatar.jpg"
      />

    </div>

  </div>
</template>

<style module>
.container h1 {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.container span {
  font-size: 18px;
  color: #666;
  font-weight: 400;
}

.avatar {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.btns {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.btns :global(.el-button) {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.btns :global(.el-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.btns :global(.el-button) img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.h1 {
  margin: 0;
  padding: 0;

}
.hero {
  height: 100vh;
  width: 68vw;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
}

.heroText {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.heroImg {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tags {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}
.tags :global(.el-tag) {
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #666;
  font-size: 13px;
  padding: 6px 14px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  justify-content: center;
}
</style>