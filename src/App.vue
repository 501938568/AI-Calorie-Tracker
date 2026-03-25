<script setup>
import { ref, computed, markRaw } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import CalorieTracker from './components/tools/CalorieTracker.vue'
import WeightTracker from './components/tools/WeightTracker.vue'
import { tools, defaultTool } from './data/tools.js'

// 当前选中的工具
const currentTool = ref(defaultTool)

// 工具映射表
const toolComponents = {
  calorie: markRaw(CalorieTracker),
  weight: markRaw(WeightTracker)
  // 未来可添加更多工具映射
  // water: markRaw(WaterTracker)
}

// 当前工具组件
const currentComponent = computed(() => {
  return toolComponents[currentTool.value] || null
})

// 选择工具
function selectTool(toolId) {
  currentTool.value = toolId
}
</script>

<template>
  <div class="app-background"></div>
  <div class="decorative-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <!-- 左侧导航栏 -->
  <AppSidebar
    :currentTool="currentTool"
    @select-tool="selectTool"
  />

  <!-- 主内容区 -->
  <div class="app-main-container">
    <component
      :is="currentComponent"
      v-if="currentComponent"
      class="tool-component"
    />

    <!-- 即将上线提示 -->
    <div v-else class="coming-soon-container">
      <div class="coming-soon-card glass-card">
        <div class="coming-soon-icon">🚧</div>
        <h2 class="coming-soon-title">工具即将上线</h2>
        <p class="coming-soon-desc">该功能正在开发中，敬请期待...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-main-container {
  margin-left: 240px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.tool-component {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.coming-soon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}

.coming-soon-card {
  text-align: center;
  padding: 60px 80px;
  border-radius: var(--radius-lg);
}

.coming-soon-icon {
  font-size: 64px;
  margin-bottom: 24px;
}

.coming-soon-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.coming-soon-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .app-main-container {
    margin-left: 0;
  }
}
</style>
