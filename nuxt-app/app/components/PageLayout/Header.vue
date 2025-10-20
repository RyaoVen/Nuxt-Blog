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

  background-color: aqua;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
border-bottom:1px solid rgba(128, 128, 128, 0.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.btns{

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background-color: rgb(249, 247, 243); /* 白色半透明背景 */
  padding: 3px 13px;
}
.btns1{
  margin-left: auto;
}
.logo{
  width: 80px;
  height: 44px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: 2vw;
}
</style>