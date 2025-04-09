# GameRealm 游戏平台

GameRealm是一个在线HTML5游戏平台，提供多种类型的游戏，包括解谜、动作、体育、街机、策略等游戏类型。用户可以在平台上浏览、搜索游戏，并直接在浏览器中玩游戏，无需下载安装。

## 功能特点

- 响应式设计，适配PC和移动设备
- 游戏分类导航
- 游戏搜索功能
- 游戏详情页面
- 内嵌iframe游戏体验
- 相关游戏推荐

## 网站结构

- 首页：展示所有游戏分类和游戏列表
- 游戏详情页：显示游戏信息和开始游戏按钮
- 游戏嵌入页：提供游戏的实际游玩体验

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- 响应式设计
- JSON数据存储

## 如何开始

1. 克隆仓库
```
git clone https://github.com/yourusername/gamerealm.git
```

2. 进入项目目录
```
cd gamerealm
```

3. 使用HTTP服务器运行项目（例如使用VSCode的Live Server插件或Python的HTTP服务器）
```
python -m http.server
```

4. 在浏览器中访问
```
http://localhost:8000
```

## 项目文件结构

```
/
|-- index.html           # 首页
|-- game.html            # 游戏详情页
|-- styles.css           # 主样式表
|-- game-detail.css      # 游戏详情页样式表
|-- main.js              # 首页脚本
|-- game-detail.js       # 游戏详情页脚本
|-- games.json           # 游戏数据
|-- assets/              # 静态资源目录
    |-- logo.png         # 网站logo
    |-- games/           # 游戏图片目录
        |-- game1.jpg
        |-- game2.jpg
        |-- ...
|-- README.md            # 项目说明
```

## 自定义游戏

如要添加新游戏，请在`games.json`文件中按照以下格式添加游戏信息：

```json
{
  "id": "game-id",
  "title": "游戏名称",
  "category": "游戏分类",
  "tags": ["标签1", "标签2"],
  "description": "游戏描述...",
  "image": "assets/games/game-image.jpg",
  "iframeUrl": "https://example.com/game-url",
  "featured": false
}
```

## 后续开发计划

- 多语言支持
- 用户账户系统
- 游戏收藏功能
- 游戏评分和评论系统
- 游戏排行榜

## 部署信息

该项目计划部署在Cloudflare Pages上，通过域名`gamerealm.space`访问。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/) 