// 工具合集配置
export const tools = [
  {
    id: 'calorie',
    name: '热量追踪',
    icon: '🍽️',
    description: '记录每日饮食热量摄入',
    component: 'CalorieTracker'
  },
  {
    id: 'water',
    name: '喝水追踪',
    icon: '💧',
    description: '记录每日饮水量',
    comingSoon: true,
    component: null
  },
  {
    id: 'sleep',
    name: '睡眠追踪',
    icon: '😴',
    description: '记录睡眠质量和时长',
    comingSoon: true,
    component: null
  },
  {
    id: 'exercise',
    name: '运动记录',
    icon: '🏃',
    description: '记录每日运动消耗',
    comingSoon: true,
    component: null
  },
  {
    id: 'weight',
    name: '体重记录',
    icon: '⚖️',
    description: '记录体重变化趋势',
    comingSoon: false,
    component: 'WeightTracker'
  }
]

export const defaultTool = 'calorie'
