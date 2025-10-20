<script setup lang="ts">

</script>

<template>
  <div :class="$style.body">
    <div :class="$style.header">
      <PageLayoutHeader />
    </div>
    <slot/>
    <PageLayoutFooter/>
  </div>
</template>

<style module>
.body{
  padding: 0;
  margin: 0;
}
.header{
  padding: 0;
  margin: 0;
  width: 100%;
  position: fixed;
}
</style>