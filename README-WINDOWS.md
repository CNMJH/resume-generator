# 简历生成器 - Windows 使用指南

## 🚀 快速开始

### 方法一：直接运行（推荐）

1. **下载软件**
   - 从 [Releases](https://github.com/CNMJH/resume-generator/releases) 下载最新版本
   - 解压到任意文件夹

2. **双击运行**
   - 双击 `启动.bat` 文件
   - 或双击 `resume-generator-win.exe`

3. **按提示操作**
   - 输入个人信息
   - 选择技能
   - 添加工作经历
   - 自动生成 PDF 简历

### 方法二：命令行运行

```bash
# 打开命令提示符或 PowerShell
cd 简历生成器文件夹

# 运行程序
resume-generator-win.exe

# 或带参数运行
resume-generator-win.exe create
resume-generator-win.exe build examples/sample.json
```

## 📋 系统要求

- **操作系统**: Windows 10/11 (64位)
- **内存**: 至少 4GB RAM
- **磁盘空间**: 至少 500MB 可用空间
- **网络**: 首次运行需要下载 Chrome（用于 PDF 生成）

## 📁 文件说明

```
简历生成器/
├── resume-generator-win.exe    # 主程序
├── 启动.bat                    # 启动脚本（推荐）
├── templates/                  # 简历模板
│   └── modern.hbs
├── examples/                   # 示例数据
│   └── sample.json
└── output/                     # 输出目录（自动生成）
    └── 张三_简历.pdf
```

## 🎨 使用示例

### 交互式创建

```
🚀 欢迎使用简历生成器！

? 姓名: 张三
? 职位头衔: 高级软件工程师
? 邮箱: zhangsan@example.com
? 电话: 138-0000-0000
? 所在地: 北京
? 个人网站/GitHub: github.com/zhangsan
? 个人简介（可选）: 5年经验的软件工程师...
? 选择技能: [JavaScript, React, Node.js...]

⏳ 正在生成简历...

✅ 简历生成成功！
📄 PDF: output/张三_简历.pdf
```

### 从 JSON 文件生成

1. 创建 `my-resume.json` 文件（参考 examples/sample.json）
2. 运行命令：
   ```bash
   resume-generator-win.exe build my-resume.json
   ```

## 🔧 常见问题

### Q: 无法运行，提示缺少 DLL？
**A**: 需要安装 Visual C++ Redistributable
- 下载地址：https://aka.ms/vs/17/release/vc_redist.x64.exe

### Q: PDF 生成失败？
**A**: 
1. 首次运行需要联网下载 Chrome
2. 确保有稳定的网络连接
3. 检查磁盘空间是否充足

### Q: 中文显示乱码？
**A**: 
1. 使用 `启动.bat` 运行（已设置 UTF-8 编码）
2. 或在命令行中先运行 `chcp 65001`

### Q: 如何自定义模板？
**A**: 
1. 复制 `templates/modern.hbs`
2. 修改样式和内容
3. 使用 `--template` 参数指定

## 📝 数据格式示例

```json
{
  "name": "张三",
  "title": "高级软件工程师",
  "email": "zhangsan@example.com",
  "phone": "138-0000-0000",
  "location": "北京",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": [
    {
      "company": "科技有限公司",
      "position": "高级前端工程师",
      "startDate": "2021-03",
      "description": "负责前端架构设计"
    }
  ]
}
```

## 🆘 获取帮助

- GitHub Issues: https://github.com/CNMJH/resume-generator/issues
- 使用说明: `resume-generator-win.exe --help`

## ⚖️ 许可证

MIT License © 2026 CNMJH
