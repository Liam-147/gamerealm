// 游戏详情页脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言设置
    setupLanguageSelector();
    
    // 应用当前语言设置
    applyCurrentLanguage();
    
    // 获取URL中的游戏ID参数
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    if (!gameId) {
        // 如果没有游戏ID参数，重定向到首页
        window.location.href = 'index.html';
        return;
    }
    
    // 从JSON文件加载游戏数据
    fetch('games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载游戏数据');
            }
            return response.json();
        })
        .then(data => {
            const gamesData = data.games;
            loadGameDetails(gamesData, gameId);
            
            // 应用当前语言设置，确保新加载的内容也被翻译
            applyCurrentLanguage();
        })
        .catch(error => {
            console.error('加载游戏数据时出错:', error);
            document.getElementById('gameTitle').textContent = '数据加载错误';
            document.getElementById('gameDescription').textContent = '抱歉，无法加载游戏数据。请稍后再试。';
            document.getElementById('playButton').style.display = 'none';
        });
});

// 加载游戏详情
function loadGameDetails(gamesData, gameId) {
    // 查找当前游戏
    const currentGame = gamesData.find(game => game.id === gameId);
    
    if (!currentGame) {
        // 如果找不到对应的游戏，显示错误信息
        document.getElementById('gameTitle').textContent = '游戏未找到';
        document.getElementById('gameDescription').textContent = '抱歉，找不到您请求的游戏信息。';
        document.getElementById('playButton').style.display = 'none';
        return;
    }
    
    // 更新页面标题
    document.title = `${currentGame.title} - GameRealm`;
    
    // 填充游戏详情
    document.getElementById('gameTitle').textContent = currentGame.title;
    document.getElementById('gameCategory').textContent = currentGame.category;
    document.getElementById('gameDescription').textContent = currentGame.description;
    document.getElementById('gameImage').src = currentGame.image;
    document.getElementById('gameImage').alt = currentGame.title;
    
    // 更新iframe标题
    document.getElementById('iframeGameTitle').textContent = currentGame.title;
    
    // 设置"开始游戏"按钮点击事件
    const playButton = document.getElementById('playButton');
    const gameIframeContainer = document.getElementById('gameIframeContainer');
    const gameIframe = document.getElementById('gameIframe');
    const closeIframe = document.getElementById('closeIframe');
    
    playButton.addEventListener('click', function() {
        // 设置iframe的src属性为游戏链接
        gameIframe.src = currentGame.iframeUrl;
        // 显示游戏iframe容器
        gameIframeContainer.style.display = 'flex';
        // 阻止页面滚动
        document.body.style.overflow = 'hidden';
    });
    
    // 关闭iframe
    closeIframe.addEventListener('click', function() {
        // 隐藏游戏iframe容器
        gameIframeContainer.style.display = 'none';
        // 清空iframe的src，停止游戏
        gameIframe.src = '';
        // 恢复页面滚动
        document.body.style.overflow = 'auto';
    });
    
    // 加载相关游戏推荐
    loadRelatedGames(gamesData, currentGame);
}

// 加载相关游戏推荐
function loadRelatedGames(allGames, currentGame) {
    const relatedGamesContainer = document.querySelector('.related-games .games-grid');
    
    // 清空容器
    relatedGamesContainer.innerHTML = '';
    
    // 筛选相关游戏（同类别且不是当前游戏）
    const relatedGames = allGames.filter(game => 
        game.category === currentGame.category && game.id !== currentGame.id
    );
    
    // 如果相关游戏太少，添加一些随机游戏
    if (relatedGames.length < 4) {
        const otherGames = allGames.filter(game => 
            game.category !== currentGame.category && game.id !== currentGame.id
        );
        
        // 随机打乱并选择几个游戏
        const shuffled = otherGames.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4 - relatedGames.length);
        
        relatedGames.push(...selected);
    }
    
    // 最多显示4个相关游戏
    const gamesToShow = relatedGames.slice(0, 4);
    
    // 创建游戏卡片
    gamesToShow.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.dataset.id = game.id;
        
        gameCard.innerHTML = `
            <div class="game-thumbnail">
                <img src="${game.image}" alt="${game.title}">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-tag">${game.category}</span>
            </div>
        `;
        
        // 添加点击事件
        gameCard.addEventListener('click', function() {
            window.location.href = `game.html?id=${encodeURIComponent(game.id)}`;
        });
        
        relatedGamesContainer.appendChild(gameCard);
    });
}

// 语言选择功能
function setupLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLanguageSpan = document.querySelector('.current-language');
    
    if (!languageBtn || !languageDropdown || !languageOptions.length || !currentLanguageSpan) {
        console.error('语言选择器元素未找到');
        return;
    }
    
    // 获取页面默认语言或用户已选语言
    let currentLanguage = localStorage.getItem('gameRealmLanguage') || 'zh-CN';
    
    // 设置当前语言显示
    updateLanguageDisplay();
    
    // 高亮当前选中的语言
    highlightCurrentLanguage();
    
    // 语言切换按钮点击事件
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });
    
    // 点击页面其他位置关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });
    
    // 语言选项点击事件
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const newLang = this.getAttribute('data-lang');
            
            // 如果选择了不同的语言
            if (newLang !== currentLanguage) {
                // 保存新语言
                currentLanguage = newLang;
                localStorage.setItem('gameRealmLanguage', currentLanguage);
                
                // 更新语言显示
                updateLanguageDisplay();
                
                // 高亮当前选中的语言
                highlightCurrentLanguage();
                
                // 应用语言变化到页面
                applyLanguageChange(currentLanguage);
            }
            
            // 关闭下拉菜单
            languageDropdown.classList.remove('show');
        });
    });
    
    // 首次加载时应用当前语言
    applyLanguageChange(currentLanguage);
    
    // 更新语言显示
    function updateLanguageDisplay() {
        // 根据语言代码设置显示文本
        const languageText = {
            'zh-CN': '中文',
            'en-US': 'English',
            'ja-JP': '日本語',
            'ko-KR': '한국어',
            'es-ES': 'Español',
            'fr-FR': 'Français',
            'de-DE': 'Deutsch',
            'ru-RU': 'Русский',
            'pt-BR': 'Português',
            'it-IT': 'Italiano',
            'ar-SA': 'العربية',
            'hi-IN': 'हिन्दी',
            'th-TH': 'ไทย',
            'vi-VN': 'Tiếng Việt',
            'id-ID': 'Bahasa Indonesia',
            'nl-NL': 'Nederlands',
            'tr-TR': 'Türkçe',
            'pl-PL': 'Polski'
        };
        
        // 国旗表情符号映射
        const flagEmojis = {
            'zh-CN': '🇨🇳',
            'en-US': '🇺🇸',
            'ja-JP': '🇯🇵',
            'ko-KR': '🇰🇷',
            'es-ES': '🇪🇸',
            'fr-FR': '🇫🇷',
            'de-DE': '🇩🇪',
            'ru-RU': '🇷🇺',
            'pt-BR': '🇧🇷',
            'it-IT': '🇮🇹',
            'ar-SA': '🇸🇦',
            'hi-IN': '🇮🇳',
            'th-TH': '🇹🇭',
            'vi-VN': '🇻🇳',
            'id-ID': '🇮🇩',
            'nl-NL': '🇳🇱',
            'tr-TR': '🇹🇷',
            'pl-PL': '🇵🇱'
        };
        
        const flag = flagEmojis[currentLanguage] || '🇨🇳';
        const langName = languageText[currentLanguage] || '中文';
        currentLanguageSpan.innerHTML = `<span class="flag">${flag}</span> ${langName}`;
    }
    
    // 高亮当前选中的语言
    function highlightCurrentLanguage() {
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === currentLanguage) {
                option.classList.add('active');
            }
        });
    }
}

// 应用当前语言
function applyCurrentLanguage() {
    const currentLanguage = localStorage.getItem('gameRealmLanguage') || 'zh-CN';
    applyLanguageChange(currentLanguage);
}

// 应用语言变化
function applyLanguageChange(lang) {
    console.log(`正在应用语言: ${lang}`);
    
    // 通过API加载对应语言的文本资源 - 使用相对路径
    fetch(`./languages/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                // 如果找不到语言文件，使用默认语言
                console.warn(`未找到语言文件: ${lang}，使用默认语言`);
                return fetch('./languages/zh-CN.json');
            }
            return response.json();
        })
        .then(translations => {
            // 更新页面文本
            if (translations) {
                updatePageText(translations);
                console.log(`语言已更新为: ${lang}`);
                
                // 保存语言设置，确保跨页面持久化
                localStorage.setItem('gameRealmLanguage', lang);
                
                // 触发自定义事件，通知页面语言已更新
                document.dispatchEvent(new CustomEvent('languageChanged', { detail: translations }));
            } else {
                console.error('语言文件格式错误或为空');
            }
        })
        .catch(error => {
            console.error('加载语言数据时出错:', error);
            
            // 如果出错，尝试加载默认语言
            if (lang !== 'zh-CN') {
                console.warn('尝试加载默认语言 zh-CN');
                fetch('./languages/zh-CN.json')
                    .then(response => response.json())
                    .then(translations => {
                        if (translations) {
                            updatePageText(translations);
                            
                            // 保存默认语言设置
                            localStorage.setItem('gameRealmLanguage', 'zh-CN');
                            
                            // 触发事件
                            document.dispatchEvent(new CustomEvent('languageChanged', { detail: translations }));
                        }
                    })
                    .catch(err => console.error('加载默认语言也失败:', err));
            }
        });
}

// 更新页面文本
function updatePageText(translations) {
    // 更新返回首页文本
    const backButton = document.querySelector('.back-button a');
    if (backButton) {
        backButton.innerHTML = `<i class="fas fa-arrow-left"></i> ${translations.game.backToHome || '返回首页'}`;
    }
    
    // 更新全平台支持文本
    const deviceText = document.querySelector('.game-device');
    if (deviceText) {
        deviceText.innerHTML = `<i class="fas fa-desktop"></i> ${translations.game.allPlatforms || '全平台支持'}`;
    }
    
    // 更新按钮文本
    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.innerHTML = `<i class="fas fa-play"></i> ${translations.game.playNow || '开始游戏'}`;
    }
    
    const favoriteButton = document.querySelector('.favorite-button');
    if (favoriteButton) {
        favoriteButton.innerHTML = `<i class="far fa-heart"></i> ${translations.game.favorite || '收藏'}`;
    }
    
    // 更新相关游戏标题
    const relatedTitle = document.querySelector('.section-title');
    if (relatedTitle) {
        relatedTitle.textContent = translations.game.relatedGames || '相关游戏推荐';
    }
    
    // 更新游戏分类标签
    const gameCategory = document.getElementById('gameCategory');
    if (gameCategory && translations.categories) {
        const categoryName = gameCategory.textContent.trim();
        // 查找对应的分类键
        const categoryKey = Object.keys(translations.categories).find(key => 
            translations.categories[key] === categoryName || 
            // 原始中文名称匹配
            (key === 'puzzle' && categoryName === '益智') ||
            (key === 'action' && categoryName === '动作') ||
            (key === 'sports' && categoryName === '体育') ||
            (key === 'arcade' && categoryName === '街机') ||
            (key === 'strategy' && categoryName === '策略') ||
            (key === 'racing' && categoryName === '赛车') ||
            (key === 'shooting' && categoryName === '射击') ||
            (key === 'adventure' && categoryName === '冒险') ||
            (key === 'other' && categoryName === '其他')
        );
        
        if (categoryKey) {
            gameCategory.textContent = translations.categories[categoryKey];
        }
    }
    
    // 更新相关游戏标签
    const gameTags = document.querySelectorAll('.related-games .game-tag');
    gameTags.forEach(tag => {
        if (translations.categories) {
            const categoryName = tag.textContent.trim();
            // 查找对应的分类键
            const categoryKey = Object.keys(translations.categories).find(key => 
                translations.categories[key] === categoryName || 
                // 原始中文名称匹配
                (key === 'puzzle' && categoryName === '益智') ||
                (key === 'action' && categoryName === '动作') ||
                (key === 'sports' && categoryName === '体育') ||
                (key === 'arcade' && categoryName === '街机') ||
                (key === 'strategy' && categoryName === '策略') ||
                (key === 'racing' && categoryName === '赛车') ||
                (key === 'shooting' && categoryName === '射击') ||
                (key === 'adventure' && categoryName === '冒险') ||
                (key === 'other' && categoryName === '其他')
            );
            
            if (categoryKey) {
                tag.textContent = translations.categories[categoryKey];
            }
        }
    });
    
    // 更新游戏标题和描述（如果有游戏翻译）
    if (translations.gameTranslations && translations.gameTranslations.titles) {
        // 获取当前游戏ID
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');
        
        if (gameId) {
            // 更新游戏标题
            const gameTitle = document.getElementById('gameTitle');
            if (gameTitle && translations.gameTranslations.titles[gameId]) {
                gameTitle.textContent = translations.gameTranslations.titles[gameId];
                
                // 同时更新页面标题
                if (translations.gameTranslations.titles[gameId]) {
                    document.title = `${translations.gameTranslations.titles[gameId]} - GameRealm`;
                }
                
                // 更新iframe标题
                const iframeTitle = document.getElementById('iframeGameTitle');
                if (iframeTitle) {
                    iframeTitle.textContent = translations.gameTranslations.titles[gameId];
                }
            }
            
            // 更新游戏描述
            const gameDescription = document.getElementById('gameDescription');
            if (gameDescription && translations.gameTranslations.descriptions && translations.gameTranslations.descriptions[gameId]) {
                gameDescription.textContent = translations.gameTranslations.descriptions[gameId];
            }
        }
        
        // 更新相关游戏标题
        const relatedTitles = document.querySelectorAll('.related-games .game-title');
        relatedTitles.forEach(titleElem => {
            const gameCard = titleElem.closest('.game-card');
            if (gameCard) {
                const relatedGameId = gameCard.dataset.id;
                if (relatedGameId && translations.gameTranslations.titles[relatedGameId]) {
                    titleElem.textContent = translations.gameTranslations.titles[relatedGameId];
                }
            }
        });
    }
    
    // 添加关闭游戏iframe的翻译
    const closeIframe = document.getElementById('closeIframe');
    if (closeIframe) {
        closeIframe.setAttribute('aria-label', translations.game.closeGame || '关闭游戏');
    }
    
    // 监听主页面触发的语言变更事件
    document.addEventListener('languageChanged', function(e) {
        // 如果需要，可以在这里进行进一步的特定页面元素翻译
    });
} 