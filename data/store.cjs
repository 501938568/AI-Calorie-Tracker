const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const RECORDS_FILE = path.join(DATA_DIR, 'records.json')

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// 初始化数据文件
function initData() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2))
  }
  if (!fs.existsSync(RECORDS_FILE)) {
    fs.writeFileSync(RECORDS_FILE, JSON.stringify({ calorieRecords: [], weightRecords: [] }, null, 2))
  }
}

initData()

// 读取数据
function readData(file) {
  try {
    const content = fs.readFileSync(file, 'utf-8')
    return JSON.parse(content)
  } catch (e) {
    console.error(`读取文件失败 ${file}:`, e)
    return null
  }
}

// 写入数据
function writeData(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    return true
  } catch (e) {
    console.error(`写入文件失败 ${file}:`, e)
    return false
  }
}

// 用户操作
const usersDB = {
  getAll() {
    const data = readData(USERS_FILE)
    return data ? data.users : []
  },

  findByUsername(username) {
    const users = this.getAll()
    return users.find(u => u.username === username)
  },

  findById(id) {
    const users = this.getAll()
    return users.find(u => u.id === id)
  },

  create(user) {
    const data = readData(USERS_FILE)
    data.users.push(user)
    return writeData(USERS_FILE, data) ? user : null
  }
}

// 记录操作
const recordsDB = {
  getAll() {
    return readData(RECORDS_FILE)
  },

  // 热量记录
  getCalorieRecords(userId) {
    const data = this.getAll()
    return data.calorieRecords.filter(r => r.userId === userId)
  },

  addCalorieRecord(record) {
    const data = this.getAll()
    data.calorieRecords.push(record)
    return writeData(RECORDS_FILE, data) ? record : null
  },

  deleteCalorieRecord(userId, recordId) {
    const data = this.getAll()
    const index = data.calorieRecords.findIndex(r => r.userId === userId && r.id === recordId)
    if (index > -1) {
      data.calorieRecords.splice(index, 1)
      return writeData(RECORDS_FILE, data)
    }
    return false
  },

  // 体重记录
  getWeightRecords(userId) {
    const data = this.getAll()
    return data.weightRecords.filter(r => r.userId === userId)
  },

  addWeightRecord(record) {
    const data = this.getAll()
    data.weightRecords.push(record)
    return writeData(RECORDS_FILE, data) ? record : null
  },

  deleteWeightRecord(userId, recordId) {
    const data = this.getAll()
    const index = data.weightRecords.findIndex(r => r.userId === userId && r.id === recordId)
    if (index > -1) {
      data.weightRecords.splice(index, 1)
      return writeData(RECORDS_FILE, data)
    }
    return false
  }
}

module.exports = { usersDB, recordsDB }
