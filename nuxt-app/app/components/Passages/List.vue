<script setup lang="ts">
import type { Passage } from '~/stores/type/passages';

defineProps<{
  articles: Passage[];
}>();

defineEmits<{
  (e: 'click', id: number): void;
}>();
</script>

<template>
  <div :class="$style.articleList">
    <PassagesArticleCard
      v-for="article in articles"
      :key="article.id"
      :article="article"
      @click="$emit('click', $event)"
    />
  </div>
</template>

<style module>
.articleList {
  display: flex;
  flex-direction: column;
}
</style>
