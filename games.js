// Game Data
const gameData = {
  "categories": {
    "puzzle": {
      "name": "Puzzle Games",
      "icon": "🧩",
      "description": "Challenge your mind and problem-solving skills",
      "games": [
        {
          "id": "color-fill-3d",
          "name": "Color Fill 3D",
          "description": "In Color Fill 3D, your goal is to fill the entire grid with color by moving your block around the empty spaces. Drag your block in any direction to spread the color, but be careful to avoid obstacles and enemies that might block your path.",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ColorFill3dTeaser.jpg",
          "iframe_url": "https://play.famobi.com/color-fill-3d"
        },
        {
          "id": "color-roll-3d",
          "name": "Color Roll 3D",
          "description": "Unfold your path to victory in Color Roll 3D - the ultimate 3D puzzle challenge! Unfold the colorful rolls in the correct order to recreate the given image.",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ColorRoll3dTeaser.jpg",
          "iframe_url": "https://play.famobi.com/color-roll-3d"
        },
        {
          "id": "color-water-sort-3d",
          "name": "Color Water Sort 3D",
          "description": "Dive into the colorful challenge of Color Water Sort 3D - where strategy meets vibrant fun! Sort the colored water into the correct test tubes.",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ColorWaterSort3dTeaser.jpg",
          "iframe_url": "https://play.famobi.com/color-water-sort-3d"
        },
        {
          "id": "braindom",
          "name": "Braindom",
          "description": "Challenge your thinking and learn history with Braindom - the ultimate puzzle brain teaser!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/BraindomTeaser.jpg",
          "iframe_url": "https://play.famobi.com/braindom"
        },
        {
          "id": "sort-it",
          "name": "Sort It",
          "description": "Sort, strategize and succeed in Sort It - the ultimate color sorting puzzle challenge!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/SortItTeaser.jpg",
          "iframe_url": "https://play.famobi.com/sort-it"
        }
      ]
    },
    "arcade": {
      "name": "Arcade/Casual Games",
      "icon": "🎮",
      "description": "Classic arcade and casual gaming fun",
      "games": [
        {
          "id": "rise-up",
          "name": "Rise Up",
          "description": "Protect, dodge, and rise to the top in Rise Up - the ultimate survival challenge!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/RiseUpTeaser.jpg",
          "iframe_url": "https://play.famobi.com/rise-up"
        },
        {
          "id": "giant-rush",
          "name": "Giant Rush",
          "description": "Run, merge, and battle giants in Giant Rush - the ultimate action-packed adventure!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/GiantRushTeaser.jpg",
          "iframe_url": "https://play.famobi.com/giant-rush"
        },
        {
          "id": "go-escape",
          "name": "Go Escape",
          "description": "Dodge, jump, and escape in Go Escape - the ultimate test of skill and reflexes!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/GoEscapeTeaser.jpg",
          "iframe_url": "https://play.famobi.com/go-escape"
        },
        {
          "id": "neon-rider",
          "name": "Neon Rider",
          "description": "Ride, flip, and dominate the neon world in Neon Rider - the ultimate 2D motorcycle game!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/NeonRiderTeaser.jpg",
          "iframe_url": "https://play.famobi.com/neon-rider"
        }
      ]
    },
    "shooting": {
      "name": "Shooting Games",
      "icon": "🎯",
      "description": "Test your aiming skills",
      "games": [
        {
          "id": "western-sniper",
          "name": "Western Sniper",
          "description": "Aim and become the ultimate gunslinger in Western Sniper - the wildest shooting challenge!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/WesternSniperTeaser.jpg",
          "iframe_url": "https://play.famobi.com/western-sniper"
        },
        {
          "id": "alien-attack",
          "name": "Alien Attack",
          "description": "Blast and dominate the universe in Alien Attack - the ultimate 2D spacecraft shooter!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/AlienAttackTeaser.jpg",
          "iframe_url": "https://play.famobi.com/alien-attack"
        }
      ]
    },
    "strategy": {
      "name": "Strategy Games",
      "icon": "♟️",
      "description": "Plan your moves carefully",
      "games": [
        {
          "id": "thief-puzzle",
          "name": "Thief Puzzle",
          "description": "Master stealth and strategy in Thief Puzzle - become the ultimate sneak master in this engaging 2D puzzle game!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/ThiefPuzzleTeaser.jpg",
          "iframe_url": "https://play.famobi.com/thief-puzzle"
        },
        {
          "id": "peet-sneak",
          "name": "Peet Sneak",
          "description": "Sneak, strategize, and solve in Peet Sneak - your ultimate stealth adventure!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/PeetSneakTeaser.jpg",
          "iframe_url": "https://play.famobi.com/peet-sneak"
        },
        {
          "id": "toilet-run",
          "name": "Toilet Run",
          "description": "Race, swipe, and rush into the ultimate bathroom dash in Toilet Run - getting to the toilet is a thrilling sprint!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/Toilet_RunTeaser.jpg",
          "iframe_url": "https://play.famobi.com/toilet-run"
        }
      ]
    },
    "racing": {
      "name": "Racing Games",
      "icon": "🏎️",
      "description": "Experience speed and excitement",
      "games": [
        {
          "id": "speed-master",
          "name": "Speed Master",
          "description": "Accelerate to domination in Speed Master - the ultimate racing challenge!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/SpeedMasterTeaser.jpg",
          "iframe_url": "https://play.famobi.com/speed-master"
        },
        {
          "id": "cowboy-swing",
          "name": "Cowboy Swing",
          "description": "Swing as fast as you can in Cowboy Swing! Swing from one point to another and try to get as far as possible.",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/CowboySwingTeaser.jpg",
          "iframe_url": "https://play.famobi.com/cowboy-swing"
        },
        {
          "id": "lawn-mower",
          "name": "Lawn Mower",
          "description": "Mow, race, and master endless tracks in Lawn Mower - the ultimate 3D grass-cutting challenge!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/LawnMowerTeaser.jpg",
          "iframe_url": "https://play.famobi.com/lawn-mower"
        }
      ]
    },
    "music": {
      "name": "Music/Art Games",
      "icon": "🎵",
      "description": "Express your artistic talents",
      "games": [
        {
          "id": "fashion-battle",
          "name": "Fashion Battle",
          "description": "Style, strut, and conquer the runway in Fashion Battle - only the most fashionable win!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/FashionBattleTeaser.jpg",
          "iframe_url": "https://play.famobi.com/fashion-battle"
        }
      ]
    },
    "simulation": {
      "name": "Casual Simulation Games",
      "icon": "🎲",
      "description": "Enjoy relaxing simulation experiences",
      "games": [
        {
          "id": "train-miner",
          "name": "Train Miner",
          "description": "Enjoy endless mining fun in Train Miner - expand, upgrade, and dominate the tracks!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/TrainMinerTeaser.jpg",
          "iframe_url": "https://play.famobi.com/train-miner"
        },
        {
          "id": "fruit-party",
          "name": "Fruit Party",
          "description": "Merge and grow your fruits to score high in Fruit Party - the ultimate basket challenge!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/FruitPartyTeaser.jpg",
          "iframe_url": "https://play.famobi.com/fruit-party"
        }
      ]
    },
    "space": {
      "name": "Space/Universe Games",
      "icon": "🚀",
      "description": "Explore the vast cosmos",
      "games": [
        {
          "id": "twisty-lines",
          "name": "Twisty Lines",
          "description": "Soar, orbit, and survive in Twisty Lines - the ultimate space journey in a 2D universe!",
          "thumbnail": "https://img.cdn.famobi.com/portal/html5games/images/tmp/TwistyLinesTeaser.jpg",
          "iframe_url": "https://play.famobi.com/twisty-lines"
        }
      ]
    }
  },
  
  // Popular games list
  "popular": [
    "color-fill-3d",
    "rise-up", 
    "western-sniper",
    "speed-master",
    "thief-puzzle",
    "giant-rush",
    "color-roll-3d",
    "color-water-sort-3d",
    "neon-rider",
    "braindom"
  ],
  
  // Newest games list
  "newest": [
    "fruit-party",
    "color-water-sort-3d",
    "fashion-battle",
    "twisty-lines",
    "color-roll-3d",
    "lawn-mower",
    "peet-sneak",
    "go-escape"
  ]
};

// Get all games
function getAllGames() {
  const allGames = [];
  
  // Get games from each category
  for (const categoryKey in gameData.categories) {
    const category = gameData.categories[categoryKey];
    category.games.forEach(game => {
      // Add category info to game object
      game.category = category.name;
      allGames.push(game);
    });
  }
  
  return allGames;
}

// Get game by ID
function getGameById(gameId) {
  for (const categoryKey in gameData.categories) {
    const category = gameData.categories[categoryKey];
    const game = category.games.find(g => g.id === gameId);
    if (game) {
      // Add category info
      game.category = category.name;
      return game;
    }
  }
  return null;
}

// Get popular games list
function getPopularGames() {
  return gameData.popular.map(id => getGameById(id)).filter(game => game !== null);
}

// Get newest games list
function getNewestGames() {
  return gameData.newest.map(id => getGameById(id)).filter(game => game !== null);
}

// Get favorited games
function getFavoriteGames() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.map(id => getGameById(id)).filter(game => game !== null);
}

// Search games
function searchGames(query) {
  if (!query) return [];
  
  query = query.toLowerCase();
  const allGames = getAllGames();
  
  // Exact matches
  const exactMatches = allGames.filter(game => {
    return game.name.toLowerCase() === query;
  });
  
  // If there are exact matches, return them
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Partial matches (contains search term)
  const partialMatches = allGames.filter(game => {
    return game.name.toLowerCase().includes(query) || 
           game.description.toLowerCase().includes(query) ||
           game.category.toLowerCase().includes(query);
  });
  
  // If there are partial matches, return them
  if (partialMatches.length > 0) {
    return partialMatches;
  }
  
  // If no exact or partial matches, try fuzzy matching
  return allGames.filter(game => {
    // Split query and game name into words
    const queryWords = query.split(/\s+/);
    const nameWords = game.name.toLowerCase().split(/\s+/);
    
    // If any word in the query is part of a word in the game name, consider it a match
    for (const queryWord of queryWords) {
      if (queryWord.length < 2) continue; // Ignore very short words
      
      for (const nameWord of nameWords) {
        if (nameWord.includes(queryWord) || queryWord.includes(nameWord)) {
          return true;
        }
      }
    }
    
    return false;
  });
} 