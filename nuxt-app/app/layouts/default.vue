<script setup lang="ts">

</script>

<template>
  <div :class="$style.body">
    <div :class="$style.header">
      <PageLayoutHeader />
    </div>
    <div :class="$style.main">
      <slot/>
    </div>
    <PageLayoutFooter/>
  </div>
</template>

<style module>
.body{
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header{
  padding: 0;
  margin: 0;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2000;
}
.main {
  flex: 1;
  position: relative;
  margin-top: 64px;
  width: 100%;
}
</style>