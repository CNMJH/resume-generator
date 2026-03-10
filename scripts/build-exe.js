/**
 * Windows 可执行文件打包脚本
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始打包 Windows 可执行文件...\n');

// 检查 pkg 是否安装
try {
  execSync('pkg --version', { stdio: 'ignore' });
  console.log('✅ pkg 已安装');
} catch {
  console.log('📦 正在安装 pkg...');
  execSync('npm install -g pkg', { stdio: 'inherit' });
}

// 确保输出目录存在
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('\n📦 打包 Windows x64 版本...');

try {
  // 打包 Windows 可执行文件
  execSync(
    `pkg . --targets node18-win-x64 --output dist/resume-generator-win.exe --compress GZip`,
    { 
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit' 
    }
  );
  
  console.log('\n✅ Windows 可执行文件打包成功！');
  console.log(`📁 输出路径: ${path.join(distDir, 'resume-generator-win.exe')}`);
  
  // 复制模板和示例到 dist
  console.log('\n📋 复制资源文件...');
  
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
  
  copyDir(path.join(__dirname, '..', 'templates'), path.join(distDir, 'templates'));
  copyDir(path.join(__dirname, '..', 'examples'), path.join(distDir, 'examples'));
  
  console.log('✅ 资源文件复制完成');
  
  // 创建启动脚本
  const batContent = `@echo off
chcp 65001 >nul
echo ==========================================
echo    简历生成器 - Resume Generator
echo ==========================================
echo.
echo 正在启动...
echo.
resume-generator-win.exe %*
pause`;
  
  fs.writeFileSync(path.join(distDir, '启动.bat'), batContent);
  
  console.log('\n🎉 打包完成！');
  console.log('\n使用说明:');
  console.log('  1. 进入 dist 文件夹');
  console.log('  2. 双击 "启动.bat" 运行');
  console.log('  3. 或直接在命令行运行: resume-generator-win.exe');
  
} catch (error) {
  console.error('\n❌ 打包失败:', error.message);
  process.exit(1);
}
