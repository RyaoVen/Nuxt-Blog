<script lang="ts" setup>

</script>

<template>
  <div :class="$style.body">
    <div :class="$style.linksList">
    <span>也许你想去：</span>
      <NuxtLink :class="$style.links" to="/">
        首页
      </NuxtLink>
    </div>
    <div :class="$style.linksList">
      <span>也许你想去：</span>
      <NuxtLink :class="$style.links" to="/">
        首页
      </NuxtLink>
    </div>
    <div :class="$style.linksList">
      <span>也许你想知道：</span>
      <NuxtLink :class="$style.links" to="/">
        首页
      </NuxtLink>
    </div>
    <div :class="$style.linksList">
      <span>也许你想联系我：</span>
      <span>
        -->
        <NuxtLink :class="$style.links" to="/">
        首页
      </NuxtLink>
      </span>

    </div>

  </div>
</template>

<style module>
.body {
  background-color: #0098fd;
  height: 10vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.links {
  text-decoration: none;
}

.linksList {
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
</style>