# 简历生成器 - GUI 图形界面版

基于 Electron 的跨平台桌面应用。

## 🚀 快速开始

### Windows 用户

1. 从 [Releases](https://github.com/CNMJH/resume-generator/releases) 下载 `ResumeGenerator-Setup.exe`
2. 双击安装
3. 从开始菜单或桌面快捷方式启动

### 开发者

```bash
cd gui

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建 Windows 版
npm run build:win

# 构建 macOS 版
npm run build:mac

# 构建 Linux 版
npm run build:linux
```

## ✨ 功能特点

- 🎨 **可视化编辑** - 图形界面，所见即所得
- 🤖 **智能提示** - 自动计算工作年限、技能分类
- 💾 **数据保存** - 支持 JSON 导入/导出
- 📄 **PDF 导出** - 一键生成专业 PDF
- 🎨 **多模板** - 支持多种简历模板
- 🌐 **跨平台** - Windows、macOS、Linux

## 📁 项目结构

```
gui/
├── src/
│   ├── main.js       # Electron 主进程
│   ├── index.html    # 主界面
│   ├── renderer.js   # 渲染进程逻辑
│   └── style.css     # 样式
├── assets/           # 图标等资源
├── package.json      # 配置
└── README.md         # 说明
```

## 🔨 构建配置

### Windows
- NSIS 安装包 (.exe)
- 便携版 (.exe)

### macOS
- DMG 安装包 (.dmg)

### Linux
- AppImage
- DEB 包

## 📝 依赖

- Electron 28+
- electron-builder
- electron-updater

## 📄 许可证

MIT
