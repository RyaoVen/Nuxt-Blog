<script setup lang="ts">
import { ref } from 'vue';
import { Star } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { Comment } from '~/stores/type/passages/detail';

const props = defineProps<{
  comments: Comment[];
}>();

const emit = defineEmits<{
  (e: 'submitComment', content: string): void;
  (e: 'submitReply', commentId: number, content: string): void;
  (e: 'likeComment', comment: Comment): void;
}>();

const newComment = ref('');
const replyingTo = ref<number | null>(null);
const replyContent = ref('');

const submitComment = () => {
  if (!newComment.value.trim()) return;
  emit('submitComment', newComment.value);
  newComment.value = '';
};

const submitReply = (commentId: number) => {
  if (!replyContent.value.trim()) return;
  emit('submitReply', commentId, replyContent.value);
  replyContent.value = '';
  replyingTo.value = null;
};

const showReplyBox = (commentId: number) => {
  replyingTo.value = commentId;
  replyContent.value = '';
};

const cancelReply = () => {
  replyingTo.value = null;
  replyContent.value = '';
};
</script>

<template>
  <section :class="$style.commentsSection">
    <div :class="$style.commentsHeader">
      <h3 :class="$style.commentsTitle">评论 ({{ comments.length }})</h3>
    </div>

    <!-- 发表评论 -->
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
          <el-button @click="submitComment" plain>发表评论</el-button>
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div :class="$style.commentsList">
      <div
        v-for="comment in comments"
        :key="comment.id"
        :class="$style.commentItem"
      >
        <el-avatar :size="44" :src="comment.author.avatar" :class="$style.commentAvatar" />
        <div :class="$style.commentContent">
          <div :class="$style.commentHeader">
            <span :class="$style.commentAuthor">{{ comment.author.name }}</span>
            <span :class="$style.commentDate">{{ comment.date }}</span>
          </div>
          <p :class="$style.commentText">{{ comment.content }}</p>
          <div :class="$style.commentActions">
            <button :class="$style.actionBtn" @click="$emit('likeComment', comment)">
              <el-icon><Star /></el-icon>
              <span>{{ comment.likes }}</span>
            </button>
            <button :class="$style.actionBtn" @click="showReplyBox(comment.id)">
              <span>回复</span>
            </button>
          </div>

          <!-- 回复框 -->
          <div v-if="replyingTo === comment.id" :class="$style.replyForm">
            <el-input
              v-model="replyContent"
              type="textarea"
              :rows="3"
              placeholder="写下你的回复..."
            />
            <div :class="$style.replyActions">
              <el-button size="small" @click="cancelReply">取消</el-button>
              <el-button size="small" type="primary" @click="submitReply(comment.id)">回复</el-button>
            </div>
          </div>

          <!-- 回复列表 -->
          <div v-if="comment.replies && comment.replies.length > 0" :class="$style.repliesList">
            <div
              v-for="reply in comment.replies"
              :key="reply.id"
              :class="$style.replyItem"
            >
              <el-avatar :size="32" :src="reply.author.avatar" />
              <div :class="$style.replyContent">
                <div :class="$style.replyHeader">
                  <span :class="$style.replyAuthor">{{ reply.author.name }}</span>
                  <span :class="$style.replyDate">{{ reply.date }}</span>
                </div>
                <p :class="$style.replyText">{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.commentsSection {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.commentsHeader {
  margin-bottom: 24px;
}

.commentsTitle {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0;
}

.commentForm {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.formContent {
  flex: 1;
}

.commentInput :deep(.el-textarea__inner) {
  background: var(--el-fill-color-light);
  border: none;
  padding: 12px;
  font-size: 14px;
}

.commentInput :deep(.el-textarea__inner):focus {
  background: var(--el-bg-color);
  box-shadow: 0 0 0 1px var(--el-color-primary);
}

.formActions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.commentsList {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.commentItem {
  display: flex;
  gap: 16px;
}

.commentContent {
  flex: 1;
}

.commentHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.commentAuthor {
  font-weight: 600;
  color: var(--el-text-color-primary);
  font-size: 15px;
}

.commentDate {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.commentText {
  font-size: 15px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.commentActions {
  display: flex;
  gap: 16px;
}

.actionBtn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  padding: 0;
  transition: color 0.2s;
}

.actionBtn:hover {
  color: var(--el-color-primary);
}

.replyForm {
  margin-top: 16px;
  background: var(--el-fill-color-lighter);
  padding: 16px;
  border-radius: 8px;
}

.replyActions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.repliesList {
  margin-top: 16px;
  background: var(--el-fill-color-lighter);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.replyItem {
  display: flex;
  gap: 12px;
}

.replyContent {
  flex: 1;
}

.replyHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.replyAuthor {
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.replyDate {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.replyText {
  font-size: 14px;
  color: var(--el-text-color-regular);
  margin: 0;
  line-height: 1.5;
}
</style>
