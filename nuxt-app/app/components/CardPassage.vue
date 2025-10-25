<script setup lang="ts">
const props = defineProps({

})
</script>

<template>
  <div :class="$style.body">
    <h1>
      2023
    </h1>
  </div>
</template>

<style module>
.body{

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 225px;
  border-radius: 25px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.1);
  /* 参数解析：x偏移 y偏移 模糊半径 扩散半径 颜色（可选inset内阴影） */
  border: rgba(87, 87, 87, 0.15) solid 1px;
  background-color: #ffffff;
}
img{
  width: 20px;
}

</style>