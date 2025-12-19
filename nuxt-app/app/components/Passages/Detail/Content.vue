<script setup lang="ts">
import { 
  InfoFilled, SuccessFilled, WarningFilled, CircleCloseFilled, 
  ChatLineSquare, Link as LinkIcon 
} from '@element-plus/icons-vue';
import CodeBlock from '@/components/CodeBlock.vue';
import type { ContentSection } from '~/stores/type/passages/detail';

defineProps<{
  sections: ContentSection[];
}>();

const renderContent = (text: string) => {
  if (!text) return '';
  // Replace `code` with <code class="inline-code">code</code>
  return text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
};
</script>

<template>
  <article :class="$style.articleContent">
    <div :class="$style.markdown">
      <template v-for="(section, index) in sections" :key="index">
        <h1 v-if="section.type === 'heading' && section.level === 1" :class="$style.h1" :id="section.id">
          {{ section.text }}
        </h1>
        <h2 v-else-if="section.type === 'heading' && section.level === 2" :class="$style.h2" :id="section.id">
          {{ section.text }}
        </h2>
        <h3 v-else-if="section.type === 'heading' && section.level === 3" :class="$style.h3" :id="section.id">
          {{ section.text }}
        </h3>
        <h4 v-else-if="section.type === 'heading' && section.level === 4" :class="$style.h4" :id="section.id">
          {{ section.text }}
        </h4>
        <p v-else-if="section.type === 'paragraph'" :class="$style.paragraph" v-html="renderContent(section.text || '')">
        </p>
        
        <!-- Code Block -->
        <CodeBlock
          v-else-if="section.type === 'code'"
          :code="section.code || ''"
          :language="section.language || 'plaintext'"
        />
        
        <!-- Alert Block -->
        <div v-else-if="section.type === 'alert'" :class="[$style.alert, $style[section.variant || 'info']]">
          <div :class="$style.alertIcon">
            <el-icon v-if="section.variant === 'info'"><InfoFilled /></el-icon>
            <el-icon v-else-if="section.variant === 'success'"><SuccessFilled /></el-icon>
            <el-icon v-else-if="section.variant === 'warning'"><WarningFilled /></el-icon>
            <el-icon v-else-if="section.variant === 'error'"><CircleCloseFilled /></el-icon>
          </div>
          <div :class="$style.alertContent">
            <p v-if="section.title" :class="$style.alertTitle">{{ section.title }}</p>
            <p :class="$style.alertText">{{ section.content }}</p>
          </div>
        </div>

        <!-- Quote Block -->
        <blockquote v-else-if="section.type === 'quote'" :class="$style.quote">
          <el-icon :class="$style.quoteIcon"><ChatLineSquare /></el-icon>
          <div :class="$style.quoteBody">
            <p :class="$style.quoteContent">{{ section.content }}</p>
            <footer v-if="section.author" :class="$style.quoteAuthor">— {{ section.author }}</footer>
          </div>
        </blockquote>

        <!-- Link Card -->
        <a v-else-if="section.type === 'link-card'" :href="section.url" target="_blank" :class="$style.linkCard">
          <div v-if="section.image" :class="$style.linkImage">
            <img :src="section.image" :alt="section.title">
          </div>
          <div :class="$style.linkContent">
            <h4 :class="$style.linkTitle">{{ section.title }}</h4>
            <p :class="$style.linkDescription">{{ section.description }}</p>
            <span :class="$style.linkUrl">
              <el-icon><LinkIcon /></el-icon>
              {{ section.url }}
            </span>
          </div>
        </a>

        <ul v-else-if="section.type === 'list'" :class="$style.list">
          <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
        </ul>
      </template>
    </div>
  </article>
</template>

<style module>
.articleContent {
  margin-bottom: 60px;
}

.markdown {
  font-size: 16px;
  line-height: 1.8;
  color: var(--el-text-color-primary);
}

.h1, .h2, .h3, .h4 {
  color: var(--el-text-color-primary);
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: 700;
  line-height: 1.3;
  scroll-margin-top: 100px;
}

.h1 { font-size: 32px; border-bottom: 1px solid var(--el-border-color-lighter); padding-bottom: 12px; }
.h2 { font-size: 26px; }
.h3 { font-size: 22px; }
.h4 { font-size: 18px; }

.paragraph {
  margin-bottom: 20px;
  text-align: justify;
}

.list {
  margin-bottom: 20px;
  padding-left: 24px;
}

.list li {
  margin-bottom: 8px;
  list-style-type: disc;
}

/* Alert Styles */
.alert {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  margin: 24px 0;
  border-left: 4px solid;
}

.info { background: var(--el-color-primary-light-9); border-left-color: var(--el-color-primary); }
.success { background: var(--el-color-success-light-9); border-left-color: var(--el-color-success); }
.warning { background: var(--el-color-warning-light-9); border-left-color: var(--el-color-warning); }
.error { background: var(--el-color-danger-light-9); border-left-color: var(--el-color-danger); }

.alertIcon {
  font-size: 24px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.info .alertIcon { color: var(--el-color-primary); }
.success .alertIcon { color: var(--el-color-success); }
.warning .alertIcon { color: var(--el-color-warning); }
.error .alertIcon { color: var(--el-color-danger); }

.alertContent {
  flex: 1;
}

.alertTitle {
  font-weight: 700;
  margin: 0 0 4px 0;
  font-size: 16px;
}

.alertText {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
}

/* Quote Styles */
.quote {
  margin: 32px 0;
  padding: 24px 32px;
  background: var(--el-fill-color);
  border-radius: 12px;
  position: relative;
  border-left: 4px solid var(--el-color-primary);
}

.quoteIcon {
  position: absolute;
  top: -12px;
  left: 24px;
  font-size: 24px;
  color: var(--el-color-primary);
  background: var(--el-bg-color-overlay);
  padding: 4px;
  border-radius: 4px;
}

.quoteContent {
  font-size: 18px;
  font-style: italic;
  color: var(--el-text-color-regular);
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.quoteAuthor {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  text-align: right;
  font-weight: 500;
}

/* Link Card Styles */
.linkCard {
  display: flex;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  margin: 24px 0;
  transition: all 0.3s;
  background: var(--el-bg-color-overlay);
}

.linkCard:hover {
  border-color: var(--el-color-primary);
  box-shadow: var(--el-box-shadow-light);
}

.linkImage {
  width: 160px;
  flex-shrink: 0;
}

.linkImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.linkContent {
  padding: 16px;
  flex: 1;
  min-width: 0;
}

.linkTitle {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.linkDescription {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.linkUrl {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--el-color-primary);
}

@media (max-width: 768px) {
  .linkCard {
    flex-direction: column;
  }
  
  .linkImage {
    width: 100%;
    height: 120px;
  }
}
</style>
<style>
/* Inline Code Style */
.inline-code {
  background: var(--el-fill-color-darker);
  color: var(--el-color-danger);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  margin: 0 2px;
}
</style>
