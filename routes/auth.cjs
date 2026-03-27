const express = require('express')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { usersDB } = require('../data/store.cjs')
const { generateToken } = require('../middleware/auth.cjs')

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

    // 生成token
    const token = generateToken(savedUser)

    res.status(201).json({
      message: '注册成功',
      token,
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

    // 生成token
    const token = generateToken(user)

    res.json({
      message: '登录成功',
      token,
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

// 获取当前用户信息
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: '未登录' })
  }

  try {
    const jwt = require('jsonwebtoken')
    const { JWT_SECRET } = require('../middleware/auth')
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = usersDB.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ error: '用户不存在' })
    }

    res.json({
      user: {
        id: user.id,
        username: user.username
      }
    })
  } catch (error) {
    res.status(401).json({ error: 'token无效' })
  }
})

module.exports = router
