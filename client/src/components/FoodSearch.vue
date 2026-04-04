<script setup>
import { ref, computed, watch } from 'vue'
import { Search, Plus, Utensils, X, Loader2 } from 'lucide-vue-next'
import { searchFoods, searchOnlineFoods, extractPortionFromKeyword } from '../data/foods.js'

const props = defineProps({
  mealType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['add-food'])

const searchKeyword = ref('')
const searchResults = ref([])
const selectedAmount = ref(100)
const showResults = ref(false)
const isSearching = ref(false)

// 模拟联网搜索状态
const isOnlineSearch = ref(false)
const onlineSearchResults = ref([])
const isOnlineSearching = ref(false)

// 防抖搜索
let searchTimeout = null

watch(searchKeyword, (val) => {
  if (searchTimeout) clearTimeout(searchTimeout)

  if (!val || val.trim() === '') {
    searchResults.value = []
    showResults.value = false
    isOnlineSearch.value = false
    selectedAmount.value = 100
    return
  }

  isSearching.value = true

  searchTimeout = setTimeout(() => {
    // 提取份量信息
    const { portion, foodName } = extractPortionFromKeyword(val)
    selectedAmount.value = portion
    
    const localResults = searchFoods(val)
    searchResults.value = localResults

    if (localResults.length === 0) {
      // 本地未命中，标记需要联网搜索
      isOnlineSearch.value = true
      onlineSearchResults.value = []
      showResults.value = true
    } else {
      isOnlineSearch.value = false
      showResults.value = true
    }

    isSearching.value = false
  }, 300)
})

// 选中食物
function selectFood(food) {
  // 区分本地食物（calories是每100g）和联网返回（calories是总量）
  let totalCalories, totalProtein, totalFat, totalCarbs, amount
  
  if (food.isOnline && food.per100grams) {
    // 联网返回的食物：calories已经是总量
    totalCalories = food.calories
    totalProtein = food.protein
    totalFat = food.fat
    totalCarbs = food.carbs
    amount = food.grams || selectedAmount.value
  } else if (food.grams && !food.per100grams) {
    // 本地食物但指定了克数
    totalCalories = Math.round((food.calories * food.grams) / 100)
    totalProtein = Math.round((food.protein * food.grams) / 100 * 10) / 10
    totalFat = Math.round((food.fat * food.grams) / 100 * 10) / 10
    totalCarbs = Math.round((food.carbs * food.grams) / 100 * 10) / 10
    amount = food.grams
  } else {
    // 传统本地食物（按selectedAmount计算）
    totalCalories = Math.round((food.calories * selectedAmount.value) / 100)
    totalProtein = Math.round((food.protein * selectedAmount.value) / 100 * 10) / 10
    totalFat = Math.round((food.fat * selectedAmount.value) / 100 * 10) / 10
    totalCarbs = Math.round((food.carbs * selectedAmount.value) / 100 * 10) / 10
    amount = selectedAmount.value
  }
  
  const record = {
    id: `${food.id}_${Date.now()}`,
    foodId: food.id,
    foodName: food.name,
    calories: totalCalories,
    protein: totalProtein,
    fat: totalFat,
    carbs: totalCarbs,
    amount: amount,
    mealType: props.mealType,
    timestamp: Date.now()
  }

  emit('add-food', record)
  clearSearch()
}

// 清空搜索
function clearSearch() {
  searchKeyword.value = ''
  searchResults.value = []
  showResults.value = false
  selectedAmount.value = 100
  isOnlineSearch.value = false
  onlineSearchResults.value = []
}

// 预设分量
const amountPresets = [50, 100, 150, 200, 250, 300]

// 执行联网搜索
async function performOnlineSearch() {
  if (!searchKeyword.value.trim() || isOnlineSearching.value) return

  isOnlineSearching.value = true
  isSearching.value = true

  try {
    const results = await searchOnlineFoods(searchKeyword.value)
    onlineSearchResults.value = results
    searchResults.value = results

    if (results.length > 0) {
      isOnlineSearch.value = false // 已有结果，不再显示提示
    }
  } catch (error) {
    console.error('联网搜索失败:', error)
    onlineSearchResults.value = []
  } finally {
    isSearching.value = false
    isOnlineSearching.value = false
  }
}

// 回车键触发联网搜索
function handleEnter() {
  if (isOnlineSearch.value && !isSearching.value) {
    performOnlineSearch()
  }
}
</script>

<template>
  <div class="food-search">
    <div class="search-header">
      <Utensils :size="20" />
      <span>添加食物</span>
    </div>

    <!-- 搜索输入框 -->
    <div class="search-input-wrapper">
      <Search :size="18" class="search-icon" />
      <input
        v-model="searchKeyword"
        type="text"
        class="glass-input search-input"
        placeholder="如: 一个包子、半碗米饭、烧麦..."
        @keydown.enter="handleEnter"
      />
      <button
        v-if="searchKeyword && !isOnlineSearch"
        class="clear-btn"
        @click="clearSearch"
      >
        <X :size="16" />
      </button>
      <button
        v-if="isOnlineSearch && !isSearching"
        class="search-btn"
        @click="performOnlineSearch"
      >
        <Search :size="16" />
      </button>
      <Loader2 v-if="isSearching" :size="18" class="loading-icon" />
    </div>

    <!-- 搜索结果 -->
    <div v-if="showResults" class="search-results">
      <!-- 识别到的份量提示 -->
      <div v-if="selectedAmount !== 100 && searchResults.length > 0" class="portion-tip">
        💡 已识别份量: 约 {{ selectedAmount }}g
      </div>
      
      <!-- 本地结果 -->
      <div v-if="searchResults.length > 0" class="results-list">
        <div
          v-for="(food, index) in searchResults"
          :key="food.id"
          class="food-item animate-fade-in-up"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <div class="food-info">
            <span class="food-name">
              {{ food.name }}
              <span v-if="food.isOnline && food.grams" class="food-portion">（{{ food.grams }}g）</span>
            </span>
            <span class="food-cal">
              <template v-if="food.isOnline && food.per100grams">
                {{ food.calories }} kcal（≈{{ food.per100grams.calories }}/100g）
              </template>
              <template v-else>
                {{ food.calories }} kcal/100g
              </template>
            </span>
          </div>
          <button
            class="add-btn"
            @click="selectFood(food)"
          >
            <Plus :size="18" />
          </button>
        </div>
        
        <!-- 没找到目标？联网搜索 -->
        <button
          class="online-fallback-btn"
          @click="performOnlineSearch"
        >
          <Search :size="14" />
          <span>没找到？联网搜索 "{{ searchKeyword }}"</span>
        </button>
      </div>

      <!-- 未命中，提示联网 -->
      <div v-else-if="isOnlineSearch" class="online-search-hint">
        <div class="hint-icon">
          <Search :size="32" />
        </div>
        <p class="hint-title">本地未找到匹配食物</p>
        <p class="hint-desc">
          尝试不同的关键词<br/>
          或联网搜索更多食物
        </p>
        <button
          class="glass-btn glass-btn-primary online-btn"
          :disabled="isOnlineSearching"
          @click="performOnlineSearch"
        >
          <Loader2 v-if="isOnlineSearching" :size="16" class="spin-icon" />
          <Search v-else :size="16" />
          <span v-if="isOnlineSearching">搜索中...</span>
          <span v-else>联网搜索 "{{ searchKeyword }}"</span>
        </button>
      </div>

      <!-- 无结果 -->
      <div v-else class="empty-results">
        <p>没有找到相关食物</p>
      </div>
    </div>

    <!-- 快速分量选择 -->
    <div v-if="searchResults.length > 0" class="amount-section">
      <label class="amount-label">选择分量 (g)</label>
      <div class="amount-presets">
        <button
          v-for="preset in amountPresets"
          :key="preset"
          class="preset-btn"
          :class="{ active: selectedAmount === preset }"
          @click="selectedAmount = preset"
        >
          {{ preset }}
        </button>
      </div>
      <input
        v-model.number="selectedAmount"
        type="number"
        class="glass-input amount-input"
        min="1"
        max="2000"
      />
    </div>
  </div>
</template>

<style scoped>
.food-search {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: var(--text-secondary);
  pointer-events: none;
}

.search-input {
  padding-left: 46px;
  padding-right: 46px;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.1);
}

.search-btn {
  position: absolute;
  right: 14px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #00b4d8);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.search-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 10px var(--accent-glow);
}

.loading-icon {
  position: absolute;
  right: 14px;
  color: var(--accent);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.search-results {
  max-height: 320px;
  overflow-y: auto;
  border-radius: var(--radius-sm);
}

.portion-tip {
  padding: 8px 12px;
  font-size: 13px;
  color: var(--accent);
  background: rgba(0, 217, 255, 0.1);
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
  text-align: center;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.food-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  opacity: 0;
}

.food-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.food-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.food-name {
  font-weight: 500;
  color: var(--text-primary);
}

.food-cal {
  font-size: 13px;
  color: var(--text-secondary);
}

.food-portion {
  font-size: 12px;
  color: var(--accent);
  margin-left: 4px;
}

.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #00b4d8);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 10px var(--accent-glow);
}

.add-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px var(--accent-glow);
}

.add-btn:active {
  transform: scale(0.95);
}

.online-fallback-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px 16px;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.online-fallback-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent);
  color: var(--accent);
}

.online-search-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  text-align: center;
}

.hint-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--text-secondary);
}

.hint-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.hint-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
}

.online-btn {
  font-size: 14px;
}

.online-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spin-icon {
  animation: spin 1s linear infinite;
}

.empty-results {
  padding: 32px;
  text-align: center;
  color: var(--text-secondary);
}

.amount-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.amount-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.amount-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preset-btn {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
}

.preset-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.amount-input {
  width: 100%;
  margin-top: 4px;
}
</style>
