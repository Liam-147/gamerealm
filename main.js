// 主页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言设置
    setupLanguageSelector();
    
    // 应用当前语言设置
    applyCurrentLanguage();

    // 侧边栏切换功能
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
    
    // 移动端自动折叠侧边栏
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
    }
    
    // 初始检查屏幕大小
    checkScreenSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkScreenSize);
    
    // 从JSON文件加载游戏数据
    fetch('games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载游戏数据');
            }
            return response.json();
        })
        .then(data => {
            // 加载分类和游戏
            loadCategories(data.categories);
            loadGames(data.games, data.categories);
            setupGameCardEvents();
            setupSearchFunction(data.games);
            
            // 检查URL中是否有锚点，如果有则滚动到相应分类
            if (window.location.hash) {
                const categoryId = window.location.hash.substring(1);
                const categoryElement = document.getElementById(categoryId);
                if (categoryElement) {
                    setTimeout(() => {
                        categoryElement.scrollIntoView({behavior: 'smooth'});
                    }, 500);
                }
            }
            
            // 设置分类导航点击事件
            setupCategoryNavEvents();
            
            // 再次应用当前语言以确保新加载的内容也被翻译
            applyCurrentLanguage();
        })
        .catch(error => {
            console.error('加载游戏数据时出错:', error);
            const gameCategories = document.querySelector('.game-categories');
            gameCategories.innerHTML = '<div class="error-message">抱歉，无法加载游戏数据。请稍后再试。</div>';
        });
});

// 加载分类到侧边栏
function loadCategories(categories) {
    const sidebarNav = document.querySelector('.sidebar-nav');
    const categoryHeader = document.querySelector('.category-header');
    
    // 清除现有分类（保留首页按钮和分类标题）
    const existingLinks = sidebarNav.querySelectorAll('.nav-item:not(:first-child)');
    existingLinks.forEach(link => link.remove());
    
    // 添加分类到侧边栏
    categories.forEach(category => {
        const categoryLink = document.createElement('a');
        categoryLink.href = `#${category.id}`;
        categoryLink.className = 'nav-item';
        categoryLink.setAttribute('data-category', category.id);
        categoryLink.innerHTML = `
            <i class="fas fa-${category.icon}"></i>
            <span class="nav-text">${category.name}</span>
        `;
        sidebarNav.appendChild(categoryLink);
    });
}

// 设置分类导航点击事件
function setupCategoryNavEvents() {
    const categoryLinks = document.querySelectorAll('.nav-item[data-category]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 获取目标分类ID
            const categoryId = this.getAttribute('data-category');
            const categoryElement = document.getElementById(categoryId);
            
            if (categoryElement) {
                e.preventDefault();
                // 滚动到分类位置
                categoryElement.scrollIntoView({behavior: 'smooth'});
                // 更新URL
                history.pushState(null, null, `#${categoryId}`);
                
                // 移除所有活动状态
                categoryLinks.forEach(navItem => navItem.classList.remove('active'));
                // 设置当前选中的分类为活动状态
                this.classList.add('active');
            }
        });
    });
}

// 加载游戏到主页面
function loadGames(games, categories) {
    const gameCategories = document.querySelector('.game-categories');
    
    // 清除现有内容
    gameCategories.innerHTML = '';
    
    // 首先添加推荐游戏部分
    const featuredGames = games.filter(game => game.featured);
    if (featuredGames.length > 0) {
        const featuredSection = createCategorySection('featured', '推荐游戏');
        const featuredGrid = featuredSection.querySelector('.games-grid');
        
        featuredGames.forEach(game => {
            const gameCard = createGameCard(game);
            featuredGrid.appendChild(gameCard);
        });
        
        gameCategories.appendChild(featuredSection);
    }
    
    // 按分类对象的顺序添加游戏分类
    categories.forEach(category => {
        // 获取该分类下的所有游戏
        const categoryGames = games.filter(game => game.categoryId === category.id);
        
        if (categoryGames.length > 0) {
            const categorySection = createCategorySection(category.id, category.name);
            const categoryGrid = categorySection.querySelector('.games-grid');
            
            categoryGames.forEach(game => {
                const gameCard = createGameCard(game);
                categoryGrid.appendChild(gameCard);
            });
            
            gameCategories.appendChild(categorySection);
        }
    });

    // 应用当前语言
    applyCurrentLanguage();
}

// 创建分类部分
function createCategorySection(id, title) {
    const section = document.createElement('section');
    section.className = 'category';
    section.id = id;
    
    section.innerHTML = `
        <h2 class="category-title">${title}</h2>
        <div class="games-grid"></div>
    `;
    
    return section;
}

// 创建游戏卡片
function createGameCard(game) {
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
    
    return gameCard;
}

// 设置游戏卡片点击事件
function setupGameCardEvents() {
    document.addEventListener('click', function(e) {
        const gameCard = e.target.closest('.game-card');
        if (gameCard) {
            const gameId = gameCard.dataset.id;
            if (gameId) {
                window.location.href = `game.html?id=${encodeURIComponent(gameId)}`;
            }
        }
    });
}

// 设置搜索功能
function setupSearchFunction(allGames) {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            // 根据搜索词过滤游戏
            const filteredGames = allGames.filter(game => {
                const titleMatch = game.title.toLowerCase().includes(searchTerm);
                const categoryMatch = game.category.toLowerCase().includes(searchTerm);
                const tagsMatch = game.tags ? game.tags.some(tag => 
                    tag.toLowerCase().includes(searchTerm)
                ) : false;
                
                return titleMatch || categoryMatch || tagsMatch;
            });
            
            // 显示搜索结果
            const gameCategories = document.querySelector('.game-categories');
            gameCategories.innerHTML = '';
            
            if (filteredGames.length > 0) {
                const searchResultsSection = createCategorySection('search-results', `搜索结果: "${searchTerm}"`);
                const resultsGrid = searchResultsSection.querySelector('.games-grid');
                
                filteredGames.forEach(game => {
                    const gameCard = createGameCard(game);
                    resultsGrid.appendChild(gameCard);
                });
                
                gameCategories.appendChild(searchResultsSection);
            } else {
                gameCategories.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>没有找到与 "${searchTerm}" 相关的游戏</p>
                        <button class="reset-search">返回全部游戏</button>
                    </div>
                `;
                
                // 添加"返回全部游戏"按钮的点击事件
                const resetButton = gameCategories.querySelector('.reset-search');
                if (resetButton) {
                    resetButton.addEventListener('click', function() {
                        searchInput.value = '';
                        loadGames(allGames);
                        setupGameCardEvents();
                    });
                }
            }

            // 应用当前语言
            applyCurrentLanguage();
        } else {
            // 如果搜索词为空，显示所有游戏
            loadGames(allGames);
            setupGameCardEvents();
        }
    }
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', performSearch);
    
    // 搜索框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
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
                
                // 保存语言设置，确保其他页面也能获取
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
                            
                            // 保存语言设置为默认中文
                            localStorage.setItem('gameRealmLanguage', 'zh-CN');
                            
                            // 触发自定义事件
                            document.dispatchEvent(new CustomEvent('languageChanged', { detail: translations }));
                        }
                    })
                    .catch(err => console.error('加载默认语言也失败:', err));
            }
        });
}

// 更新页面文本
function updatePageText(translations) {
    // 更新导航项文本
    const homeNavText = document.querySelector('.nav-item[href="index.html"] .nav-text');
    if (homeNavText) {
        homeNavText.textContent = translations.nav.home || '首页';
    }
    
    // 更新所有分类导航项
    const categoryNavItems = document.querySelectorAll('.nav-item[data-category]');
    categoryNavItems.forEach(navItem => {
        const categoryId = navItem.getAttribute('data-category');
        const navText = navItem.querySelector('.nav-text');
        if (navText && translations.categories && translations.categories[categoryId]) {
            navText.textContent = translations.categories[categoryId];
        }
    });
    
    // 更新分类头部
    const categoryHeader = document.querySelector('.category-header');
    if (categoryHeader) {
        categoryHeader.textContent = translations.nav.categories || '游戏分类';
    }
    
    // 更新搜索框占位符
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.placeholder = translations.search.placeholder || '搜索游戏...';
    }
    
    // 更新加载文本
    const loadingText = document.querySelector('.loading p');
    if (loadingText) {
        loadingText.textContent = translations.game.loading || '正在加载游戏数据...';
    }
    
    // 更新分类标题
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        const categoryId = category.id;
        const titleElement = category.querySelector('.category-title');
        if (titleElement && translations.categories && translations.categories[categoryId]) {
            titleElement.textContent = translations.categories[categoryId];
        }
    });
    
    // 更新游戏标签
    const gameTags = document.querySelectorAll('.game-tag');
    gameTags.forEach(tag => {
        const categoryName = tag.textContent.trim();
        // 查找对应的分类键
        if (translations.categories) {
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
        // 更新游戏卡片标题
        const gameTitles = document.querySelectorAll('.game-title');
        gameTitles.forEach(titleElem => {
            const gameCard = titleElem.closest('.game-card');
            if (gameCard) {
                const gameId = gameCard.dataset.id;
                if (gameId && translations.gameTranslations.titles[gameId]) {
                    titleElem.textContent = translations.gameTranslations.titles[gameId];
                }
            }
        });
    }
    
    // 更新搜索结果标题
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        const title = searchResults.querySelector('.category-title');
        if (title) {
            const searchText = title.textContent.split(':')[0].trim();
            const searchTerm = title.textContent.split(':')[1]?.trim().replace(/"/g, '') || '';
            title.textContent = `${translations.search.results || '搜索结果'}: "${searchTerm}"`;
        }
    }
    
    // 更新无结果文本
    const noResults = document.querySelector('.no-results p');
    if (noResults) {
        const searchTerm = noResults.textContent.split('找到与 "')[1]?.split('" 相关的游戏')[0] || '';
        noResults.textContent = `${translations.search.noResults || '没有找到相关游戏'} "${searchTerm}"`;
    }
    
    // 更新重置搜索按钮
    const resetButton = document.querySelector('.reset-search');
    if (resetButton) {
        resetButton.textContent = translations.search.backToAll || '返回全部游戏';
    }
    
    // 触发自定义事件，通知页面语言已更新
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: translations }));
} 