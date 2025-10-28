<script setup lang="ts">
const props= defineProps({
  text:{
    type:String,
    default:"Btn-1"
}
})
</script>

<template>
  <div :class="$style.containerTop"><span>{{text}}</span></div>
</template>

<style module>
.containerTop{

  height: 35px;
  width: 60px;
  border-radius: 18px;

  background-color: rgba(255, 255, 255, 0.2); /* 白色半透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊程度，数值越大越模糊 */
  -webkit-backdrop-filter: blur(10px); /* 兼容Safari */

  /* 增强质感：边框和阴影 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 半透明边框 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); /* 柔和阴影 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.235s ease
}
.containerTop:hover{
  background-color: rgba(255, 255, 255, 0.45); /* 白色半透明背景 */
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.6); /* 蓝色荧光效果 */
  transform: translateY(-2px);
}

.containerTop:hover span {
  color: #0078ff;
}
span{
  color: rgb(96, 96, 96);
  text-shadow:
      0 0 5px rgba(255, 255, 255, 0.9),
      0 0 10px rgba(255, 255, 255, 0.7),
      0 0 15px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.3);
}

</style>