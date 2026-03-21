<script setup>
import { computed, ref, watch } from 'vue'
import { Flame, Target, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

// 默认目标热量
const targetCalories = ref(2000)

// 计算总热量
const totalCalories = computed(() => {
  return props.records.reduce((sum, record) => sum + record.calories, 0)
})

// 计算营养素总量
const totalProtein = computed(() => {
  return Math.round(props.records.reduce((sum, record) => sum + record.protein, 0) * 10) / 10
})

const totalFat = computed(() => {
  return Math.round(props.records.reduce((sum, record) => sum + record.fat, 0) * 10) / 10
})

const totalCarbs = computed(() => {
  return Math.round(props.records.reduce((sum, record) => sum + record.carbs, 0) * 10) / 10
})

// 热量进度
const calorieProgress = computed(() => {
  if (targetCalories.value === 0) return 0
  return Math.min((totalCalories.value / targetCalories.value) * 100, 100)
})

// 剩余/超标热量
const remainingCalories = computed(() => {
  return targetCalories.value - totalCalories.value
})

const isOverTarget = computed(() => remainingCalories.value < 0)

// 营养素比例计算
const totalMacro = computed(() => {
  return totalProtein.value + totalFat.value + totalCarbs.value
})

const proteinPercent = computed(() => {
  if (totalMacro.value === 0) return 0
  return (totalProtein.value / totalMacro.value) * 100
})

const fatPercent = computed(() => {
  if (totalMacro.value === 0) return 0
  return (totalFat.value / totalMacro.value) * 100
})

const carbsPercent = computed(() => {
  if (totalMacro.value === 0) return 0
  return (totalCarbs.value / totalMacro.value) * 100
})

// 动画数字
const displayedCalories = ref(0)

watch(totalCalories, (newVal) => {
  const start = displayedCalories.value
  const diff = newVal - start
  const duration = 400
  const startTime = performance.now()

  function animate(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    displayedCalories.value = Math.round(start + diff * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}, { immediate: true })
</script>

<template>
  <div class="calorie-stats">
    <!-- 总热量卡片 -->
    <div class="main-stat-card glass-card">
      <div class="stat-header">
        <Flame :size="24" class="flame-icon" />
        <span>今日摄入</span>
      </div>

      <div class="calorie-display">
        <span class="calorie-number">{{ displayedCalories.toLocaleString() }}</span>
        <span class="calorie-unit">kcal</span>
      </div>

      <!-- 环形进度 -->
      <div class="circular-progress-wrapper">
        <svg class="progress-ring" viewBox="0 0 120 120">
          <circle
            class="progress-ring-bg"
            cx="60"
            cy="60"
            r="52"
          />
          <circle
            class="progress-ring-fill"
            cx="60"
            cy="60"
            r="52"
            :stroke-dasharray="326.7"
            :stroke-dashoffset="326.7 - (326.7 * calorieProgress / 100)"
            :class="{ over: isOverTarget }"
          />
        </svg>
        <div class="progress-center">
          <span class="progress-percent">{{ Math.round(calorieProgress) }}%</span>
        </div>
      </div>

      <!-- 目标信息 -->
      <div class="target-info">
        <Target :size="16" />
        <span>目标 {{ targetCalories.toLocaleString() }} kcal</span>
      </div>

      <!-- 剩余/超标提示 -->
      <div
        class="remaining-info"
        :class="{ over: isOverTarget, under: !isOverTarget }"
      >
        <AlertCircle :size="18" />
        <span v-if="isOverTarget">
          已超标 {{ Math.abs(remainingCalories).toLocaleString() }} kcal
        </span>
        <span v-else>
          剩余 {{ remainingCalories.toLocaleString() }} kcal
        </span>
      </div>
    </div>

    <!-- 营养素分解 -->
    <div class="macro-card glass-card">
      <h3 class="macro-title">营养素分解</h3>

      <div class="macro-bar">
        <div
          class="macro-bar-fill macro-protein"
          :style="{ width: `${proteinPercent}%` }"
        ></div>
        <div
          class="macro-bar-fill macro-fat"
          :style="{ width: `${fatPercent}%` }"
        ></div>
        <div
          class="macro-bar-fill macro-carbs"
          :style="{ width: `${carbsPercent}%` }"
        ></div>
      </div>

      <div class="macro-details">
        <div class="macro-item">
          <div class="macro-label">
            <span class="macro-dot protein"></span>
            <span>蛋白质</span>
          </div>
          <div class="macro-value">
            <span class="macro-grams">{{ totalProtein }}g</span>
            <span class="macro-percent">{{ Math.round(proteinPercent) }}%</span>
          </div>
        </div>

        <div class="macro-item">
          <div class="macro-label">
            <span class="macro-dot fat"></span>
            <span>脂肪</span>
          </div>
          <div class="macro-value">
            <span class="macro-grams">{{ totalFat }}g</span>
            <span class="macro-percent">{{ Math.round(fatPercent) }}%</span>
          </div>
        </div>

        <div class="macro-item">
          <div class="macro-label">
            <span class="macro-dot carbs"></span>
            <span>碳水</span>
          </div>
          <div class="macro-value">
            <span class="macro-grams">{{ totalCarbs }}g</span>
            <span class="macro-percent">{{ Math.round(carbsPercent) }}%</span>
          </div>
        </div>
      </div>

      <div class="macro-calories">
        <span>营养素热量</span>
        <span class="macro-cal-value">
          {{ Math.round(totalProtein * 4 + totalFat * 9 + totalCarbs * 4).toLocaleString() }} kcal
        </span>
      </div>
    </div>

    <!-- 目标设置 -->
    <div class="target-card glass-card">
      <h3 class="target-title">每日目标</h3>
      <div class="target-input-wrapper">
        <input
          v-model.number="targetCalories"
          type="number"
          class="glass-input target-input"
          min="500"
          max="5000"
          step="50"
        />
        <span class="target-unit">kcal</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calorie-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-stat-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
}

.flame-icon {
  color: #ff6b6b;
  animation: flicker 2s ease-in-out infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.calorie-display {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.calorie-number {
  font-family: var(--font-mono);
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.calorie-unit {
  font-size: 18px;
  color: var(--text-secondary);
}

.circular-progress-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
}

.progress-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 10;
}

.progress-ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-ring-fill.over {
  stroke: var(--danger);
}

.progress-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-percent {
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.target-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
}

.remaining-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
}

.remaining-info.under {
  background: rgba(0, 255, 136, 0.15);
  color: var(--success);
}

.remaining-info.over {
  background: rgba(255, 71, 87, 0.15);
  color: var(--danger);
}

.macro-card {
  padding: 24px;
}

.macro-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.macro-bar {
  display: flex;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.macro-bar-fill {
  height: 100%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.macro-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.macro-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.macro-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
}

.macro-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.macro-dot.protein { background: var(--protein-color); }
.macro-dot.fat { background: var(--fat-color); }
.macro-dot.carbs { background: var(--carbs-color); }

.macro-value {
  display: flex;
  align-items: center;
  gap: 12px;
}

.macro-grams {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.macro-percent {
  font-size: 13px;
  color: var(--text-muted);
  min-width: 36px;
  text-align: right;
}

.macro-calories {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: var(--text-secondary);
}

.macro-cal-value {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--text-primary);
}

.target-card {
  padding: 20px 24px;
}

.target-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.target-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.target-input {
  flex: 1;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 600;
}

.target-unit {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
