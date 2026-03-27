const express = require('express')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { usersDB } = require('../data/store.cjs')
const { createSession, setSessionCookie, clearSessionCookie } = require('../middleware/auth.cjs')

const router = express.Router()

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' })
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: '用户名长度需在3-20个字符之间' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: '密码长度至少6个字符' })
    }

    // 检查用户是否已存在
    const existingUser = usersDB.findByUsername(username)
    if (existingUser) {
      return res.status(409).json({ error: '用户名已存在' })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    const user = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }

    const savedUser = usersDB.create(user)
    if (!savedUser) {
      return res.status(500).json({ error: '注册失败' })
    }

    // 创建 session 并设置 cookie
    const sessionId = createSession(savedUser.id)
    setSessionCookie(res, sessionId)

    res.status(201).json({
      message: '注册成功',
      user: {
        id: savedUser.id,
        username: savedUser.username
      }
    })
  } catch (error) {
    console.error('注册错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' })
    }

    // 查找用户
    const user = usersDB.findByUsername(username)
    if (!user) {
      return res.status(401).json({ error: '用户名或密码错误' })
    }

    // 验证密码
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: '用户名或密码错误' })
    }

    // 创建 session 并设置 cookie
    const sessionId = createSession(user.id)
    setSessionCookie(res, sessionId)

    res.json({
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username
      }
    })
  } catch (error) {
    console.error('登录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 登出
router.post('/logout', (req, res) => {
  const { clearSessionCookie } = require('../middleware/auth.cjs')
  clearSessionCookie(res)
  res.json({ message: '已退出登录' })
})

// 获取当前用户信息 - 需要认证
const { authenticateToken } = require('../middleware/auth.cjs')

router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: req.user
  })
})

module.exports = router
