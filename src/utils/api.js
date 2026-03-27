// API 服务 - 处理与后端的通信

const API_BASE = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'

// 获取存储的token
function getToken() {
  return localStorage.getItem('token')
}

// 保存token和用户信息
function saveAuth(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

// 清除认证信息
function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// 获取当前用户
function getCurrentUser() {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

// 检查是否已登录
function isLoggedIn() {
  return !!getToken()
}

// 通用请求封装
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '请求失败')
    }

    return data
  } catch (error) {
    console.error('API请求错误:', error)
    throw error
  }
}

// 认证相关API
export const auth = {
  async register(username, password) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    if (data.token) {
      saveAuth(data.token, data.user)
    }
    return data
  },

  async login(username, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    if (data.token) {
      saveAuth(data.token, data.user)
    }
    return data
  },

  async getMe() {
    return request('/auth/me')
  },

  logout() {
    clearAuth()
  },

  getCurrentUser,
  isLoggedIn
}

// 热量记录API
export const calorieAPI = {
  async getAll(date) {
    const url = date ? `/records/calorie?date=${date}` : '/records/calorie'
    return request(url)
  },

  async add(record) {
    return request('/records/calorie', {
      method: 'POST',
      body: JSON.stringify(record)
    })
  },

  async delete(id) {
    return request(`/records/calorie/${id}`, {
      method: 'DELETE'
    })
  }
}

// 体重记录API
export const weightAPI = {
  async getAll() {
    return request('/records/weight')
  },

  async add(record) {
    return request('/records/weight', {
      method: 'POST',
      body: JSON.stringify(record)
    })
  },

  async delete(id) {
    return request(`/records/weight/${id}`, {
      method: 'DELETE'
    })
  }
}

export default {
  auth,
  calorieAPI,
  weightAPI,
  getToken,
  getCurrentUser,
  isLoggedIn
}
