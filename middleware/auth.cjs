const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const COOKIE_NAME = 'session_id'

// 验证 cookie 中间件
function authenticateToken(req, res, next) {
  const sessionId = req.cookies[COOKIE_NAME]

  if (!sessionId) {
    return res.status(401).json({ error: '需要登录' })
  }

  // 从 session 存储中查找用户
  const { usersDB } = require('../data/store.cjs')
  const sessionData = getSession(sessionId)

  if (!sessionData) {
    return res.status(401).json({ error: '会话已过期，请重新登录' })
  }

  const user = usersDB.findById(sessionData.userId)
  if (!user) {
    return res.status(401).json({ error: '用户不存在' })
  }

  // 将用户信息挂载到 req 对象上
  req.user = { id: user.id, username: user.username }
  next()
}

// 简单的 session 存储（生产环境应该用 Redis 等）
const sessions = new Map()

function createSession(userId) {
  const sessionId = jwt.sign(
    { userId, created: Date.now() },
    JWT_SECRET,
    { expiresIn: '30d' }
  )
  sessions.set(sessionId, { userId, created: Date.now() })
  return sessionId
}

function getSession(sessionId) {
  try {
    const decoded = jwt.verify(sessionId, JWT_SECRET)
    if (sessions.has(sessionId)) {
      return sessions.get(sessionId)
    }
    // 如果 session 存储中没有，创建一个
    const sessionData = { userId: decoded.userId, created: decoded.created }
    sessions.set(sessionId, sessionData)
    return sessionData
  } catch (e) {
    return null
  }
}

function deleteSession(sessionId) {
  sessions.delete(sessionId)
}

// 设置 cookie
function setSessionCookie(res, sessionId) {
  // 手动设置 Set-Cookie 头
  const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 天
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${sessionId}; Path=/; Max-Age=${maxAge}; SameSite=Lax`)
}

// 清除 cookie
function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`)
}

module.exports = {
  authenticateToken,
  createSession,
  deleteSession,
  setSessionCookie,
  clearSessionCookie,
  COOKIE_NAME
}
