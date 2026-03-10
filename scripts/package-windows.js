/**
 * Windows 打包脚本 - 创建完整的 Windows 安装包
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 开始打包 Windows 版本...\n');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const windowsDir = path.join(distDir, 'windows');

// 创建目录结构
console.log('📁 创建目录结构...');
if (!fs.existsSync(windowsDir)) {
  fs.mkdirSync(windowsDir, { recursive: true });
}

// 复制主程序
console.log('📦 复制主程序...');
const exeSource = path.join(distDir, 'resume-generator.exe');
const exeDest = path.join(windowsDir, 'resume-generator.exe');

if (fs.existsSync(exeSource)) {
  fs.copyFileSync(exeSource, exeDest);
} else {
  console.error('❌ 未找到 resume-generator.exe，请先运行 npm run build:win');
  process.exit(1);
}

// 复制资源文件
console.log('📋 复制资源文件...');
const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

copyDir(path.join(rootDir, 'templates'), path.join(windowsDir, 'templates'));
copyDir(path.join(rootDir, 'examples'), path.join(windowsDir, 'examples'));

// 创建启动脚本
console.log('📝 创建启动脚本...');
const startBat = `@echo off
chcp 65001 >nul
title 简历生成器
echo.
echo ==========================================
echo    简历生成器 v1.0.0
echo ==========================================
echo.
echo 正在启动...
echo.
resume-generator.exe %*
echo.
echo 按任意键退出...
pause >nul`;

fs.writeFileSync(path.join(windowsDir, '启动.bat'), startBat);

// 创建 README
console.log('📖 创建 README...');
const readme = `# 简历生成器 - Windows 版

## 🚀 快速开始

### 方法一：双击运行（推荐）
1. 双击 \\"启动.bat\\"
2. 按提示输入信息
3. 自动生成 PDF 简历

### 方法二：命令行运行
\`\`\`cmd
resume-generator.exe
\`\`\`

## 📁 文件说明

- \\"启动.bat\\" - 启动脚本（推荐）
- resume-generator.exe - 主程序
- templates/ - 简历模板
- examples/ - 示例数据
- output/ - 输出目录（自动生成）

## 📋 系统要求

- Windows 10/11 (64位)
- 内存：4GB+
- 磁盘空间：500MB+

## 🆘 常见问题

### 无法运行？
1. 确保是 64 位 Windows
2. 安装 Visual C++ Redistributable
   https://aka.ms/vs/17/release/vc_redist.x64.exe

### 中文显示乱码？
使用 \\"启动.bat\\" 运行（已设置 UTF-8 编码）

## 📄 许可证

MIT License`;

fs.writeFileSync(path.join(windowsDir, 'README.txt'), readme);

// 创建 ZIP 压缩包
console.log('📦 创建 ZIP 压缩包...');
try {
  process.chdir(distDir);
  execSync('zip -r resume-generator-windows.zip windows/', { stdio: 'inherit' });
  console.log('\n✅ ZIP 压缩包创建成功！');
} catch (error) {
  console.log('⚠️ 无法创建 ZIP，请手动压缩 windows/ 文件夹');
}

console.log('\n🎉 Windows 打包完成！');
console.log('\n输出文件：');
console.log('  📦 dist/resume-generator.exe - 主程序');
console.log('  📁 dist/windows/ - 完整 Windows 文件夹');
console.log('  🗜️  dist/resume-generator-windows.zip - 压缩包');
console.log('\n使用方法：');
console.log('  1. 解压 resume-generator-windows.zip');
console.log('  2. 双击 \\"启动.bat\\"');
console.log('  3. 按提示输入信息');
