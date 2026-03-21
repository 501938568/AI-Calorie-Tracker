<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Calendar } from 'lucide-vue-next'
import FoodSearch from './components/FoodSearch.vue'
import CalorieStats from './components/CalorieStats.vue'
import FoodTimeline from './components/FoodTimeline.vue'

// 简单的消息提示
const showToast = (msg, type = 'success') => {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// 当前日期
const currentDate = ref(new Date().toISOString().split('T')[0])

// 格式化日期显示
const formattedDate = computed(() => {
  const date = new Date(currentDate.value)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return '今天'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨天'
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
})

// 存储键名
const STORAGE_KEY = 'calorie_tracker_records'

// 从 localStorage 加载数据
function loadRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const allRecords = JSON.parse(data)
      return allRecords[currentDate.value] || []
    }
  } catch (e) {
    console.error('Failed to load records:', e)
  }
  return []
}

// 保存到 localStorage
function saveRecords(records) {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const allRecords = data ? JSON.parse(data) : {}
    allRecords[currentDate.value] = records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allRecords))
  } catch (e) {
    console.error('Failed to save records:', e)
  }
}

// 今日记录
const todayRecords = ref([])

// 加载数据
onMounted(() => {
  todayRecords.value = loadRecords()
})

// 监听日期变化
watch(currentDate, () => {
  todayRecords.value = loadRecords()
})

// 添加食物
function addFood(record) {
  todayRecords.value.push(record)
  saveRecords(todayRecords.value)
  showToast(`已添加 ${record.foodName} (${record.calories} kcal)`)
}

// 删除记录
function deleteRecord(recordId) {
  const index = todayRecords.value.findIndex(r => r.id === recordId)
  if (index > -1) {
    const deleted = todayRecords.value[index]
    todayRecords.value.splice(index, 1)
    saveRecords(todayRecords.value)
    showToast(`已删除 ${deleted.foodName}`, 'warning')
  }
}

// 日期切换
function prevDay() {
  const date = new Date(currentDate.value)
  date.setDate(date.getDate() - 1)
  currentDate.value = date.toISOString().split('T')[0]
}

function nextDay() {
  const date = new Date(currentDate.value)
  date.setDate(date.getDate() + 1)
  const next = date.toISOString().split('T')[0]
  const today = new Date().toISOString().split('T')[0]
  if (next <= today) {
    currentDate.value = next
  }
}

function goToToday() {
  currentDate.value = new Date().toISOString().split('T')[0]
}

// 是否是今天
const isToday = computed(() => {
  return currentDate.value === new Date().toISOString().split('T')[0]
})
</script>

<template>
  <div class="app-background"></div>
  <div class="decorative-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <div class="app-container">
    <!-- Header -->
    <header class="app-header glass-card">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">🍽️</span>
          <span class="logo-text">热量追踪</span>
        </div>
      </div>

      <div class="date-nav">
        <button class="nav-btn" @click="prevDay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button class="date-display" @click="goToToday">
          <Calendar :size="18" />
          <span>{{ formattedDate }}</span>
          <span class="date-weekday">{{ new Date(currentDate).toLocaleDateString('zh-CN', { weekday: 'short' }) }}</span>
        </button>

        <button class="nav-btn" @click="nextDay" :disabled="isToday">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <div class="main-grid">
        <!-- 左侧：搜索和记录 -->
        <div class="left-column">
          <!-- 日期选择器 -->
          <div class="date-picker-card glass-card">
            <input
              type="date"
              v-model="currentDate"
              class="date-input"
            />
          </div>

          <!-- 搜索卡片 -->
          <div class="search-card glass-card">
            <FoodSearch
              mealType="snack"
              @add-food="addFood"
            />
          </div>

          <!-- 记录时间线 -->
          <div class="timeline-card glass-card">
            <FoodTimeline
              :records="todayRecords"
              @delete-record="deleteRecord"
            />
          </div>
        </div>

        <!-- 右侧：统计 -->
        <div class="right-column">
          <div class="stats-sticky">
            <CalorieStats :records="todayRecords" />
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>数据仅存储在本地浏览器中</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  margin: 20px 24px 0;
  border-radius: var(--radius-lg);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.date-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.date-display {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.date-display:hover {
  background: rgba(255, 255, 255, 0.15);
}

.date-weekday {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
}

.app-main {
  flex: 1;
  padding: 24px;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-column {
  position: relative;
}

.stats-sticky {
  position: sticky;
  top: 24px;
}

.date-picker-card {
  padding: 16px 20px;
  display: flex;
  justify-content: center;
}

.date-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-display);
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;
}

.date-input:hover {
  background: rgba(255, 255, 255, 0.1);
}

.date-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

.search-card {
  padding: 24px;
}

.timeline-card {
  padding: 24px;
}

.app-footer {
  padding: 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .right-column {
    order: -1;
  }

  .stats-sticky {
    position: static;
  }
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: 16px;
    margin: 12px;
    padding: 16px;
  }

  .app-main {
    padding: 12px;
  }

  .logo-text {
    font-size: 18px;
  }

  .date-display {
    padding: 8px 14px;
    font-size: 14px;
  }

  .date-weekday {
    display: none;
  }
}

/* Toast 提示样式 */
.toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  z-index: 9999;
  animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s forwards;
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.toast-success {
  background: rgba(0, 255, 136, 0.2);
  color: var(--success);
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
}

.toast-warning {
  background: rgba(255, 170, 0, 0.2);
  color: var(--warning);
  box-shadow: 0 4px 20px rgba(255, 170, 0, 0.3);
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}
</style>
