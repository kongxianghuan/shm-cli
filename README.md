# shm-cli
基于webpack的命令行工具

### 基本使用
```
npm i -g shm-cli

# dev
shm dev

# prod
shm build
```

### 目录结构
```
.
├── dist
│   ├── assets
│   │   ├── audio.83fef7ac.png
│   │   ├── index.71bbcc00.css
│   │   └── index.dad26f83.js
│   └── index.html
├── shm_config
│   └── devConfig.js
│   └── prodConfig.js
└── src
    ├── index.html
    ├── js
    │   └── index.js
    ├── img
    │   └── audio.png
    └── style
        └── index.scss
```

### 自定义配置
- shm_config/devConfig.js 开发环境自定义配置
- shm_config/prodConfig.js 生产环境自定义配置

> 配置按照webpack的配置文件规则编写

### 已有功能
- es6 编译
- react 编译
- sass 编译
- cssnext 编译