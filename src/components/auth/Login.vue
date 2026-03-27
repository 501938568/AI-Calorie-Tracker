<script setup>
import { ref } from 'vue'
import { auth } from '../../utils/api.js'

const emit = defineEmits(['login-success'])

const isLoginMode = ref(true)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

// 简单的toast提示
const showToast = (msg, type = 'error') => {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

async function handleSubmit() {
  error.value = ''

  if (!username.value || !password.value) {
    error.value = '请填写所有字段'
    return
  }

  if (username.value.length < 3) {
    error.value = '用户名至少3个字符'
    return
  }

  if (password.value.length < 6) {
    error.value = '密码至少6个字符'
    return
  }

  if (!isLoginMode.value && password.value !== confirmPassword.value) {
    error.value = '两次密码输入不一致'
    return
  }

  loading.value = true

  try {
    if (isLoginMode.value) {
      await auth.login(username.value, password.value)
      showToast('登录成功', 'success')
    } else {
      await auth.register(username.value, password.value)
      showToast('注册成功', 'success')
    }
    emit('login-success')
  } catch (err) {
    error.value = err.message || '操作失败'
  } finally {
    loading.value = false
  }
}

function toggleMode() {
  isLoginMode.value = !isLoginMode.value
  error.value = ''
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card glass-card">
      <div class="auth-header">
        <h1 class="auth-title">{{ isLoginMode ? '登录' : '注册' }}</h1>
        <p class="auth-subtitle">{{ isLoginMode ? '欢迎回来' : '创建新账户' }}</p>
      </div>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <label class="input-label">用户名</label>
          <input
            type="text"
            v-model="username"
            class="auth-input"
            placeholder="输入用户名"
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <label class="input-label">密码</label>
          <input
            type="password"
            v-model="password"
            class="auth-input"
            placeholder="输入密码"
            autocomplete="current-password"
          />
        </div>

        <div class="input-group" v-if="!isLoginMode">
          <label class="input-label">确认密码</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="auth-input"
            placeholder="再次输入密码"
            autocomplete="new-password"
          />
        </div>

        <div class="error-message" v-if="error">
          {{ error }}
        </div>

        <button type="submit" class="auth-btn" :disabled="loading">
          {{ loading ? '处理中...' : (isLoginMode ? '登录' : '注册') }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          {{ isLoginMode ? '还没有账户？' : '已有账户？' }}
          <button class="toggle-btn" @click="toggleMode" type="button">
            {{ isLoginMode ? '立即注册' : '去登录' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.auth-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.auth-input {
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.2s;
}

.auth-input:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.12);
}

.auth-input::placeholder {
  color: var(--text-muted);
}

.error-message {
  color: #ff6464;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background: rgba(255, 100, 100, 0.1);
  border-radius: var(--radius-sm);
}

.auth-btn {
  padding: 14px 24px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  border: none;
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px var(--accent-glow);
}

.auth-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-btn:hover {
  color: var(--accent-light);
}
</style>
