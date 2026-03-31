<script setup>
import { computed } from 'vue'
import { Trash2, Coffee, Sun, Moon, Cookie } from 'lucide-vue-next'

const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['delete-record', 'edit-record'])

// 餐食类型配置
const mealTypes = {
  breakfast: {
    label: '早餐',
    icon: Coffee,
    color: '#ffaa00',
    bgColor: 'rgba(255, 170, 0, 0.15)'
  },
  lunch: {
    label: '午餐',
    icon: Sun,
    color: '#ff6b6b',
    bgColor: 'rgba(255, 107, 107, 0.15)'
  },
  dinner: {
    label: '晚餐',
    icon: Moon,
    color: '#6bcb77',
    bgColor: 'rgba(107, 203, 119, 0.15)'
  },
  snack: {
    label: '加餐',
    icon: Cookie,
    color: '#00d9ff',
    bgColor: 'rgba(0, 217, 255, 0.15)'
  }
}

// 按餐食类型分组
const groupedRecords = computed(() => {
  const groups = {}

  for (const type of Object.keys(mealTypes)) {
    groups[type] = props.records.filter(r => r.mealType === type)
  }

  return groups
})

// 获取某组的总热量
function getGroupCalories(records) {
  return records.reduce((sum, r) => sum + r.calories, 0)
}

// 删除记录
function deleteRecord(record) {
  emit('delete-record', record.id)
}
</script>

<template>
  <div class="food-timeline">
    <div class="timeline-header">
      <h2>饮食记录</h2>
    </div>

    <!-- 空状态 -->
    <div v-if="records.length === 0" class="empty-state">
      <div class="empty-icon">
        <Coffee :size="48" />
      </div>
      <p class="empty-title">还没有记录</p>
      <p class="empty-desc">搜索并添加食物开始记录</p>
    </div>

    <!-- 记录列表 -->
    <div v-else class="timeline-content">
      <div
        v-for="(mealConfig, mealType) in mealTypes"
        :key="mealType"
        class="meal-section"
      >
        <template v-if="groupedRecords[mealType].length > 0">
          <!-- 餐食标题 -->
          <div class="meal-header">
            <div class="meal-title">
              <div
                class="meal-icon"
                :style="{
                  background: mealConfig.bgColor,
                  color: mealConfig.color
                }"
              >
                <component :is="mealConfig.icon" :size="18" />
              </div>
              <span class="meal-name">{{ mealConfig.label }}</span>
            </div>
            <span class="meal-calories">
              {{ getGroupCalories(groupedRecords[mealType]) }} kcal
            </span>
          </div>

          <!-- 记录项 -->
          <div class="meal-records">
            <div
              v-for="(record, index) in groupedRecords[mealType]"
              :key="record.id"
              class="record-item animate-slide-left"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <div class="record-info">
                <span class="record-name">{{ record.foodName }}</span>
                <span class="record-amount">{{ record.amount }}g</span>
              </div>
              <div class="record-actions">
                <span class="record-cal">{{ record.calories }} kcal</span>
                <button
                  class="delete-btn"
                  @click="deleteRecord(record)"
                >
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.food-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--text-muted);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.meal-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
}

.meal-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meal-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meal-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.meal-calories {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-secondary);
}

.meal-records {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  transition: all 0.25s ease;
  opacity: 0;
}

.record-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

.record-item:hover .delete-btn {
  opacity: 1;
}

.record-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.record-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.record-amount {
  font-size: 12px;
  color: var(--text-muted);
}

.record-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.record-cal {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
}

.delete-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 71, 87, 0.1);
  border: none;
  color: var(--danger);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: rgba(255, 71, 87, 0.2);
  transform: scale(1.05);
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>
