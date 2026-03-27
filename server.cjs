const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.cjs')
const recordsRoutes = require('./routes/records.cjs')

const app = express()
const PORT = process.env.PORT || 3000

// Cookie 解析中间件
app.use((req, res, next) => {
  req.cookies = {}
  const cookieHeader = req.headers.cookie
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=')
      if (parts.length >= 2) {
        const key = parts[0].trim()
        const value = parts.slice(1).join('=').trim()
        req.cookies[key] = value
      }
    })
  }
  next()
})

// 中间件
app.use(cors({
  credentials: true,
  origin: 'http://150.158.103.199', // 不带端口
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// 简单的请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
  next()
})

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/records', recordsRoutes)

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://0.0.0.0:${PORT}`)
})
