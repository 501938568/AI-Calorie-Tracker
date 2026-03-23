// 常见食物热量数据库 (单位: kcal/100g)
export const foodDatabase = [
  // ===== 主食类 =====
  { id: 'rice', name: '米饭', calories: 116, protein: 2.6, fat: 0.3, carbs: 25.9 },
  { id: 'rice_cooked', name: '白米饭（熟）', calories: 130, protein: 2.5, fat: 0.2, carbs: 28.2 },
  { id: 'noodle', name: '挂面', calories: 356, protein: 10.3, fat: 0.8, carbs: 74.1 },
  { id: 'noodle_cooked', name: '面条（煮）', calories: 110, protein: 3.3, fat: 0.2, carbs: 23.2 },
  { id: 'bread_white', name: '白面包', calories: 265, protein: 8.0, fat: 3.2, carbs: 48.6 },
  { id: 'bread_whole', name: '全麦面包', calories: 247, protein: 13.4, fat: 4.2, carbs: 41.3 },
  { id: 'steamed_bun', name: '馒头', calories: 223, protein: 7.0, fat: 1.1, carbs: 45.7 },
  { id: 'dumpling', name: '饺子', calories: 242, protein: 9.5, fat: 8.0, carbs: 35.4 },
  { id: 'ramen', name: '方便面', calories: 473, protein: 9.5, fat: 21.1, carbs: 61.6 },
  { id: 'oatmeal', name: '燕麦片', calories: 389, protein: 16.9, fat: 6.9, carbs: 66.3 },
  { id: 'corn', name: '玉米', calories: 112, protein: 4.0, fat: 1.2, carbs: 22.8 },
  { id: 'sweet_potato', name: '红薯', calories: 99, protein: 1.1, fat: 0.1, carbs: 23.6 },
  { id: 'potato', name: '土豆', calories: 76, protein: 2.0, fat: 0.1, carbs: 17.4 },

  // ===== 肉类 =====
  { id: 'chicken_breast', name: '鸡胸肉', calories: 133, protein: 31.0, fat: 1.2, carbs: 0 },
  { id: 'chicken_thigh', name: '鸡腿肉', calories: 195, protein: 26.0, fat: 10.0, carbs: 0 },
  { id: 'chicken_wing', name: '鸡翅', calories: 222, protein: 26.0, fat: 12.0, carbs: 0 },
  { id: 'beef', name: '牛肉（瘦肉）', calories: 127, protein: 26.0, fat: 2.0, carbs: 0 },
  { id: 'beef_ribs', name: '牛排', calories: 271, protein: 26.0, fat: 18.0, carbs: 0 },
  { id: 'pork_lean', name: '猪瘦肉', calories: 143, protein: 27.0, fat: 3.0, carbs: 0 },
  { id: 'pork_belly', name: '五花肉', calories: 395, protein: 14.0, fat: 37.0, carbs: 0 },
  { id: 'pork_chop', name: '猪排', calories: 264, protein: 28.0, fat: 16.0, carbs: 0 },
  { id: 'lamb', name: '羊肉', calories: 143, protein: 25.0, fat: 4.0, carbs: 0 },
  { id: 'duck', name: '鸭肉', calories: 240, protein: 19.0, fat: 17.0, carbs: 0 },
  { id: 'duck_fillet', name: '鸭胸肉', calories: 90, protein: 18.0, fat: 1.5, carbs: 0 },

  // ===== 海鲜类 =====
  { id: 'fish_carp', name: '鲤鱼', calories: 84, protein: 18.0, fat: 1.0, carbs: 0 },
  { id: 'fish_grass', name: '草鱼', calories: 83, protein: 16.0, fat: 2.0, carbs: 0 },
  { id: 'fish_salmon', name: '三文鱼', calories: 183, protein: 22.0, fat: 11.0, carbs: 0 },
  { id: 'fish_tuna', name: '金枪鱼', calories: 132, protein: 28.0, fat: 1.0, carbs: 0 },
  { id: 'fish_cod', name: '鳕鱼', calories: 82, protein: 18.0, fat: 0.5, carbs: 0 },
  { id: 'shrimp', name: '虾', calories: 93, protein: 20.0, fat: 0.7, carbs: 0 },
  { id: 'crab', name: '螃蟹', calories: 97, protein: 19.0, fat: 1.5, carbs: 0 },
  { id: 'scallop', name: '扇贝', calories: 77, protein: 14.0, fat: 0.5, carbs: 0 },
  { id: 'squid', name: '鱿鱼', calories: 84, protein: 15.0, fat: 1.4, carbs: 0 },
  { id: 'octopus', name: '章鱼', calories: 82, protein: 14.0, fat: 0.8, carbs: 0 },

  // ===== 蛋类 =====
  { id: 'egg_whole', name: '鸡蛋（整个）', calories: 144, protein: 13.0, fat: 10.0, carbs: 0.5 },
  { id: 'egg_white', name: '鸡蛋白', calories: 52, protein: 11.0, fat: 0.2, carbs: 0.7 },
  { id: 'egg_yolk', name: '鸡蛋黄', calories: 322, protein: 16.0, fat: 27.0, carbs: 3.5 },
  { id: 'duck_egg', name: '咸鸭蛋', calories: 190, protein: 13.0, fat: 13.0, carbs: 4.0 },
  { id: 'quail_egg', name: '鹌鹑蛋', calories: 160, protein: 13.0, fat: 11.0, carbs: 0.5 },

  // ===== 奶制品 =====
  { id: 'milk_whole', name: '全脂牛奶', calories: 61, protein: 3.2, fat: 3.3, carbs: 4.8 },
  { id: 'milk_skim', name: '脱脂牛奶', calories: 34, protein: 3.4, fat: 0.1, carbs: 5.0 },
  { id: 'yogurt', name: '酸奶', calories: 72, protein: 2.9, fat: 2.7, carbs: 9.3 },
  { id: 'yogurt_greek', name: '希腊酸奶', calories: 97, protein: 9.0, fat: 5.0, carbs: 3.6 },
  { id: 'cheese', name: '奶酪', calories: 402, protein: 25.0, fat: 33.0, carbs: 1.3 },
  { id: 'cheese_slice', name: '芝士片', calories: 330, protein: 20.0, fat: 27.0, carbs: 3.0 },
  { id: 'butter', name: '黄油', calories: 717, protein: 0.9, fat: 81.0, carbs: 0.1 },
  { id: 'cream', name: '淡奶油', calories: 340, protein: 2.0, fat: 36.0, carbs: 2.0 },

  // ===== 蔬菜类 =====
  { id: 'broccoli', name: '西兰花', calories: 34, protein: 2.8, fat: 0.4, carbs: 6.6 },
  { id: 'spinach', name: '菠菜', calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6 },
  { id: 'cabbage', name: '卷心菜', calories: 25, protein: 1.5, fat: 0.1, carbs: 5.8 },
  { id: 'lettuce', name: '生菜', calories: 15, protein: 1.4, fat: 0.2, carbs: 2.9 },
  { id: 'carrot', name: '胡萝卜', calories: 41, protein: 0.9, fat: 0.2, carbs: 9.6 },
  { id: 'tomato', name: '番茄', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  { id: 'cucumber', name: '黄瓜', calories: 16, protein: 0.7, fat: 0.1, carbs: 3.6 },
  { id: 'eggplant', name: '茄子', calories: 21, protein: 1.0, fat: 0.2, carbs: 4.6 },
  { id: 'mushroom', name: '蘑菇', calories: 22, protein: 3.1, fat: 0.3, carbs: 3.3 },
  { id: 'shimeji', name: '金针菇', calories: 26, protein: 2.7, fat: 0.2, carbs: 5.1 },
  { id: 'enoki', name: '蟹味菇', calories: 36, protein: 3.2, fat: 0.4, carbs: 6.1 },
  { id: 'celery', name: '芹菜', calories: 16, protein: 0.7, fat: 0.2, carbs: 3.5 },
  { id: 'asparagus', name: '芦笋', calories: 20, protein: 2.2, fat: 0.1, carbs: 3.9 },
  { id: 'green_bean', name: '四季豆', calories: 31, protein: 1.8, fat: 0.1, carbs: 7.3 },
  { id: 'bok_choy', name: '小白菜', calories: 17, protein: 1.8, fat: 0.3, carbs: 2.9 },
  { id: 'kale', name: '羽衣甘蓝', calories: 49, protein: 4.3, fat: 0.9, carbs: 8.8 },
  { id: 'corn_shoot', name: '玉米笋', calories: 26, protein: 2.4, fat: 0.4, carbs: 4.6 },

  // ===== 水果类 =====
  { id: 'apple', name: '苹果', calories: 52, protein: 0.3, fat: 0.2, carbs: 13.8 },
  { id: 'banana', name: '香蕉', calories: 89, protein: 1.1, fat: 0.2, carbs: 22.8 },
  { id: 'orange', name: '橙子', calories: 47, protein: 0.9, fat: 0.1, carbs: 11.8 },
  { id: 'grape', name: '葡萄', calories: 67, protein: 0.6, fat: 0.4, carbs: 17.0 },
  { id: 'watermelon', name: '西瓜', calories: 30, protein: 0.6, fat: 0.1, carbs: 7.6 },
  { id: 'strawberry', name: '草莓', calories: 32, protein: 0.7, fat: 0.3, carbs: 7.7 },
  { id: 'blueberry', name: '蓝莓', calories: 57, protein: 0.7, fat: 0.3, carbs: 14.5 },
  { id: 'kiwi', name: '猕猴桃', calories: 61, protein: 1.1, fat: 0.5, carbs: 14.7 },
  { id: 'mango', name: '芒果', calories: 60, protein: 0.8, fat: 0.4, carbs: 14.0 },
  { id: 'pineapple', name: '菠萝', calories: 50, protein: 0.5, fat: 0.1, carbs: 13.0 },
  { id: 'peach', name: '桃子', calories: 39, protein: 0.9, fat: 0.1, carbs: 9.5 },
  { id: 'pear', name: '梨', calories: 42, protein: 0.3, fat: 0.1, carbs: 10.7 },
  { id: 'avocado', name: '牛油果', calories: 160, protein: 2.0, fat: 15.0, carbs: 9.0 },
  { id: 'pomegranate', name: '石榴', calories: 83, protein: 1.2, fat: 1.2, carbs: 19.0 },
  { id: 'dragon_fruit', name: '火龙果', calories: 50, protein: 1.1, fat: 0.2, carbs: 12.0 },

  // ===== 豆制品 =====
  { id: 'tofu', name: '豆腐', calories: 81, protein: 8.0, fat: 4.2, carbs: 2.0 },
  { id: 'tofu_silken', name: '嫩豆腐', calories: 45, protein: 5.0, fat: 2.0, carbs: 2.0 },
  { id: 'tofu_fried', name: '油豆腐', calories: 245, protein: 14.0, fat: 19.0, carbs: 6.0 },
  { id: 'soy_milk', name: '豆浆', calories: 33, protein: 2.9, fat: 1.2, carbs: 2.0 },
  { id: 'soy_bean', name: '黄豆', calories: 390, protein: 36.0, fat: 16.0, carbs: 21.0 },
  { id: 'edamame', name: '毛豆', calories: 131, protein: 13.0, fat: 5.0, carbs: 10.0 },
  { id: 'black_bean', name: '黑豆', calories: 341, protein: 36.0, fat: 15.0, carbs: 24.0 },
  { id: 'red_bean', name: '红豆', calories: 309, protein: 21.0, fat: 0.5, carbs: 55.0 },

  // ===== 坚果类 =====
  { id: 'almond', name: '杏仁', calories: 579, protein: 21.0, fat: 50.0, carbs: 22.0 },
  { id: 'walnut', name: '核桃', calories: 646, protein: 15.0, fat: 65.0, carbs: 14.0 },
  { id: 'peanut', name: '花生', calories: 567, protein: 25.0, fat: 45.0, carbs: 16.0 },
  { id: 'cashew', name: '腰果', calories: 553, protein: 18.0, fat: 44.0, carbs: 30.0 },
  { id: 'pistachio', name: '开心果', calories: 560, protein: 20.0, fat: 45.0, carbs: 28.0 },
  { id: 'hazelnut', name: '榛子', calories: 628, protein: 15.0, fat: 61.0, carbs: 17.0 },
  { id: 'macadamia', name: '夏威夷果', calories: 718, protein: 8.0, fat: 76.0, carbs: 14.0 },
  { id: 'pine_nut', name: '松子', calories: 673, protein: 14.0, fat: 68.0, carbs: 13.0 },

  // ===== 零食饮料 =====
  { id: 'cookie', name: '饼干', calories: 448, protein: 5.0, fat: 16.0, carbs: 68.0 },
  { id: 'chocolate', name: '巧克力', calories: 546, protein: 5.0, fat: 31.0, carbs: 60.0 },
  { id: 'dark_chocolate', name: '黑巧克力', calories: 598, protein: 8.0, fat: 43.0, carbs: 46.0 },
  { id: 'ice_cream', name: '冰淇淋', calories: 207, protein: 3.5, fat: 11.0, carbs: 24.0 },
  { id: 'popcorn', name: '爆米花', calories: 387, protein: 13.0, fat: 4.5, carbs: 78.0 },
  { id: 'potato_chip', name: '薯片', calories: 536, protein: 7.0, fat: 35.0, carbs: 53.0 },
  { id: 'french_fries', name: '薯条', calories: 312, protein: 3.0, fat: 15.0, carbs: 41.0 },
  { id: 'candy', name: '糖果', calories: 375, protein: 0, fat: 0, carbs: 94.0 },
  { id: 'jelly', name: '果冻', calories: 56, protein: 0, fat: 0, carbs: 14.0 },
  { id: 'dried_fruit', name: '果干', calories: 243, protein: 1.5, fat: 0.5, carbs: 61.0 },

  // ===== 饮品类 =====
  { id: 'cola', name: '可乐', calories: 42, protein: 0, fat: 0, carbs: 10.6 },
  { id: 'sprite', name: '雪碧', calories: 39, protein: 0, fat: 0, carbs: 9.8 },
  { id: 'orange_juice', name: '橙汁', calories: 45, protein: 0.7, fat: 0.2, carbs: 10.4 },
  { id: 'apple_juice', name: '苹果汁', calories: 46, protein: 0.1, fat: 0.1, carbs: 11.3 },
  { id: 'coconut_water', name: '椰子水', calories: 19, protein: 0.7, fat: 0.2, carbs: 3.7 },
  { id: 'green_tea', name: '绿茶', calories: 1, protein: 0, fat: 0, carbs: 0.2 },
  { id: 'black_tea', name: '红茶', calories: 1, protein: 0, fat: 0, carbs: 0.3 },
  { id: 'coffee_black', name: '美式咖啡', calories: 2, protein: 0.3, fat: 0, carbs: 0 },
  { id: 'latte', name: '拿铁咖啡', calories: 67, protein: 3.4, fat: 3.6, carbs: 4.8 },
  { id: 'cappuccino', name: '卡布奇诺', calories: 74, protein: 3.9, fat: 4.0, carbs: 5.0 },

  // ===== 调味品类 =====
  { id: 'soy_sauce', name: '酱油', calories: 63, protein: 8.0, fat: 0.1, carbs: 5.0 },
  { id: 'salt', name: '盐', calories: 0, protein: 0, fat: 0, carbs: 0 },
  { id: 'sugar', name: '白糖', calories: 387, protein: 0, fat: 0, carbs: 100.0 },
  { id: 'honey', name: '蜂蜜', calories: 304, protein: 0.3, fat: 0, carbs: 82.0 },
  { id: 'olive_oil', name: '橄榄油', calories: 884, protein: 0, fat: 100.0, carbs: 0 },
  { id: 'vegetable_oil', name: '植物油', calories: 900, protein: 0, fat: 100.0, carbs: 0 },
  { id: 'sesame_oil', name: '香油', calories: 900, protein: 0, fat: 100.0, carbs: 0 },
  { id: 'vinegar', name: '醋', calories: 21, protein: 0, fat: 0, carbs: 0.9 },
  { id: 'mayonnaise', name: '蛋黄酱', calories: 680, protein: 1.0, fat: 75.0, carbs: 0.6 },
  { id: 'ketchup', name: '番茄酱', calories: 112, protein: 1.7, fat: 0.1, carbs: 26.0 },

  // ===== 快餐类 =====
  { id: 'hamburger', name: '汉堡', calories: 295, protein: 13.0, fat: 14.0, carbs: 30.0 },
  { id: 'pizza', name: '披萨', calories: 266, protein: 11.0, fat: 10.0, carbs: 33.0 },
  { id: 'hotdog', name: '热狗', calories: 290, protein: 11.0, fat: 16.0, carbs: 24.0 },
  { id: 'fried_chicken', name: '炸鸡', calories: 246, protein: 19.0, fat: 14.0, carbs: 13.0 },
  { id: 'sandwich', name: '三明治', calories: 250, protein: 10.0, fat: 10.0, carbs: 30.0 },
  { id: 'curry_rice', name: '咖喱饭', calories: 180, protein: 5.0, fat: 6.0, carbs: 27.0 },
  { id: 'beef_noodle', name: '牛肉面', calories: 130, protein: 6.0, fat: 4.0, carbs: 18.0 },
  { id: 'dumpling_boiled', name: '水饺', calories: 242, protein: 9.5, fat: 8.0, carbs: 35.4 },

  // ===== 早餐类 =====
  { id: 'congee', name: '白粥', calories: 46, protein: 1.1, fat: 0.2, carbs: 9.9 },
  { id: 'soy_milk_boiled', name: '甜豆浆', calories: 65, protein: 2.9, fat: 1.5, carbs: 10.0 },
  { id: 'fried_dough', name: '油条', calories: 386, protein: 6.0, fat: 17.0, carbs: 51.0 },
  { id: 'shaobing', name: '烧饼', calories: 280, protein: 8.0, fat: 8.0, carbs: 45.0 },
  { id: 'tangyuan', name: '汤圆', calories: 280, protein: 5.0, fat: 8.0, carbs: 48.0 },
  { id: 'zongzi', name: '粽子', calories: 200, protein: 4.0, fat: 2.0, carbs: 40.0 },
]

// 根据关键词搜索食物
export function searchFoods(keyword) {
  if (!keyword || keyword.trim() === '') {
    return []
  }
  const lower = keyword.toLowerCase().trim()
  return foodDatabase.filter(food =>
    food.name.toLowerCase().includes(lower) ||
    (food.nameEn && food.nameEn.toLowerCase().includes(lower))
  )
}

// 根据ID获取食物
export function getFoodById(id) {
  return foodDatabase.find(food => food.id === id)
}

// 计算食物热量（根据克数）
export function calculateCalories(food, grams) {
  return Math.round((food.calories * grams) / 100)
}

// 中文 → 英文翻译映射表
const chineseToEnglish = {
  '麻薯': 'mochi',
  '奶茶': 'milk tea',
  '粽子': 'zongzi rice dumpling',
  '汤圆': 'tangyuan glutinous rice ball',
  '油条': 'fried dough stick',
  '烧饼': 'shaobing chinese flatbread',
  '馒头': 'steamed bun mantou',
  '饺子': 'dumplings jiaozi',
  '水饺': 'boiled dumplings',
  '包子': 'baozi bun',
  '粥': 'congee rice porridge',
  '豆腐': 'tofu',
  '豆浆': 'soy milk',
  '毛豆': 'edamame',
  '红豆': 'red bean',
  '绿豆': 'mung bean',
  '黑豆': 'black bean',
  '面条': 'noodles',
  '方便面': 'instant noodles ramen',
  '挂面': 'dried noodles',
  '米粉': 'rice noodles',
  '凉皮': 'liangpi cold noodles',
  '凉面': 'cold noodles',
  '炒饭': 'fried rice',
  '炒面': 'fried noodles',
  '煎饼': 'jianbing crepe',
  '煎饼果子': 'jianbing guozi',
  '肉夹馍': 'rougamo chinese hamburger',
  '羊肉串': 'lamb kebab',
  '烤串': 'kebab',
  '火锅': 'hotpot hot pot',
  '串串': 'chuanchuan skewers',
  '烧烤': 'bbq grilled',
  '烤肉': 'grilled meat',
  '炸鸡': 'fried chicken',
  '鸡翅': 'chicken wing',
  '鸡腿': 'chicken leg thigh',
  '鸡胸': 'chicken breast',
  '鸭肉': 'duck meat',
  '鸭脖': 'duck neck',
  '鸭血': 'duck blood',
  '猪蹄': 'pork trotter',
  '猪排': 'pork chop',
  '五花肉': 'pork belly',
  '牛腩': 'beef brisket',
  '牛排': 'steak beef steak',
  '牛腱': 'beef tendon shank',
  '三文鱼': 'salmon',
  '金枪鱼': 'tuna',
  '鳕鱼': 'cod fish',
  '虾': 'shrimp',
  '螃蟹': 'crab',
  '龙虾': 'lobster',
  '扇贝': 'scallop',
  '蛤蜊': 'clam',
  '生蚝': 'oyster',
  '海胆': 'sea urchin',
  '海参': 'sea cucumber',
  '鱿鱼': 'squid',
  '章鱼': 'octopus',
  '芒果': 'mango',
  '火龙果': 'dragon fruit',
  '猕猴桃': 'kiwi',
  '石榴': 'pomegranate',
  '柚子': 'pomelo grapefruit',
  '菠萝': 'pineapple',
  '草莓': 'strawberry',
  '蓝莓': 'blueberry',
  '西瓜': 'watermelon',
  '哈密瓜': 'cantaloupe',
  '葡萄': 'grape',
  '苹果': 'apple',
  '梨': 'pear',
  '桃子': 'peach',
  '杏子': 'apricot',
  '樱桃': 'cherry',
  '荔枝': 'lychee',
  '龙眼': 'longan',
  '枇杷': 'loquat',
  '椰子': 'coconut',
  '牛油果': 'avocado',
  '柠檬': 'lemon',
  '橘子': 'tangerine orange',
  '橙子': 'orange',
  '香蕉': 'banana',
  '罗汉果': 'monk fruit luohanguo',
  '山楂': 'hawthorn',
  '柿子': 'persimmon',
  '红薯': 'sweet potato',
  '土豆': 'potato',
  '紫薯': 'purple sweet potato',
  '玉米': 'corn',
  '南瓜': 'pumpkin',
  '冬瓜': 'winter melon',
  '西瓜皮': 'watermelon rind',
  '苦瓜': 'bitter melon',
  '黄瓜': 'cucumber',
  '番茄': 'tomato',
  '茄子': 'eggplant',
  '青椒': 'green pepper bell pepper',
  '红椒': 'red pepper',
  '辣椒': 'chili pepper',
  '土豆片': 'potato chips',
  '薯片': 'potato chips crisps',
  '薯条': 'french fries',
  '爆米花': 'popcorn',
  '饼干': 'biscuit cookie',
  '蛋糕': 'cake',
  '面包': 'bread',
  '吐司': 'toast',
  '披萨': 'pizza',
  '汉堡': 'hamburger burger',
  '热狗': 'hot dog',
  '三明治': 'sandwich',
  '沙拉': 'salad',
  '果冻': 'jelly',
  '布丁': 'pudding',
  '冰淇淋': 'ice cream',
  '雪糕': 'ice cream popsicle',
  '酸奶': 'yogurt',
  '奶酪': 'cheese',
  '芝士': 'cheese',
  '黄油': 'butter',
  '奶油': 'cream',
  '牛奶': 'milk',
  '可乐': 'cola coke',
  '雪碧': 'sprite soda',
  '芬达': 'fanta',
  '啤酒': 'beer',
  '白酒': 'baijiu chinese liquor',
  '红酒': 'red wine',
  '葡萄酒': 'wine',
  '咖啡': 'coffee',
  '拿铁': 'latte',
  '卡布奇诺': 'cappuccino',
  '摩卡': 'mocha',
  '星巴克': 'starbucks',
  '珍珠奶茶': 'bubble tea milk tea',
  '珍珠': 'pearl tapioca',
  '椰奶': 'coconut milk',
  '椰汁': 'coconut water juice',
  '蜂蜜': 'honey',
  '红糖': 'brown sugar',
  '冰糖': 'rock sugar',
  '巧克力': 'chocolate',
  '黑巧克力': 'dark chocolate',
  '白巧克力': 'white chocolate',
  '坚果': 'nuts',
  '杏仁': 'almond',
  '核桃': 'walnut',
  '花生': 'peanut',
  '瓜子': 'sunflower seeds',
  '松子': 'pine nut',
  '开心果': 'pistachio',
  '腰果': 'cashew',
  '榛子': 'hazelnut',
  '夏威夷果': 'macadamia',
  '碧根果': 'pecan',
  '海苔': 'seaweed nori',
  '薯条': 'fries',
  '炸薯条': 'french fries',
  '炸鱼': 'fish and chips',
  '天妇罗': 'tempura',
  '寿司': 'sushi',
  '刺身': 'sashimi',
  '味噌汤': 'miso soup',
  '拉面': 'ramen',
  '乌冬面': 'udon',
  '荞麦面': 'soba',
  '咖喱': 'curry',
  '咖喱饭': 'curry rice',
  '盖浇饭': 'rice bowl',
  '蛋炒饭': 'egg fried rice',
  '蛋花汤': 'egg drop soup',
  '酸辣汤': 'hot and sour soup',
  '紫菜汤': 'seaweed soup',
  '玉米汤': 'corn soup',
  '罗宋汤': 'borscht',
  '奶油蘑菇汤': 'creamy mushroom soup',
  '南瓜汤': 'pumpkin soup',
  '胡辣汤': 'hulatang spicy soup',
  '臭豆腐': 'stinky tofu',
  '毛豆腐': 'hairy tofu',
  '腐竹': 'tofu skin',
  '豆皮': 'tofu skin yuba',
  '豆芽': 'bean sprouts',
  '绿豆芽': 'mung bean sprouts',
  '黄豆芽': 'soybean sprouts',
  '海带': 'kelp seaweed',
  '紫菜': 'nori seaweed',
  '裙带菜': 'wakame',
  '泡菜': 'kimchi pickled',
  '榨菜': 'sichuan pickle',
  '酸菜': 'sauerkraut pickled mustard',
  '梅菜': 'pickled mustard green',
  '卤味': 'braised meat',
  '叉烧': 'char siu bbq pork',
  '烧鸭': 'roast duck',
  '烧鹅': 'roast goose',
  '白切鸡': 'poached chicken',
  '盐焗鸡': 'salt baked chicken',
  '叫花鸡': 'beggar chicken',
  '辣子鸡': 'spicy diced chicken',
  '宫保鸡丁': 'kung pao chicken',
  '鱼香肉丝': 'fish flavored shredded pork',
  '糖醋里脊': 'sweet and sour pork',
  '红烧肉': 'red braised pork',
  '东坡肉': 'dongpo pork',
  '回锅肉': 'twice cooked pork',
  '京酱肉丝': 'savory pork with sauce',
  '木须肉': 'moo shu pork',
  '青椒肉丝': 'pork with green pepper',
  '里脊肉': 'tenderloin pork',
  '狮子头': 'lion head meatball',
  '肉丸': 'meatball',
  '鱼丸': 'fish ball',
  '虾丸': 'shrimp ball',
  '蟹棒': 'crab stick surimi',
  '虾滑': 'shrimp paste',
  '鱼豆腐': 'fish tofu surimi',
  '牛百叶': 'beef tripe',
  '牛肚': 'beef stomach',
  '羊蝎子': 'lamb spine',
  '羊排': 'lamb chop',
  '羊腿': 'lamb leg',
  '肉骨茶': 'bak kut teh',
  '佛跳墙': 'buddha jumps over the wall soup',
  '过桥米线': 'crossing bridge rice noodles',
  '桂林米粉': 'guilin rice noodles',
  '柳州螺蛳粉': 'liuzhou luosifen',
  '云南米线': 'yunnan rice noodles',
  '热干面': 'hot dry noodles',
  '重庆小面': 'chongqing noodles',
  '担担面': 'dandan noodles',
  '刀削面': 'daoxiao hand cut noodles',
  '烩面': 'hui mian stewed noodles',
  '拽面': 'zhuai mian',
  '板面': 'ban mian',
  '手擀面': 'handmade noodles',
  '意面': 'pasta',
  '通心粉': 'macaroni',
  '螺旋粉': 'fusilli',
  '宽粉': 'wide flat noodles',
  '粉丝': 'vermicelli cellophane noodles',
  '粉条': 'starch noodles',
  '年糕': 'rice cake',
  '糯米': 'glutinous rice',
  '糯米粉': 'glutinous rice flour',
  '汤圆': 'tangyuan glutinous rice ball',
  '月饼': 'mooncake',
  '青团': 'qingtuan green rice cake',
  '艾窝窝': 'aiwowo sweet rice cake',
  '驴打滚': 'ludagun glutinous rice roll',
  '豌豆黄': 'pea cake',
  '红豆沙': 'red bean paste',
  '绿豆糕': 'mung bean cake',
  '龟苓膏': 'guilinggao herbal jelly',
  '凉粉': 'liangfen凉粉',
  '仙草': 'grass jelly',
  '烧仙草': 'herbal tea jelly',
  '芋圆': 'taro ball',
  '珍珠粉圆': 'tapioca pearl',
  '椰果': 'coconut jelly',
  '西米': 'sago',
  '露露': '杏仁露 almond milk',
  '王老吉': 'wanglaoji herbal tea',
  '加多宝': 'jiaduobao herbal tea',
  '凉茶': 'liangcha herbal tea',
  '酸梅汤': 'sour plum drink',
  '姜茶': 'ginger tea',
  '红糖姜茶': 'brown sugar ginger tea',
  '柠檬水': 'lemonade',
  '蜂蜜水': 'honey water',
  '盐水': 'salt water',
  '糖水': 'sweet soup',
  '龟苓膏': 'guilinggao jelly',
  '雪莲子': 'snow lotus seed',
  '桃胶': 'peach gum',
  '皂角米': 'soapberry seed',
  '银耳': 'white fungus tremella',
  '木耳': 'black fungus mushroom',
  '香菇': 'shiitake mushroom',
  '蘑菇': 'mushroom',
  '金针菇': 'enoki mushroom',
  '杏鲍菇': 'king oyster mushroom',
  '平菇': 'oyster mushroom',
  '草菇': 'straw mushroom',
  '茶树菇': 'tea tree mushroom',
  '鸡腿菇': 'shaggy ink cap mushroom',
  '蟹味菇': 'crab mushroom',
  '白玉菇': 'white shimeji',
  '海鲜菇': 'seafood mushroom',
  '榆黄菇': 'golden oyster mushroom',
  '猴头菇': 'hericium lion mane mushroom',
  '竹荪': 'bamboo fungus',
  '虫草花': 'cordyceps flower',
  '鸡枞': 'termite mushroom',
  '松茸': 'matsutake mushroom',
  '牛肝菌': 'porcini mushroom',
  '青头菌': 'green head mushroom',
  '见手青': 'blue bruise mushroom',
  '鸡油菌': 'chanterelle mushroom',
  '老人头': 'Lao Ren Tou mushroom',
  '禾麻菇': 'He Ma Gu mushroom',
  '黑松露': 'black truffle',
  '白松露': 'white truffle',
}

// DeepSeek API Key
const DEEPSEEK_API_KEY = 'sk-fee11b21be754ff49ee1f19e5422376e'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

// 直接询问 DeepSeek 获取食物热量
export async function searchOnlineFoods(keyword) {
  if (!keyword || keyword.trim() === '') {
    return []
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: `你是一个食物营养数据库。请根据用户输入的食物名称，返回该食物的营养信息。

请严格按以下 JSON 格式返回（只返回 JSON，不要任何其他文字）：
{
  "name": "食物名称",
  "calories": 每100克的热量(数字，单位kcal),
  "protein": 每100克的蛋白质(数字，单位g),
  "fat": 每100克的脂肪(数字，单位g),
  "carbs": 每100克的碳水化合物(数字，单位g)
}

对于常见中式菜肴（如辣椒炒肉、宫保鸡丁等），请根据常见的食材配比估算平均值返回。如果不确定，请估算一个合理的值。绝对不要返回空数组，必须返回一个有效的营养信息对象。` },
          { role: 'user', content: `查找 "${keyword}" 的营养信息，每100克的热量、蛋白质、脂肪、碳水化合物` }
        ],
        max_tokens: 200,
        temperature: 0.1
      })
    })

    const data = await response.json()
    console.log('DeepSeek API response:', data)
    if (data.choices && data.choices[0]?.message?.content) {
      const content = data.choices[0].message.content.trim()
      console.log('DeepSeek content:', content)
      // 尝试解析 JSON
      try {
        // 提取 JSON（可能有 markdown 包裹）
        let jsonStr = content
        if (content.includes('```json')) {
          jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        } else if (content.includes('```')) {
          jsonStr = content.replace(/```\n?/g, '').trim()
        }
        console.log('JSON string to parse:', jsonStr)
        const result = JSON.parse(jsonStr)
        console.log('Parsed result:', result)
        // 统一为数组处理
        const resultArray = Array.isArray(result) ? result : [result]
        if (resultArray.length > 0 && resultArray[0].name) {
          return resultArray.map((item, index) => ({
            id: `deepseek_${Date.now()}_${index}`,
            name: item.name || keyword,
            calories: Math.round(item.calories || 0),
            protein: parseFloat((item.protein || 0).toFixed(1)),
            fat: parseFloat((item.fat || 0).toFixed(1)),
            carbs: parseFloat((item.carbs || 0).toFixed(1)),
            isOnline: true
          })).filter(f => f.calories > 0)
        }
      } catch (parseError) {
        console.error('解析 DeepSeek 返回失败:', parseError, content)
      }
    }
  } catch (error) {
    console.error('DeepSeek 查询失败:', error)
  }
  return []
}
