# Resume Generator - AI 驱动的简历生成器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Windows Build](https://img.shields.io/badge/Windows-Executable-blue?logo=windows)](https://github.com/CNMJH/resume-generator/releases)

🚀 一个强大的 Node.js 简历生成器，支持交互式创建、多种模板、自动优化和 PDF 导出。

**[下载 Windows 可执行版 →](https://github.com/CNMJH/resume-generator/releases)**

---

## 📦 快速下载

| 平台 | 下载 | 说明 |
|------|------|------|
| Windows | [下载 EXE](https://github.com/CNMJH/resume-generator/releases) | 无需安装 Node.js，双击运行 |
| macOS | `npm install` | 需要 Node.js 环境 |
| Linux | `npm install` | 需要 Node.js 环境 |

---

## ✨ 特性

- 🎨 **多种精美模板** - 现代风格、经典风格等
- 🤖 **AI 智能优化** - 自动计算工作年限、技能分类、生成摘要
- 💬 **交互式创建** - 命令行向导，无需编写代码
- 📄 **PDF 导出** - 高质量 PDF 输出，支持打印
- 📝 **Markdown 支持** - 同时生成 Markdown 版本
- 🌐 **中英文支持** - 完美支持中文简历
- 🎯 **技能自动分类** - 前端、后端、数据库、DevOps、AI 自动归类
- 🖥️ **Windows 可执行文件** - 无需 Node.js，双击运行

---

## 🚀 快速开始

### Windows 用户（推荐）

1. **[下载最新版本](https://github.com/CNMJH/resume-generator/releases)**
2. 解压到任意文件夹
3. 双击 `启动.bat` 运行
4. 按提示输入信息，自动生成 PDF

### macOS / Linux / 开发者

```bash
# 克隆仓库
git clone https://github.com/CNMJH/resume-generator.git
cd resume-generator

# 安装依赖
npm install

# 运行
npm start
```

---

## 📖 使用指南

### 交互式创建

```bash
# Windows
resume-generator-win.exe

# macOS/Linux
npm start
```

按提示输入：
- 姓名、职位、联系方式
- 选择技能
- 添加工作经历
- 自动生成 PDF 简历

### 从 JSON 文件生成

```bash
# 使用示例数据
resume-generator-win.exe build examples/sample.json

# 使用自定义数据
resume-generator-win.exe build my-resume.json
```

### 编程式使用

```javascript
const ResumeBuilder = require('./src/index');

const builder = new ResumeBuilder({
  template: 'modern'
});

const data = {
  name: '张三',
  title: '软件工程师',
  email: 'zhangsan@example.com',
  skills: ['JavaScript', 'React', 'Node.js'],
  experience: [...]
};

const result = await builder.build(data);
console.log('PDF:', result.pdfPath);
```

---

## 📋 数据格式

```json
{
  "name": "姓名",
  "title": "职位",
  "email": "邮箱",
  "phone": "电话",
  "location": "所在地",
  "website": "个人网站",
  "summary": "个人简介（可选，自动生成）",
  "skills": ["技能1", "技能2"],
  "experience": [{
    "company": "公司名",
    "position": "职位",
    "startDate": "2020-01",
    "endDate": "2023-01",
    "description": "工作描述",
    "achievements": ["成就1", "成就2"]
  }],
  "education": [{
    "school": "学校",
    "degree": "学位",
    "startDate": "2015-09",
    "endDate": "2019-06"
  }],
  "projects": [{
    "name": "项目名",
    "description": "项目描述",
    "techStack": ["技术1", "技术2"]
  }]
}
```

---

## 🎨 可用模板

| 模板 | 描述 | 预览 |
|------|------|------|
| `modern` | 现代简洁风格，适合科技公司 | [预览](#) |
| `classic` | 经典商务风格，适合传统行业 | [预览](#) |
| `minimal` | 极简风格，突出重点 | [预览](#) |

查看所有模板：
```bash
resume-generator-win.exe templates
```

---

## 🔨 构建 Windows 可执行文件

### 自动构建（推荐）

```bash
# 安装依赖
npm install

# 构建 Windows 可执行文件
npm run build:exe
```

### 手动构建

```bash
# 安装 pkg
npm install -g pkg

# 构建
npm run build:win

# 复制资源文件
xcopy /E /I templates dist\templates
xcopy /E /I examples dist\examples
```

---

## 📁 项目结构

```
resume-generator/
├── src/
│   ├── index.js          # 主入口
│   ├── cli.js            # 命令行界面
│   ├── generator.js      # 数据生成和优化
│   ├── template.js       # 模板引擎
│   └── exporter.js       # PDF/Markdown 导出
├── templates/
│   └── modern.hbs        # Handlebars 模板
├── examples/
│   └── sample.json       # 示例数据
├── dist/                 # 构建输出（Windows EXE）
│   ├── resume-generator-win.exe
│   ├── templates/
│   └── examples/
├── package.json
├── README.md
└── README-WINDOWS.md     # Windows 使用指南
```

---

## 🛠️ 开发

```bash
# 开发模式
npm run dev

# 运行测试
npm test

# 构建
npm run build

# 构建所有平台
npm run build:all
```

---

## 🔧 配置

### 环境变量

```bash
# 输出目录
RESUME_OUTPUT_DIR=./output

# 默认模板
RESUME_DEFAULT_TEMPLATE=modern
```

### 自定义模板

1. 在 `templates/` 目录创建 `.hbs` 文件
2. 使用 Handlebars 语法
3. 通过 `--template` 参数使用

---

## 📝 依赖

- [Handlebars](https://handlebarsjs.com/) - 模板引擎
- [Puppeteer](https://pptr.dev/) - PDF 生成
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/) - 交互式命令行
- [Commander](https://github.com/tj/commander.js/) - CLI 框架
- [Chalk](https://github.com/chalk/chalk) - 终端样式
- [pkg](https://github.com/vercel/pkg) - 打包工具

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing`)
5. 创建 Pull Request

---

## 📄 许可证

[MIT](LICENSE) © CNMJH

---

## 🙏 致谢

- 灵感来源于 [jsonresume](https://jsonresume.org/)
- 模板设计参考现代简历趋势

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
