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

// 检查是否已登录（通过 cookie）
export function isLoggedIn() {
  return !!getCookie('session_id')
}

// 获取当前用户信息（需要调用 API）
export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: 'include' // 重要：携带 cookie
    })
    if (res.ok) {
      const data = await res.json()
      return data.user
    }
  } catch (e) {}
  return null
}

// 保存用户信息到 localStorage（用于快速显示）
export function saveUser(user) {
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (e) {}
}

// 清除认证信息
export function clearAuth() {
  deleteCookie('session_id')
  try {
    localStorage.removeItem('user')
  } catch (e) {}
}
