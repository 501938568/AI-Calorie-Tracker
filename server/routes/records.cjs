const express = require('express')
const { recordsDB } = require('../data/store.cjs')
const { authenticateToken } = require('../middleware/auth.cjs')

const router = express.Router()

// 所有记录接口都需要登录
router.use(authenticateToken)

// ===== 热量记录 =====

// 获取热量记录（可选按日期过滤）
router.get('/calorie', (req, res) => {
  try {
    const { date } = req.query
    let records = recordsDB.getCalorieRecords(req.user.id)

    if (date) {
      records = records.filter(r => r.date === date)
    }

    // 按时间戳降序排序
    records.sort((a, b) => b.timestamp - a.timestamp)

    res.json({ records })
  } catch (error) {
    console.error('获取热量记录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 添加热量记录
router.post('/calorie', (req, res) => {
  try {
    const { foodName, calories, protein, fat, carbs, amount, mealType, date } = req.body

    if (!foodName || calories === undefined) {
      return res.status(400).json({ error: '食物名称和热量不能为空' })
    }

    const record = {
      id: `cal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: req.user.id,
      foodName,
      calories: parseFloat(calories),
      protein: parseFloat(protein || 0),
      fat: parseFloat(fat || 0),
      carbs: parseFloat(carbs || 0),
      amount: parseFloat(amount || 100),
      mealType: mealType || 'snack',
      date: date || new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      createdAt: new Date().toISOString()
    }

    const saved = recordsDB.addCalorieRecord(record)
    if (!saved) {
      return res.status(500).json({ error: '保存失败' })
    }

    res.status(201).json({ record })
  } catch (error) {
    console.error('添加热量记录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 删除热量记录
router.delete('/calorie/:id', (req, res) => {
  try {
    const { id } = req.params
    const success = recordsDB.deleteCalorieRecord(req.user.id, id)

    if (!success) {
      return res.status(404).json({ error: '记录不存在' })
    }

    res.json({ message: '删除成功' })
  } catch (error) {
    console.error('删除热量记录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// ===== 体重记录 =====

// 获取体重记录
router.get('/weight', (req, res) => {
  try {
    const records = recordsDB.getWeightRecords(req.user.id)
    // 按时间戳降序排序
    records.sort((a, b) => b.timestamp - a.timestamp)
    res.json({ records })
  } catch (error) {
    console.error('获取体重记录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 添加体重记录
router.post('/weight', (req, res) => {
  try {
    const { weight, date, time } = req.body

    if (!weight || weight <= 0 || weight > 500) {
      return res.status(400).json({ error: '请输入有效的体重值' })
    }

    const recordDate = date || new Date().toISOString().split('T')[0]
    const recordTime = time || new Date().toTimeString().slice(0, 5)
    const timestamp = new Date(`${recordDate}T${recordTime}`).getTime()

    const record = {
      id: `weight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: req.user.id,
      weight: parseFloat(weight),
      date: recordDate,
      time: recordTime,
      timestamp,
      createdAt: new Date().toISOString()
    }

    const saved = recordsDB.addWeightRecord(record)
    if (!saved) {
      return res.status(500).json({ error: '保存失败' })
    }

    res.status(201).json({ record })
  } catch (error) {
    console.error('添加体重记录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 删除体重记录
router.delete('/weight/:id', (req, res) => {
  try {
    const { id } = req.params
    const success = recordsDB.deleteWeightRecord(req.user.id, id)

    if (!success) {
      return res.status(404).json({ error: '记录不存在' })
    }

    res.json({ message: '删除成功' })
  } catch (error) {
    console.error('删除体重记录错误:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

module.exports = router
