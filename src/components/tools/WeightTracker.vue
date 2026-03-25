<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Props
const props = defineProps({
  initialDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
})

// Emit
const emit = defineEmits(['date-change'])

// 简单的消息提示
const showToast = (msg, type = 'success') => {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// 存储键名
const STORAGE_KEY = 'weight_tracker_records'

// 当前日期时间
const currentDate = ref(new Date().toISOString().split('T')[0])
const currentTime = ref(new Date().toTimeString().slice(0, 5))

// 输入的体重值
const weightInput = ref('')

// 记录列表
const records = ref([])

// 加载数据
function loadRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Failed to load records:', e)
  }
  return []
}

// 保存数据
function saveRecords(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save records:', e)
  }
}

// 添加记录
function addRecord() {
  const weight = parseFloat(weightInput.value)
  if (!weight || weight <= 0 || weight > 500) {
    showToast('请输入有效的体重值 (1-500kg)', 'warning')
    return
  }

  const dateTime = new Date(`${currentDate.value}T${currentTime.value}`)
  const record = {
    id: `weight_${Date.now()}`,
    weight: weight,
    date: currentDate.value,
    time: currentTime.value,
    timestamp: dateTime.getTime()
  }

  records.value.push(record)
  records.value.sort((a, b) => b.timestamp - a.timestamp)
  saveRecords(records.value)

  weightInput.value = ''
  showToast(`已记录 ${weight} kg`)
}

// 删除记录
function deleteRecord(recordId) {
  const index = records.value.findIndex(r => r.id === recordId)
  if (index > -1) {
    records.value.splice(index, 1)
    saveRecords(records.value)
    showToast('已删除记录', 'warning')
  }
}

// 计算统计数据
const stats = computed(() => {
  if (records.value.length === 0) {
    return {
      current: 0,
      average: 0,
      min: 0,
      max: 0,
      change: 0,
      trend: 'stable'
    }
  }

  const weights = records.value.map(r => r.weight)
  const current = weights[0] // 最新一条
  const average = weights.reduce((a, b) => a + b, 0) / weights.length
  const min = Math.min(...weights)
  const max = Math.max(...weights)

  // 计算变化（最新 - 最早）
  let change = 0
  let trend = 'stable'
  if (records.value.length >= 2) {
    const oldest = records.value[records.value.length - 1].weight
    change = current - oldest
    if (change < -0.5) trend = 'down'
    else if (change > 0.5) trend = 'up'
  }

  return {
    current: current.toFixed(1),
    average: average.toFixed(1),
    min: min.toFixed(1),
    max: max.toFixed(1),
    change: change.toFixed(1),
    trend
  }
})

// 获取最近30天的数据用于图表
const chartData = computed(() => {
  const now = Date.now()
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000

  // 过滤最近30天的记录并按日期分组（每天取最后一次）
  const dailyData = {}
  records.value
    .filter(r => r.timestamp >= thirtyDaysAgo)
    .forEach(r => {
      if (!dailyData[r.date] || r.timestamp > dailyData[r.date].timestamp) {
        dailyData[r.date] = r
      }
    })

  const sortedDates = Object.keys(dailyData).sort()
  const labels = sortedDates.map(date => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
  })
  const data = sortedDates.map(date => dailyData[date].weight)

  return {
    labels,
    datasets: [
      {
        label: '体重 (kg)',
        data,
        borderColor: '#00d9ff',
        backgroundColor: 'rgba(0, 217, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00d9ff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
})

// 图表配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(30, 30, 60, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.parsed.y} kg`
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.5)'
      },
      min: () => {
        if (chartData.value.datasets[0].data.length === 0) return 0
        const data = chartData.value.datasets[0].data
        return Math.floor(Math.min(...data) - 2)
      },
      max: () => {
        if (chartData.value.datasets[0].data.length === 0) return 100
        const data = chartData.value.datasets[0].data
        return Math.ceil(Math.max(...data) + 2)
      }
    }
  }
}

// 格式化日期显示
function formatDate(dateStr) {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return '今天'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨天'
  }
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// 初始化
onMounted(() => {
  records.value = loadRecords()
})
</script>

<template>
  <div class="weight-tracker">
    <!-- Header -->
    <header class="tracker-header glass-card">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">⚖️</span>
          <span class="logo-text">体重记录</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="tracker-main">
      <div class="main-grid">
        <!-- 左侧：输入和记录 -->
        <div class="left-column">
          <!-- 输入卡片 -->
          <div class="input-card glass-card">
            <h3 class="card-title">记录体重</h3>
            <div class="input-form">
              <div class="input-row">
                <div class="input-group">
                  <label class="input-label">日期</label>
                  <input
                    type="date"
                    v-model="currentDate"
                    class="date-input"
                  />
                </div>
                <div class="input-group">
                  <label class="input-label">时间</label>
                  <input
                    type="time"
                    v-model="currentTime"
                    class="time-input"
                  />
                </div>
              </div>
              <div class="input-group weight-input-group">
                <label class="input-label">体重 (kg)</label>
                <div class="weight-input-wrapper">
                  <input
                    type="number"
                    v-model="weightInput"
                    placeholder="输入体重"
                    step="0.1"
                    min="1"
                    max="500"
                    class="weight-input"
                    @keyup.enter="addRecord"
                  />
                  <button class="add-btn" @click="addRecord">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 记录列表 -->
          <div class="records-card glass-card">
            <h3 class="card-title">历史记录</h3>
            <div class="records-list" v-if="records.length > 0">
              <div
                v-for="record in records"
                :key="record.id"
                class="record-item"
              >
                <div class="record-info">
                  <span class="record-weight">{{ record.weight }} kg</span>
                  <span class="record-date">
                    {{ formatDate(record.date) }} {{ record.time }}
                  </span>
                </div>
                <button class="delete-btn" @click="deleteRecord(record.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="empty-state" v-else>
              <div class="empty-icon">📊</div>
              <p>暂无记录</p>
              <p class="empty-hint">输入体重开始记录</p>
            </div>
          </div>
        </div>

        <!-- 右侧：统计 -->
        <div class="right-column">
          <div class="stats-sticky">
            <!-- 统计卡片 -->
            <div class="stats-card glass-card">
              <h3 class="card-title">统计</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-label">当前体重</span>
                  <span class="stat-value">{{ stats.current }} kg</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">平均体重</span>
                  <span class="stat-value">{{ stats.average }} kg</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">最低体重</span>
                  <span class="stat-value">{{ stats.min }} kg</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">最高体重</span>
                  <span class="stat-value">{{ stats.max }} kg</span>
                </div>
                <div class="stat-item stat-change" :class="stats.trend">
                  <span class="stat-label">变化趋势</span>
                  <span class="stat-value">
                    <span v-if="stats.trend === 'up'">↑ {{ stats.change }} kg</span>
                    <span v-else-if="stats.trend === 'down'">↓ {{ Math.abs(stats.change) }} kg</span>
                    <span v-else>→ 稳定</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 图表卡片 -->
            <div class="chart-card glass-card">
              <h3 class="card-title">30天趋势</h3>
              <div class="chart-container" v-if="chartData.labels.length > 0">
                <Line :data="chartData" :options="chartOptions" />
              </div>
              <div class="empty-state" v-else>
                <div class="empty-icon">📈</div>
                <p>数据不足</p>
                <p class="empty-hint">记录更多数据查看趋势</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="tracker-footer">
      <p>数据仅存储在本地浏览器中</p>
    </footer>
  </div>
</template>

<style scoped>
.weight-tracker {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.tracker-header {
  display: flex;
  justify-content: center;
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

.tracker-main {
  flex: 1;
  padding: 24px;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
}

.input-card {
  padding: 24px;
}

.input-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: flex;
  gap: 16px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.date-input,
.time-input {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 15px;
  transition: all 0.2s;
}

.date-input:focus,
.time-input:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.12);
}

.weight-input-group {
  width: 100%;
}

.weight-input-wrapper {
  display: flex;
  gap: 12px;
}

.weight-input {
  flex: 1;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
  transition: all 0.2s;
}

.weight-input:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.12);
}

.weight-input::placeholder {
  color: var(--text-muted);
}

.add-btn {
  width: 52px;
  height: 52px;
  background: var(--accent);
  border: none;
  border-radius: var(--radius-sm);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.add-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px var(--accent-glow);
}

.records-card {
  padding: 24px;
  flex: 1;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.record-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.record-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.record-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.record-weight {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.record-date {
  font-size: 13px;
  color: var(--text-muted);
}

.delete-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: rgba(255, 100, 100, 0.2);
  color: #ff6464;
}

.stats-card {
  padding: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-change.up .stat-value {
  color: #ff6464;
}

.stat-change.down .stat-value {
  color: var(--success);
}

.chart-card {
  padding: 24px;
}

.chart-container {
  height: 250px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state p {
  margin: 0;
  font-size: 15px;
}

.empty-hint {
  font-size: 13px !important;
  opacity: 0.7;
  margin-top: 4px !important;
}

.tracker-footer {
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
  .tracker-header {
    margin: 12px;
    padding: 16px;
  }

  .tracker-main {
    padding: 12px;
  }

  .logo-text {
    font-size: 18px;
  }

  .input-row {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Toast 提示样式 */
:global(.toast) {
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

:global(.toast-success) {
  background: rgba(0, 255, 136, 0.2);
  color: var(--success);
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
}

:global(.toast-warning) {
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
