<script setup lang="ts">
import {
  ArrowDownBold,
    
} from '@element-plus/icons-vue'

const TextH1:string = "Hi,here is RyaoVen."
const TextSpan:string = "I won't stop."
import { ref, onMounted } from 'vue';
import CardPassage from "~/components/CardPassage.vue";

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

  <div :class="$style.passages">
    <CardPassage />
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
.passages{
  height: 100vh;
  width: 68vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>