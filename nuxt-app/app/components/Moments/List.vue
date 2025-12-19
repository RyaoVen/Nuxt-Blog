<script setup lang="ts">
import type { Moment } from '~/stores/type/moments';

defineProps<{
  moments: Moment[];
}>();

defineEmits<{
  (e: 'like', moment: Moment): void;
  (e: 'submitComment', momentId: number, content: string): void;
}>();
</script>

<template>
  <div :class="$style.momentsList">
    <MomentsCard
      v-for="moment in moments"
      :key="moment.id"
      :moment="moment"
      @like="$emit('like', $event)"
      @submitComment="(id, content) => $emit('submitComment', id, content)"
    />
  </div>
</template>

<style module>
.momentsList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
