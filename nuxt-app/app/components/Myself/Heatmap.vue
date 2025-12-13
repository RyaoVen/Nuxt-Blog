<script setup lang="ts">
//import type {Heatmap} from "~/stores/type/heatmap";

// const props = defineProps<{
//heatmap: Heatmap;
// }>()


// 文章热力图数据（模拟一年的数据）
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1); // 今年1月1日

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // 随机生成文章数量（0-5篇）
    const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;

    data.push({
      date: date.toISOString().split('T')[0],
      count: count
    });
  }

  return data;
};

const heatmapData = ref(generateHeatmapData());

// 获取热力图颜色
const getHeatmapColor = (count: number) => {
  if (count === 0) return '#ebedf0';
  if (count === 1) return '#c6e48b';
  if (count === 2) return '#7bc96f';
  if (count === 3) return '#239a3b';
  return '#196127';
};


// 按周分组热力图数据
const heatmapWeeks = computed(() => {
  const weeks: any[] = [];
  let currentWeek: any[] = [];

  heatmapData.value.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();

    if (index === 0 && dayOfWeek !== 0) {
      // 填充第一周的空白
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }

    currentWeek.push(day);

    if (dayOfWeek === 6 || index === heatmapData.value.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return weeks;
});

// 统计数据
const stats = computed(() => {
  const totalArticles = heatmapData.value.reduce((sum, day) => sum + day.count, 0);
  const activeDays = heatmapData.value.filter(day => day.count > 0).length;
  const maxStreak = calculateMaxStreak();

  return {
    totalArticles,
    activeDays,
    maxStreak
  };
});

// 计算最长连续天数
const calculateMaxStreak = () => {
  let maxStreak = 0;
  let currentStreak = 0;

  heatmapData.value.forEach(day => {
    if (day.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return maxStreak;
};

</script>

<template>
  <section :class="$style.section">
    <h2 :class="$style.sectionTitle">文章更新热力图</h2>
    <div :class="$style.heatmapStats">
      <div :class="$style.statItem">
        <span :class="$style.statValue">{{ stats.totalArticles }}</span>
        <span :class="$style.statLabel">今年文章</span>
      </div>
      <div :class="$style.statItem">
        <span :class="$style.statValue">{{ stats.activeDays }}</span>
        <span :class="$style.statLabel">活跃天数</span>
      </div>
      <div :class="$style.statItem">
        <span :class="$style.statValue">{{ stats.maxStreak }}</span>
        <span :class="$style.statLabel">最长连续</span>
      </div>
    </div>

    <div :class="$style.heatmapContainer">
      <div :class="$style.heatmapGrid">
        <div v-for="(week, weekIndex) in heatmapWeeks" :key="weekIndex" :class="$style.heatmapWeek">
          <div
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              :class="$style.heatmapDay"
              :style="{ background: day ? getHeatmapColor(day.count) : 'transparent' }"
              :title="day ? `${day.date}: ${day.count} 篇文章` : ''"
          ></div>
        </div>
      </div>
      <div :class="$style.heatmapLegend">
        <span :class="$style.legendLabel">少</span>
        <div :class="$style.legendItem" style="background: #ebedf0;"></div>
        <div :class="$style.legendItem" style="background: #c6e48b;"></div>
        <div :class="$style.legendItem" style="background: #7bc96f;"></div>
        <div :class="$style.legendItem" style="background: #239a3b;"></div>
        <div :class="$style.legendItem" style="background: #196127;"></div>
        <span :class="$style.legendLabel">多</span>
      </div>
    </div>
  </section>
</template>

<style module>
.section {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.sectionTitle {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}
/* 热力图 */
.heatmapStats {
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.statValue {
  font-size: 32px;
  font-weight: 700;
  color: #3498db;
}

.statLabel {
  font-size: 13px;
  color: #999;
}

.heatmapContainer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.heatmapGrid {
  display: flex;
  gap: 3px;
  overflow-x: auto;
  padding: 4px;
}

.heatmapWeek {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.heatmapDay {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.heatmapDay:hover {
  transform: scale(1.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.heatmapLegend {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.legendLabel {
  font-size: 12px;
  color: #999;
}

.legendItem {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
</style>