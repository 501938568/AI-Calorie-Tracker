// 导入旧数据的临时脚本
const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, 'data')
const recordsFile = path.join(dataDir, 'records.json')

// 用户导出的体重记录数据
const weightData = [
    {
        "id": "weight_1774596415596",
        "weight": 92.2,
        "date": "2026-03-27",
        "time": "15:26",
        "timestamp": 1774596360000
    },
    {
        "id": "weight_1774502584196",
        "weight": 92.1,
        "date": "2026-03-26",
        "time": "13:22",
        "timestamp": 1774502520000
    },
    {
        "id": "weight_1774417647460",
        "weight": 92.6,
        "date": "2026-03-25",
        "time": "13:47",
        "timestamp": 1774417620000
    },
    {
        "id": "weight_1774340731187",
        "weight": 93.3,
        "date": "2026-03-24",
        "time": "16:25",
        "timestamp": 1774340700000
    }
]

// 读取现有记录
let existingData = { calorieRecords: [], weightRecords: [] }
if (fs.existsSync(recordsFile)) {
    const content = fs.readFileSync(recordsFile, 'utf-8')
    existingData = JSON.parse(content)
}

// 转换体重数据 - 使用临时ID前缀，等用户注册后替换
const importedWeightRecords = weightData.map(record => ({
    id: `imported_${record.id}`,
    userId: 'TEMP_USER_ID', // 稍后替换
    weight: record.weight,
    date: record.date,
    time: record.time,
    timestamp: record.timestamp,
    createdAt: new Date().toISOString()
}))

// 合并记录
existingData.weightRecords = [...existingData.weightRecords, ...importedWeightRecords]

// 保存
fs.writeFileSync(recordsFile, JSON.stringify(existingData, null, 2))

console.log(`成功导入 ${importedWeightRecords.length} 条体重记录`)
console.log('注意：请注册登录后告诉我用户名，我帮你关联正确的用户ID')
