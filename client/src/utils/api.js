// API 服务 - 处理与后端的通信

import { saveUser, clearAuth, isLoggedIn } from './auth-storage.js'

const API_BASE = import.meta.env.VITE_API_URL || 'http://150.158.103.199:3000/api'

// 通用请求封装 - 自动携带 cookie
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // 重要：携带 cookie
    })

    const data = await response.json()

    // 401 表示未登录
    if (response.status === 401) {
      clearAuth()
      throw { type: 'UNAUTHORIZED', message: data.error || '请重新登录' }
    }

    if (!response.ok) {
      throw new Error(data.error || '请求失败')
    }

    return data
  } catch (error) {
    if (error.type === 'UNAUTHORIZED') {
      throw error
    }
    console.error('API请求错误:', error)
    throw error
  }
}

// 认证相关 API
export const auth = {
  async register(username, password) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    if (data.user) {
      saveUser(data.user)
    }
    return data
  },

  async login(username, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    if (data.user) {
      saveUser(data.user)
    }
    return data
  },

  async logout() {
    try {
      await request('/auth/logout', {
        method: 'POST'
      })
    } catch (e) {}
    clearAuth()
  },

  async getMe() {
    return request('/auth/me')
  },

  isLoggedIn
}

// 热量记录 API
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

// 体重记录 API
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
  isLoggedIn
}
