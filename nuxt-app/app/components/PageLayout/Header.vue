<script setup lang="ts">
import {
  Moon,
  Sunny,
  Search,
  User,
} from '@element-plus/icons-vue'
const themeState = ref<'Sunny' | 'Moon'>('Sunny')
//切换主题按钮图标
function changeTheme() {
  themeState.value = (themeState.value === 'Sunny' ? 'Moon' : 'Sunny')
}
</script>

<template>
<div :class="$style.containerTop">
  <div :class="$style.logo">
  <span>
    RyaoVen
  </span>

  </div>
<div :class="$style.btns">
  <BasicComponentsBtn1 @click="()=>{console.log('clicked')}" text="首页"/>
  <BasicComponentsBtn1 @click="()=>{console.log('clicked')}" text="文章"/>
  <BasicComponentsBtn1 @click="()=>{console.log('clicked')}" text="归档"/>
  <BasicComponentsBtn1 @click="()=>{console.log('clicked')}" text="留言"/>
  <BasicComponentsBtn1 @click="()=>{console.log('clicked')}" text="闲话"/>
  <BasicComponentsBtn1 @click="()=>{console.log('clicked')}" text="关于"/>
</div>
  <div :class="$style.btns1">
    <el-button :icon="Search" circle />
    <el-button :icon="User" circle />
    <el-button :icon="themeState === 'Sunny' ? Moon : Sunny" @click="changeTheme()" circle />
  </div>
</div>
</template>

<style module>
.containerTop{
  background-color: #f8f9fa;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.btns{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 20px;
  background-color: rgba(249, 247, 243, 0.7); /* 白色半透明背景 */
  backdrop-filter: blur(5px);
  padding: 5px 18px;
  transition: all 0.3s ease;
}

/* 为BasicComponentsBtn1组件添加悬停效果 */
.btns :global(.containerTop) {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btns :global(.containerTop:hover) {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.6); /* 蓝色荧光效果 */
  border: 1px solid rgba(0, 120, 255, 0.4);
}

.btns :global(.containerTop:hover::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0, 120, 255, 0.2) 0%, transparent 70%);
  animation: glowPulse 1.5s infinite alternate;
}

@keyframes glowPulse {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.8;
  }
}

.btns1{
  margin-left: auto;
  margin-right: 2vw;
  display: flex;
  gap: 10px;
}

/* 为圆形按钮添加悬停效果 */
.btns1 :global(.el-button) {
  transition: all 0.3s ease;
}

.btns1 :global(.el-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(0, 120, 255, 0.6); /* 蓝色荧光效果 */
}

.logo{
  width: 80px;
  height: 44px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: 2vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.logo:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
</style>