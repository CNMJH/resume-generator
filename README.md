# 简历生成器 - AI 驱动的简历生成器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)

🚀 一个简单易用的简历生成器，支持交互式创建、多种模板、自动优化和 PDF 导出。

---

## 📥 下载安装

### Windows 用户（推荐）

1. **下载安装包**
   - 访问 [Releases 页面](../../releases)
   - 下载最新版 `ResumeGenerator-Setup-v1.x.x.exe`

2. **安装**
   - 双击 `.exe` 文件运行安装向导
   - 按提示完成安装
   - 首次使用会自动检查 Node.js 环境

3. **启动使用**
   - 桌面快捷方式，或
   - 开始菜单 → 简历生成器

### Mac/Linux 用户

```bash
# 克隆仓库
git clone https://github.com/CNMJH/resume-generator.git
cd resume-generator

# 安装依赖
npm install

# 启动
npm start
```

---

## 🚀 使用指南

### Windows 图形界面

启动后选择操作：

| 选项 | 功能 |
|------|------|
| **1** | 创建新简历（交互式向导） |
| **2** | 使用示例数据快速预览 |
| **3** | 查看可用模板 |
| **4** | 打开输出文件夹 |
| **5** | 退出 |

### 命令行方式

```bash
# 交互式创建
npm start

# 使用 JSON 文件生成
npm run build my-resume.json

# 查看模板列表
node src/cli.js templates
```

---

## 📋 简历数据格式

创建 `my-resume.json` 文件：

```json
{
  "name": "张三",
  "title": "高级软件工程师",
  "email": "zhangsan@example.com",
  "phone": "13800138000",
  "location": "北京",
  "summary": "5年软件开发经验",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": [{
    "company": "科技有限公司",
    "position": "高级前端工程师",
    "startDate": "2020-01",
    "endDate": "至今",
    "description": "负责核心产品前端开发",
    "achievements": ["优化性能提升50%"]
  }],
  "education": [{
    "school": "北京大学",
    "degree": "计算机科学学士",
    "startDate": "2015-09",
    "endDate": "2019-06"
  }]
}
```

---

## 🎨 模板选择

| 模板 | 风格 | 适用场景 |
|------|------|---------|
| `modern` | 现代简洁 | 科技公司、互联网 |
| `classic` | 经典商务 | 传统行业、国企 |
| `minimal` | 极简风格 | 设计、创意岗位 |

---

## 📁 输出文件

生成的简历保存在 `output` 文件夹：

- `resume.pdf` - PDF 格式（可直接打印/投递）
- `resume.md` - Markdown 格式（可编辑）

---

## 🔧 常见问题

**Q: 安装时提示需要 Node.js？**
> 访问 https://nodejs.org/ 下载安装 LTS 版本，安装时勾选 "Add to PATH"

**Q: 生成的 PDF 在哪里？**
> 在安装目录的 `output` 文件夹，或通过菜单选项 4 直接打开

**Q: 如何修改已生成的简历？**
> 编辑 JSON 文件后重新运行生成命令

**Q: 支持自定义模板吗？**
> 支持，在 `templates/` 目录创建 `.hbs` 文件，使用 Handlebars 语法

---

## 🛠️ 开发者

```bash
# 开发模式
npm run dev

# 运行测试
npm test

# 构建 Windows 安装包
cd installer
build-installer.bat
```

---

## 📄 许可证

[MIT](LICENSE) © CNMJH

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
