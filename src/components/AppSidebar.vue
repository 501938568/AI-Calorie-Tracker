<script setup>
import { computed } from 'vue'
import { tools } from '../data/tools.js'

const props = defineProps({
  currentTool: {
    type: String,
    default: 'calorie'
  }
})

const emit = defineEmits(['select-tool'])

// 已激活的工具
const activeTools = computed(() => {
  return tools.filter(t => !t.comingSoon)
})

// 即将上线的工具
const comingSoonTools = computed(() => {
  return tools.filter(t => t.comingSoon)
})
</script>

<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <div class="platform-logo">
        <span class="logo-icon">🛠️</span>
        <span class="logo-text">工具箱</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <!-- 已激活的工具 -->
      <div class="nav-section" v-if="activeTools.length">
        <div class="nav-section-title">我的工具</div>
        <ul class="nav-list">
          <li
            v-for="tool in activeTools"
            :key="tool.id"
          >
            <button
              class="nav-item"
              :class="{
                'nav-item-active': currentTool === tool.id
              }"
              @click="emit('select-tool', tool.id)"
            >
              <span class="nav-item-icon">{{ tool.icon }}</span>
              <span class="nav-item-content">
                <span class="nav-item-name">{{ tool.name }}</span>
                <span class="nav-item-desc">{{ tool.description }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- 即将上线 -->
      <div class="nav-section" v-if="comingSoonTools.length">
        <div class="nav-section-title">即将上线</div>
        <ul class="nav-list">
          <li
            v-for="tool in comingSoonTools"
            :key="tool.id"
          >
            <button
              class="nav-item nav-item-disabled"
              disabled
            >
              <span class="nav-item-icon">{{ tool.icon }}</span>
              <span class="nav-item-content">
                <span class="nav-item-name">{{ tool.name }}</span>
                <span class="nav-item-badge">即将上线</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="version-info">v1.0.0</div>
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  background: rgba(30, 30, 50, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.platform-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
}

.nav-section-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 12px;
  margin-bottom: 4px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  margin-bottom: 4px;
  border-left: 3px solid transparent;
}

.nav-item:hover:not(.nav-item-disabled) {
  background: rgba(255, 255, 255, 0.08);
  border-left-color: var(--accent);
}

.nav-item-active {
  background: rgba(var(--accent-rgb), 0.15) !important;
  border-left-color: var(--accent) !important;
}

.nav-item-active .nav-item-name {
  color: var(--accent);
}

.nav-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-item-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.nav-item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.nav-item-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.nav-item-desc {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-item-badge {
  font-size: 10px;
  color: var(--accent);
  background: rgba(var(--accent-rgb), 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.version-info {
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
}
</style>
