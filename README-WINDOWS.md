# 简历生成器 - Windows 使用指南

## 🚀 快速开始

### 方法一：下载即用（推荐）

1. 从 [Releases](https://github.com/CNMJH/resume-generator/releases) 下载最新版本
2. 解压到任意文件夹
3. 双击 `启动.bat` 运行
4. 按提示输入信息，自动生成 PDF

### 方法二：安装版（GUI）

1. 下载 `简历生成器-Setup.exe`
2. 双击安装
3. 从开始菜单或桌面快捷方式启动

## 📁 文件说明

```
简历生成器/
├── 启动.bat              # 启动脚本（推荐）
├── resume-generator.exe  # CLI 主程序
├── templates/            # 简历模板
├── examples/             # 示例数据
├── output/               # 输出目录（自动生成）
└── README.txt            # 说明文档
```

## 📋 系统要求

- **操作系统**: Windows 10/11 (64位)
- **内存**: 4GB+
- **磁盘空间**: 500MB+
- **网络**: 首次运行需要下载 Chrome（用于 PDF 生成）

## 🎨 使用方式

### CLI 命令行版

```bash
# 交互式创建
resume-generator.exe

# 从 JSON 文件生成
resume-generator.exe build my-resume.json
```

### GUI 图形界面版

双击桌面快捷方式或从开始菜单启动。

## 🆘 常见问题

### Q: 无法运行，提示缺少 DLL？
**A**: 安装 Visual C++ Redistributable
- 下载：https://aka.ms/vs/17/release/vc_redist.x64.exe

### Q: PDF 生成失败？
**A**: 
1. 首次运行需要联网下载 Chrome
2. 确保有稳定的网络连接
3. 检查磁盘空间是否充足

### Q: 中文显示乱码？
**A**: 使用 `启动.bat` 运行（已设置 UTF-8 编码）

### Q: 如何自定义模板？
**A**: 
1. 复制 `templates/modern.hbs`
2. 修改样式和内容
3. 使用 `--template` 参数指定

## 📄 许可证

MIT License
