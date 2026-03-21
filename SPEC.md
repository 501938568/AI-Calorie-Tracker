# 食物热量计算器 - SPEC.md

## 1. Concept & Vision

一款具有**玻璃态（Glassmorphism）**美学的食物热量追踪应用。界面如同漂浮在柔和渐变背景上的半透明玻璃卡片，带来轻盈、现代的视觉体验。动态排版让数据展示如流水般自然流畅，每一次交互都伴随微妙的光影变化。

## 2. Design Language

### 美学方向
- **玻璃态 + 动态排版**：磨砂玻璃效果、柔和渐变、流动动画
- 参考：Apple Vision Pro 界面、Windows 11 云母效果

### 色彩系统
```css
--bg-gradient-start: #667eea;    /* 薰衣草蓝 */
--bg-gradient-end: #764ba2;       /* 深紫 */
--glass-bg: rgba(255, 255, 255, 0.15);
--glass-border: rgba(255, 255, 255, 0.3);
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--accent: #00d9ff;                /* 青色高亮 */
--success: #00ff88;               /* 薄荷绿 */
--warning: #ffaa00;               /* 琥珀色 */
```

### 字体
- **标题**: "Noto Sans SC" 700, 回退 system-ui
- **正文**: "Noto Sans SC" 400
- **数字**: "DIN Alternate" / "Roboto Mono"

### 空间系统
- 基础单位: 8px
- 卡片内边距: 32px
- 组件间距: 24px
- 圆角: 20px (大卡片), 12px (小元素)

### 动效哲学
- **入场**: 元素从下方 fade + slide-in，stagger 100ms
- **交互**: hover 时玻璃卡片微微上浮 + 边框增亮
- **数据变化**: 数字滚动动画，标签弹性缩放
- **背景**: 渐变色缓慢流动 (20s cycle)

### 视觉资产
- **图标**: Lucide Icons (线条风格)
- **装饰**: 渐变圆球作为背景光晕，模糊滤镜

## 3. Layout & Structure

### 页面架构
```
┌────────────────────────────────────────────┐
│  流动渐变背景 + 装饰光晕球                  │
│  ┌──────────────────────────────────────┐  │
│  │  Glass Header (Logo + 日期选择)       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌─────────────┐  ┌─────────────────────┐  │
│  │ 添加食物    │  │  今日总热量         │  │
│  │ (玻璃卡片)  │  │  ┌───────────────┐  │  │
│  │             │  │  │   1860 kcal   │  │  │
│  │ 搜索框      │  │  │   动态数字    │  │  │
│  │ 食物列表    │  │  └───────────────┘  │  │
│  │ 快速添加    │  │                     │  │
│  └─────────────┘  │  营养素分解条       │  │
│                   │  碳水/蛋白/脂肪     │  │
│  ┌─────────────┐  └─────────────────────┘  │
│  │ 食物记录    │                          │
│  │ 时间线样式  │  ┌─────────────────────┐  │
│  │ 可删除      │  │  食物详情弹窗       │  │
│  └─────────────┘  └─────────────────────┘  │
└────────────────────────────────────────────┘
```

### 响应式策略
- **Desktop (>1024px)**: 双栏布局，左侧输入，右侧统计
- **Tablet (768-1024px)**: 单栏，统计卡片在上
- **Mobile (<768px)**: 全宽堆叠，浮动添加按钮

## 4. Features & Interactions

### 核心功能

#### 4.1 食物搜索与添加
- **搜索框**: 支持模糊匹配，300ms 防抖
- **本地数据库**: 内置 200+ 常见食物热量
- **联网搜索**: 本地未命中时调用食物 API
- **快速添加**: 显示热量预览，点击即添加

#### 4.2 每日记录管理
- **日期切换**: 可选择历史日期查看
- **记录列表**: 按用餐时段（早/午/晚/加餐）分组
- **删除记录**: 左滑删除，显示确认
- **编辑份量**: 点击记录可调整克数

#### 4.3 热量统计
- **总热量**: 大数字展示，变化时滚动动画
- **营养素分解**: 环形进度条显示三大营养素比例
- **对比建议**: 根据用户基础代谢显示剩余/超标

#### 4.4 数据持久化
- localStorage 存储每日记录
- 支持数据导出 JSON

### 交互细节

| 操作 | 反馈 |
|------|------|
| 鼠标悬停卡片 | 上浮 4px + 边框高亮 + 微光晕 |
| 点击添加食物 | 按钮缩放 + 成功提示 Toast |
| 删除记录 | 向左滑出 + 红色确认区 |
| 搜索无结果 | 空状态插画 + 联网提示 |
| 数字变化 | 数字滚动动画 400ms |

### 边界情况
- **空状态**: 显示引导文案 "今天吃了什么？开始记录吧"
- **联网失败**: 显示本地缓存数据 + 离线提示
- **数据过期**: 30天前的数据自动归档提示

## 5. Component Inventory

### GlassCard
- 半透明背景 `rgba(255,255,255,0.15)`
- 模糊效果 `backdrop-filter: blur(20px)`
- 边框 `1px solid rgba(255,255,255,0.3)`
- 阴影 `0 8px 32px rgba(0,0,0,0.1)`
- **Hover**: 边框变亮，Y轴上移

### SearchInput
- 玻璃态输入框
- 左侧搜索图标
- 右侧清除按钮（有时）
- **Focus**: 边框变为 accent 色

### FoodItem
- 食物名称 + 热量
- 右侧添加按钮
- 缩放比例选择器

### StatCard
- 大数字居中
- 单位标签
- 下方说明文字

### CircularProgress
- SVG 环形进度
- 中心显示百分比
- 三色分段（碳水/蛋白/脂肪）

### TimelineItem
- 时间标签
- 食物名称列表
- 总热量
- 删除按钮（hover 显示）

### Toast
- 顶部居中弹出
- 成功（绿色）/ 错误（红色）/ 信息（蓝色）
- 3秒后自动消失

## 6. Technical Approach

### 技术栈
- **框架**: Vue 3 (Composition API)
- **构建**: Vite
- **UI 库**: Naive UI (定制玻璃态主题)
- **样式**: CSS Variables + Scoped CSS
- **图标**: Lucide Vue

### 数据结构

```typescript
// 食物项
interface FoodItem {
  id: string;
  name: string;
  nameEn?: string;
  calories: number;      // kcal/100g
  protein: number;       // g/100g
  fat: number;          // g/100g
  carbs: number;        // g/100g
  unit?: string;        // 默认 "份" (100g)
}

// 记录项
interface FoodRecord {
  id: string;
  foodId: string;
  foodName: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  amount: number;       // 克数
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string;        // YYYY-MM-DD
  timestamp: number;
}
```

### 本地食物数据库
内置约 100 种常见食物数据，覆盖：
- 主食类（米饭、面条、面包等）
- 肉类（鸡肉、牛肉、鱼肉等）
- 蔬菜水果类
- 奶蛋类
- 零食饮料类

### 联网搜索
使用免费开放食物 API **OpenFoodFacts**：
- 搜索端点: `https://world.openfoodfacts.org/cgi/search.pl`
- 请求参数: `search_terms`, `search_simple=1`, `json=1`, `page_size=20`
- 返回产品名称、品牌、营养成分 (每100g)
- 完全免费，无需 API Key

**实现策略**：
1. 用户输入关键词后，先搜索本地数据库
2. 本地未命中时，显示"联网搜索"提示按钮
3. 用户点击按钮后，调用 OpenFoodFacts API
4. API 返回的结果自动显示在列表中，支持直接添加

**API 响应字段映射**：
| OpenFoodFacts | 本地格式 |
|--------------|--------|
| product_name | name |
| brands | nameEn |
| energy-kcal_100g | calories |
| proteins_100g | protein |
| fat_100g | fat |
| carbohydrates_100g | carbs |

**错误处理**：
- 网络错误时显示空结果，不阻塞用户操作
- 过滤无热量数据的产品

### 存储
- localStorage key: `calorie_tracker_records`
- 数据格式: JSON
- 容量估计: 每天 10 条记录 × 365 天 ≈ 100KB
