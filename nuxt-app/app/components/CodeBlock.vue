<script setup lang="ts">
import { ref, computed } from 'vue';
import { CopyDocument, Check, ArrowDown, ArrowRight } from '@element-plus/icons-vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  code: string;
  language: string;
}>();

const isCollapsed = ref(false);
const isCopied = ref(false);

const highlightedCode = computed(() => {
  if (props.language && hljs.getLanguage(props.language)) {
    return hljs.highlight(props.code, { language: props.language }).value;
  }
  return hljs.highlightAuto(props.code).value;
});

const codeLines = computed(() => {
  return props.code.split('\n');
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    isCopied.value = true;
    ElMessage.success('代码已复制');
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    ElMessage.error('复制失败');
  }
};
</script>

<template>
  <div class="code-block-container" :class="{ collapsed: isCollapsed }">
    <div class="code-header">
      <div class="left-controls" @click="toggleCollapse">
        <el-icon class="collapse-icon">
          <ArrowRight v-if="isCollapsed" />
          <ArrowDown v-else />
        </el-icon>
        <span class="language-label">{{ language }}</span>
      </div>
      <div class="right-controls">
        <button class="copy-btn" @click.stop="copyCode" :title="isCopied ? '已复制' : '复制'">
          <el-icon v-if="isCopied"><Check /></el-icon>
          <el-icon v-else><CopyDocument /></el-icon>
        </button>
      </div>
    </div>
    <div class="code-body" v-show="!isCollapsed">
      <div class="line-numbers">
        <span v-for="(_, index) in codeLines" :key="index" class="line-number">{{ index + 1 }}</span>
      </div>
      <pre><code class="hljs" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-block-container {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  overflow: hidden;
  margin: 24px 0;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s ease;
}

/* ... existing header styles ... */
.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  user-select: none;
}

.left-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: color 0.2s;
}

.left-controls:hover {
  color: var(--el-text-color-primary);
}

.language-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
}

.collapse-icon {
  font-size: 14px;
}

.right-controls {
  display: flex;
  align-items: center;
}

.copy-btn {
  background: transparent;
  border: none;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:hover {
  background: var(--el-fill-color-light);
  color: var(--el-color-primary);
}

.code-body {
  padding: 24px;
  overflow-x: auto;
  display: flex;
  gap: 16px;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  text-align: right;
  user-select: none;
  color: var(--el-text-color-disabled);
  border-right: 1px solid var(--el-border-color-lighter);
  padding-right: 16px;
  min-width: 2em;
}

.line-number {
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.code-body pre {
  margin: 0;
  flex: 1;
}

.code-body code {
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  background: transparent;
  padding: 0;
  display: block;
}

.collapsed .code-body {
  display: none;
}
</style>
