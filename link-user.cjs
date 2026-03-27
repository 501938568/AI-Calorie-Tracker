// 关联用户数据
const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, 'data')
const recordsFile = path.join(dataDir, 'records.json')
const usersFile = path.join(dataDir, 'users.json')

// 读取用户
const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
const user = usersData.users.find(u => u.username === '501938568')

if (!user) {
    console.error('用户不存在')
    process.exit(1)
}

console.log(`找到用户: ${user.username}, ID: ${user.id}`)

// 读取记录
const recordsData = JSON.parse(fs.readFileSync(recordsFile, 'utf-8'))

// 更新所有TEMP_USER_ID的记录
let calorieCount = 0
let weightCount = 0

recordsData.calorieRecords.forEach(record => {
    if (record.userId === 'TEMP_USER_ID' || record.userId === 'IMPORTED_USER_ID') {
        record.userId = user.id
        calorieCount++
    }
})

recordsData.weightRecords.forEach(record => {
    if (record.userId === 'TEMP_USER_ID' || record.userId === 'IMPORTED_USER_ID') {
        record.userId = user.id
        weightCount++
    }
})

// 保存
fs.writeFileSync(recordsFile, JSON.stringify(recordsData, null, 2))

console.log(`成功关联 ${calorieCount} 条热量记录`)
console.log(`成功关联 ${weightCount} 条体重记录`)
