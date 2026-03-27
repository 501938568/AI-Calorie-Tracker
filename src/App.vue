<script setup>
import { ref, computed, markRaw, onMounted } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import Login from './components/auth/Login.vue'
import CalorieTracker from './components/tools/CalorieTracker.vue'
import WeightTracker from './components/tools/WeightTracker.vue'
import { tools, defaultTool } from './data/tools.js'
import { auth } from './utils/api.js'

// 登录状态
const isLoggedIn = ref(false)
const currentUser = ref(null)
const loading = ref(true)

// 当前选中的工具
const currentTool = ref(defaultTool)

// 工具映射表
const toolComponents = {
  calorie: markRaw(CalorieTracker),
  weight: markRaw(WeightTracker)
}

// 当前工具组件
const currentComponent = computed(() => {
  return toolComponents[currentTool.value] || null
})

// 选择工具
function selectTool(toolId) {
  currentTool.value = toolId
}

// 登录成功回调
function handleLoginSuccess() {
  isLoggedIn.value = true
  currentUser.value = auth.getCurrentUser()
}

// 登出
function handleLogout() {
  auth.logout()
  isLoggedIn.value = false
  currentUser.value = null
}

// 检查登录状态
onMounted(async () => {
  if (auth.isLoggedIn()) {
    // 先用本地数据快速恢复登录状态
    const cachedUser = auth.getCurrentUser()
    if (cachedUser) {
      isLoggedIn.value = true
      currentUser.value = cachedUser
    }

    // 后台验证 token
    try {
      const data = await auth.getMe()
      currentUser.value = data.user
    } catch (err) {
      // token无效，清除登录状态
      auth.logout()
      isLoggedIn.value = false
      currentUser.value = null
    }
  }
  loading.value = false
})
</script>

<template>
  <div class="app-background"></div>
  <div class="decorative-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <!-- 加载中 -->
  <div v-if="loading" class="loading-container">
    <div class="loading-spinner"></div>
  </div>

  <!-- 未登录 - 显示登录页面 -->
  <Login v-else-if="!isLoggedIn" @login-success="handleLoginSuccess" />

  <!-- 已登录 - 显示主应用 -->
  <template v-else>
    <!-- 左侧导航栏 -->
    <AppSidebar
      :currentTool="currentTool"
      :currentUser="currentUser"
      @select-tool="selectTool"
      @logout="handleLogout"
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

.loading-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .app-main-container {
    margin-left: 0;
  }
}
</style>
