@echo off
chcp 65001 >nul
title 简历生成器安装程序
echo ==========================================
echo    简历生成器 - 安装程序
echo ==========================================
echo.

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到 Node.js
    echo.
    echo 正在下载 Node.js...
    echo 请访问 https://nodejs.org/ 下载并安装 LTS 版本
    echo.
    start https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装

REM 安装依赖
echo.
echo 📦 正在安装依赖...
call npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo ✅ 依赖安装完成

REM 安装 pkg
echo.
echo 📦 正在安装打包工具...
call npm install -g pkg
if errorlevel 1 (
    echo ❌ 打包工具安装失败
    pause
    exit /b 1
)

echo ✅ 打包工具安装完成

REM 构建可执行文件
echo.
echo 🔨 正在构建 Windows 可执行文件...
call npm run build:win
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo ✅ 构建完成！

REM 复制资源文件
echo.
echo 📋 正在复制资源文件...
if not exist dist\templates mkdir dist\templates
if not exist dist\examples mkdir dist\examples
xcopy /E /Y templates\* dist\templates\
xcopy /E /Y examples\* dist\examples\

echo ✅ 资源文件复制完成

REM 创建启动脚本
echo.
echo 📝 正在创建启动脚本...
echo @echo off > dist\启动.bat
echo chcp 65001 ^>nul >> dist\启动.bat
echo echo ========================================== >> dist\启动.bat
echo echo    简历生成器 - Resume Generator >> dist\启动.bat
echo echo ========================================== >> dist\启动.bat
echo echo. >> dist\启动.bat
echo resume-generator-win.exe %%* >> dist\启动.bat
echo pause >> dist\启动.bat

echo ✅ 启动脚本创建完成

REM 完成
echo.
echo ==========================================
echo    🎉 安装完成！
echo ==========================================
echo.
echo 使用说明：
echo   1. 进入 dist 文件夹
echo   2. 双击 "启动.bat" 运行
echo   3. 或运行 resume-generator-win.exe
echo.
echo 按任意键退出...
pause >nul
