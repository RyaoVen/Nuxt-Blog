<template>
  <div :class="$style.slogan">
    <h1 :class="$style.sloganText">欢迎回来</h1>
    <p :class="$style.sloganSub">探索精彩的世界</p>
  </div>
</template>

<style module>
.slogan {
  z-index: 1;
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 1s ease;
}

.sloganText {
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(45deg, var(--el-color-primary), #a18cd1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 10px 0;
  letter-spacing: -1px;
}

.sloganSub {
  font-size: 18px;
  color: var(--el-text-color-secondary);
  margin: 0;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
