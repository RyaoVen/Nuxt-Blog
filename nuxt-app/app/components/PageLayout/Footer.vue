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
  background-color: #2c3e50;
  height: 12vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #ecf0f1;
  padding: 20px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.links {
  text-decoration: none;
  color: #ecf0f1;
  position: relative;
  padding: 2px 0;
  font-weight: 500;
  transition: color 0.3s ease;
  overflow: hidden;
}

.links::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3498db;
  transition: width 0.3s ease;
  transform-origin: left;
}

.links:hover {
  color: #3498db;
}

.links:hover::after {
  width: 100%;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.8);
}

.linksList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 8px;
  padding: 10px;
  transition: transform 0.3s ease;
}

.linksList:hover {
  transform: translateY(-3px);
}

.linksList span {
  margin-bottom: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>