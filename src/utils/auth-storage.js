// Cookie 工具函数
function setCookie(name, value, days = 30) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

// 获取存储的token - 优先从 cookie 获取
export function getToken() {
  return getCookie('auth_token') || localStorage.getItem('token')
}

// 保存token和用户信息
export function saveAuth(token, user) {
  // 同时保存到 cookie 和 localStorage，双重保险
  setCookie('auth_token', token, 30)
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

// 清除认证信息
export function clearAuth() {
  deleteCookie('auth_token')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// 获取当前用户
export function getCurrentUser() {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

// 检查是否已登录
export function isLoggedIn() {
  return !!getToken()
}
