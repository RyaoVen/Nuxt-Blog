<script setup lang="ts">
import { ref } from 'vue';
import { Link, Star, ChatDotRound, Share } from '@element-plus/icons-vue';
import type { Moment } from '~/stores/type/moments';
import MomentsStore from '~/stores/moments';

const props = defineProps<{
  moment: Moment;
}>();

const emit = defineEmits<{
  (e: 'like', moment: Moment): void;
  (e: 'submitComment', momentId: number, content: string): void;
}>();

const momentsStore = MomentsStore();
const newComment = ref('');

// 格式化时间
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;

  return dateStr;
};

function showCommentBox(id: number) {
  if (momentsStore.commentTo != id) {
    momentsStore.commentTo = id;
  } else {
    momentsStore.commentTo = null;
  }
}

const submitComment = () => {
  if (!newComment.value.trim()) return;
  emit('submitComment', props.moment.id, newComment.value);
  newComment.value = '';
};
</script>

<template>
  <div :class="$style.momentCard">
    <el-avatar :class="$style.momentAvatar" :size="48" :src="moment.author.avatar"/>

    <div :class="$style.momentContent">
      <div :class="$style.momentHeader">
        <span :class="$style.momentAuthor">{{ moment.author.name }}</span>
        <span :class="$style.momentDate">{{ formatDate(moment.date) }}</span>
      </div>

      <p :class="$style.momentText">{{ moment.content }}</p>

      <div v-if="moment.images && moment.images.length" :class="$style.imagesGrid">
          <el-image 
            v-for="(img, idx) in moment.images" 
            :key="idx" 
            :src="img" 
            :preview-src-list="moment.images"
            :initial-index="idx"
            :preview-teleported="true"
            :class="$style.momentImage"
            fit="cover"
          />
      </div>

      <!-- 链接卡片 -->
      <div v-if="moment.link" :class="$style.linkCard">
        <div :class="$style.linkIcon">
          <el-icon :size="24">
            <Link/>
          </el-icon>
        </div>
        <div :class="$style.linkInfo">
          <span :class="$style.linkTitle">{{ moment.link.title }}</span>
          <span :class="$style.linkUrl">{{ moment.link.url }}</span>
        </div>
      </div>

      <!-- 动态操作 -->
      <div :class="$style.momentActions">
        <button :class="$style.actionBtn" @click="$emit('like', moment)">
          <el-icon>
            <Star/>
          </el-icon>
          <span>{{ moment.likes }}</span>
        </button>
        <button :class="$style.actionBtn" @click="showCommentBox(moment.id)">
          <el-icon>
            <ChatDotRound/>
          </el-icon>
          <span>{{ moment.comments.length }}</span>
        </button>
        <button :class="$style.actionBtn">
          <el-icon>
            <Share/>
          </el-icon>
          <span>分享</span>
        </button>
      </div>

      <div v-if="momentsStore.commentTo === moment.id">
        <div :class="$style.commentForm">
          <el-avatar :size="40" src="/Avatar.jpg" />
          <div :class="$style.formContent">
            <el-input
                v-model="newComment"
                type="textarea"
                :rows="4"
                placeholder="写下你的评论..."
                :class="$style.commentInput"
            />
            <div :class="$style.formActions">
              <el-button plain @click="submitComment" >发表评论</el-button>
            </div>
          </div>
        </div>
        <div
            v-for="cmt in moment.comments"
            :key="cmt.id"
            style="display: flex; flex-direction: row;gap: 10px;width: 100%;margin-top: 10px;"
        >
          <el-avatar
              :size="32"
              :src="cmt.author.avatar"
          />
          <div style="display:flex;flex-direction: column;width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center;margin-bottom: 8px;">
              <span :class="$style.momentAuthor">{{ cmt.author.name }}</span>
              <span :class="$style.momentDate">{{ cmt.date }}</span>
            </div>
            <p :class="$style.momentText">{{ cmt.content }}</p>
          </div>
        </div>
        
        <div v-if="moment.comments.length > 10" style="margin-top: 10px;">
          <el-pagination
              :page-size="10"
              :total="50"
              background
              layout="prev, pager, next"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.momentCard {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);
  transition: all 0.3s ease;
}

.momentCard:hover {
  box-shadow: var(--el-box-shadow);
}

.momentAvatar {
  flex-shrink: 0;
}

.momentContent {
  flex: 1;
  min-width: 0;
}

.momentHeader {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.momentAuthor {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.momentDate {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.momentText {
  font-size: 15px;
  color: var(--el-text-color-regular);
  line-height: 1.7;
  margin: 0 0 16px 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.imagesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.momentImage {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  cursor: pointer;
}

.linkCard {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--el-fill-color-light);
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
}

.linkIcon {
  width: 48px;
  height: 48px;
  background: var(--el-bg-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
}

.linkInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.linkTitle {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.linkUrl {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.momentActions {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.actionBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.actionBtn:hover {
  color: var(--el-color-primary);
  background: var(--el-fill-color-light);
}

.commentForm {
  margin-top: 20px;
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.formContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.commentInput :global(.el-textarea__inner) {
  border-radius: 12px;
  border: 1px solid var(--el-border-color);
  padding: 12px 16px;
  font-size: 14px;
  background-color: var(--el-fill-color-blank);
  color: var(--el-text-color-regular);
  transition: all 0.3s ease;
}

.commentInput :global(.el-textarea__inner):focus {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 3px var(--el-color-primary-light-9);
}

.formActions {
  display: flex;
  justify-content: flex-end;
}
</style>
