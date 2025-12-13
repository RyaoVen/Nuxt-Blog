<script setup lang="ts">
import type {techStack} from "~/stores/type/myself/techStack";

const props = defineProps<{
  stack: techStack[];
}>();

function typeToText(type: string|null){
  if (type === 'success'){
    return '熟练';
  }
  if (type === 'warning'){
    return '入门';
  }
  if (type === 'info'){
    return '掌握';
  }
  if (type === 'danger'){
    return '理解';
  }
}

</script>

<template>
  <section :class="$style.sectionHalf">
    <h2 :class="$style.sectionTitle">技术栈</h2>
    <div :class="$style.StackList">
      <div v-for="part in stack" :key="part.title" >
        <h3 :class="$style.LTitle">{{ part.title }}</h3>

        <!-- 关键修复：把 v-if/v-else 放在 v-for 循环内部 -->
        <template v-for="(tech, category) in part.content" :key="category" >
          <!-- ✅ 重点：span 永远渲染，tooltip 仅当 tech.type 存在时包裹 -->
          <el-tooltip
              v-if="tech.type"
              :content="typeToText(tech.type)"
              placement="bottom"
              effect="light"
          >
        <span :class="[$style.tag, tech.type && $style[`tag--${tech.type}`]]">
          {{ tech.name }}
        </span>
          </el-tooltip>

          <!-- 没有 type 时直接显示 span -->
          <span
              v-else
              :class="[$style.tag, tech.type && $style[`tag--${tech.type}`]]"
          >
        {{ tech.name }}
      </span>
        </template>
      </div>
    </div>

  </section>
</template>

<style module>
.sectionHalf{
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  width: 47%;
}
/* 技术栈标签基础样式 */
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  margin: 0 0.5rem 0.5rem 0;
  transition: all 0.2s ease;
  cursor: pointer;
}

/* 悬停效果 */
.tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.LTitle{
  margin: 4px 2px;
  padding: 1px 2px;
  font-size: 20px;
}

.StackList{
  display: flex;
  flex-direction: column;
  gap: 8px;
}


/* 类型变体（背景/边框/文字色）*/
.tag--success {
  background-color: #ecfdf5;
  border-color: #a7f3d0;
  color: #065f46;
}

.tag--warning {
  background-color: #fffbeb;
  border-color: #fcd34d;
  color: #92400e;
}

.tag--danger {
  background-color: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}

.tag--info {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
</style>