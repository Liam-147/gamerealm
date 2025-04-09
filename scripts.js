// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
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
    
    // 游戏卡片点击事件
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取游戏标题
            const gameTitle = this.querySelector('.game-title').textContent;
            // 将游戏标题转为URL友好的格式
            const gameUrl = gameTitle.toLowerCase().replace(/\s+/g, '-');
            // 跳转到游戏详情页
            window.location.href = `game.html?title=${encodeURIComponent(gameUrl)}`;
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            // 简单的前端搜索实现
            const allGameCards = document.querySelectorAll('.game-card');
            let foundGames = false;
            
            allGameCards.forEach(card => {
                const gameTitle = card.querySelector('.game-title').textContent.toLowerCase();
                const gameTag = card.querySelector('.game-tag').textContent.toLowerCase();
                
                if (gameTitle.includes(searchTerm) || gameTag.includes(searchTerm)) {
                    card.style.display = 'block';
                    foundGames = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 显示搜索结果信息
            const categories = document.querySelectorAll('.category');
            categories.forEach(category => {
                const visibleGames = category.querySelectorAll('.game-card[style="display: block"]');
                if (visibleGames.length === 0) {
                    category.style.display = 'none';
                } else {
                    category.style.display = 'block';
                }
            });
            
            if (!foundGames) {
                alert('没有找到符合条件的游戏');
            }
        } else {
            // 如果搜索框为空，恢复显示所有游戏和分类
            const allGameCards = document.querySelectorAll('.game-card');
            const allCategories = document.querySelectorAll('.category');
            
            allGameCards.forEach(card => {
                card.style.display = 'block';
            });
            
            allCategories.forEach(category => {
                category.style.display = 'block';
            });
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
}); 