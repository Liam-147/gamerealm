// 游戏数据
const gameData = {
  "categories": {
    "puzzle": {
      "name": "益智游戏",
      "icon": "🧩",
      "description": "挑战您的思维能力",
      "games": [
        {
          "id": "color-fill-3d",
          "name": "Color Fill 3D",
          "description": "在 Color Fill 3D 中，您的目标是通过在空白处移动块来用颜色填充整个网格。向任何方向拖动你的方块以传播颜色，但要小心避开可能阻止你前进的障碍物和敌人。",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ColorFill3dTeaser.jpg",
          "iframe_url": "https://play.famobi.com/color-fill-3d"
        },
        {
          "id": "color-roll-3d",
          "name": "Color Roll 3D",
          "description": "在 Color Roll 3D 中展开通往胜利的道路 - 终极 3D 拼图挑战！按照正确的顺序展开彩色的卷筒，重新创建给定的图像。",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ColorRoll3dTeaser.jpg",
          "iframe_url": "https://play.famobi.com/color-roll-3d"
        }
      ]
    },
    "arcade": {
      "name": "街机/休闲游戏",
      "icon": "🎮",
      "description": "经典的街机和休闲游戏",
      "games": [
        {
          "id": "rise-up",
          "name": "Rise Up",
          "description": "在 Rise Up 中保护、躲避并上升到顶峰 - 终极生存挑战！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/RiseUpTeaser.jpg",
          "iframe_url": "https://play.famobi.com/rise-up"
        },
        {
          "id": "giant-rush",
          "name": "Giant Rush",
          "description": "在 Giant Rush 中奔跑、合并和与巨人战斗 - 终极动感十足的冒险！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/GiantRushTeaser.jpg",
          "iframe_url": "https://play.famobi.com/giant-rush"
        }
      ]
    },
    "shooting": {
      "name": "射击游戏",
      "icon": "🎯",
      "description": "测试您的射击技能",
      "games": [
        {
          "id": "western-sniper",
          "name": "Western Sniper",
          "description": "瞄准并成为西部狙击手的终极枪手 - 最狂野的射击挑战！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/WesternSniperTeaser.jpg",
          "iframe_url": "https://play.famobi.com/western-sniper"
        }
      ]
    },
    "strategy": {
      "name": "策略游戏",
      "icon": "♟️",
      "description": "规划您的策略",
      "games": [
        {
          "id": "thief-puzzle",
          "name": "Thief Puzzle",
          "description": "在 Thief Puzzle 中掌握潜行和策略 - 成为这款迷人的 2D 益智游戏中的终极潜行大师！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ThiefPuzzleTeaser.jpg",
          "iframe_url": "https://play.famobi.com/thief-puzzle"
        }
      ]
    },
    "racing": {
      "name": "赛车/竞速游戏",
      "icon": "🏎️",
      "description": "体验速度与激情",
      "games": [
        {
          "id": "speed-master",
          "name": "Speed Master",
          "description": "在 Speed Master - 终极赛车挑战中加速称霸！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/SpeedMasterTeaser.jpg",
          "iframe_url": "https://play.famobi.com/speed-master"
        }
      ]
    },
    "music": {
      "name": "音乐/艺术游戏",
      "icon": "🎵",
      "description": "表达您的艺术才华",
      "games": [
        {
          "id": "fashion-battle",
          "name": "Fashion Battle",
          "description": "在 Fashion Battle 中大展身手，征服 T 台 - 只有最时尚的人才会获胜！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/FashionBattleTeaser.jpg",
          "iframe_url": "https://play.famobi.com/fashion-battle"
        }
      ]
    },
    "simulation": {
      "name": "休闲模拟游戏",
      "icon": "🎲",
      "description": "享受轻松的模拟体验",
      "games": [
        {
          "id": "train-miner",
          "name": "Train Miner",
          "description": "在 Train Miner 中享受无尽的采矿乐趣 - 扩展、升级和主宰赛道！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/TrainMinerTeaser.jpg",
          "iframe_url": "https://play.famobi.com/train-miner"
        }
      ]
    },
    "space": {
      "name": "太空/宇宙游戏",
      "icon": "🚀",
      "description": "探索浩瀚宇宙",
      "games": [
        {
          "id": "twisty-lines",
          "name": "Twisty Lines",
          "description": "在 Twisty Lines 中翱翔、环绕和生存 - 2D 宇宙中的终极太空之旅！",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/TwistyLinesTeaser.jpg",
          "iframe_url": "https://play.famobi.com/twisty-lines"
        }
      ]
    }
  },
  
  // 热门游戏列表
  "popular": [
    "color-fill-3d",
    "rise-up",
    "western-sniper",
    "train-miner"
  ],
  
  // 最新游戏列表
  "newest": [
    "twisty-lines",
    "fashion-battle",
    "speed-master",
    "thief-puzzle"
  ]
};

// 通过ID获取游戏数据
function getGameById(gameId) {
  for (const categoryKey in gameData.categories) {
    const category = gameData.categories[categoryKey];
    const game = category.games.find(g => g.id === gameId);
    if (game) return game;
  }
  return null;
}

// 获取热门游戏列表
function getPopularGames() {
  return gameData.popular.map(id => getGameById(id)).filter(game => game !== null);
}

// 获取最新游戏列表
function getNewestGames() {
  return gameData.newest.map(id => getGameById(id)).filter(game => game !== null);
}

// 搜索游戏
function searchGames(query) {
  query = query.toLowerCase();
  const results = [];
  
  for (const categoryKey in gameData.categories) {
    const category = gameData.categories[categoryKey];
    for (const game of category.games) {
      if (game.name.toLowerCase().includes(query) || 
          game.description.toLowerCase().includes(query)) {
        results.push(game);
      }
    }
  }
  
  return results;
} 