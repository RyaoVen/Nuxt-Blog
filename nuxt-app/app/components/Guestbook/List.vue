<script setup lang="ts">
import { Star } from '@element-plus/icons-vue';
import type { GuestbookMessage } from '~/stores/type/guestbook/message';

defineProps<{
  messages: GuestbookMessage[];
}>();

defineEmits<{
  (e: 'like', message: GuestbookMessage): void;
}>();
</script>

<template>
  <div :class="$style.messagesList">
    <h3 :class="$style.listTitle">全部留言 ({{ messages.length }})</h3>

    <div :class="$style.messagesGrid">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="$style.messageCard"
      >
        <div :class="$style.messageHeader">
          <el-avatar :size="56" :src="message.author.avatar" />
          <div :class="$style.messageAuthor">
            <span :class="$style.authorName">{{ message.author.name }}</span>
            <div :class="$style.authorMeta">
              <span :class="$style.authorLocation">{{ message.author.location }}</span>
              <span :class="$style.messageDot">·</span>
              <span :class="$style.messageDate">{{ message.date }}</span>
            </div>
          </div>
        </div>

        <p :class="$style.messageContent">{{ message.content }}</p>

        <div :class="$style.messageFooter">
          <button :class="$style.likeBtn" @click="$emit('like', message)">
            <el-icon><Star /></el-icon>
            <span>{{ message.likes }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.messagesList {
  background: var(--el-bg-color-overlay);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}

.listTitle {
  font-size: 24px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 32px 0;
}

.messagesGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.messageCard {
  background: var(--el-fill-color-light);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.messageCard:hover {
  background: var(--el-bg-color-overlay);
  border-color: var(--el-color-primary-light-5);
  box-shadow: var(--el-box-shadow-light);
  transform: translateY(-2px);
}

.messageHeader {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.messageAuthor {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}

.authorName {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.authorMeta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.authorLocation {
  color: var(--el-text-color-secondary);
}

.messageDot {
  color: var(--el-border-color);
}

.messageDate {
  color: var(--el-text-color-placeholder);
}

.messageContent {
  font-size: 15px;
  color: var(--el-text-color-regular);
  line-height: 1.7;
  margin: 0 0 16px 0;
}

.messageFooter {
  display: flex;
  justify-content: flex-end;
}

.likeBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 20px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.likeBtn:hover {
  background: var(--el-color-primary);
  border-color: var(--el-color-primary);
  color: #fff;
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .messagesGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .messagesList {
    padding: 24px;
  }
}
</style>
