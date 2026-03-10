@echo off
chcp 65001 >nul
title 简历生成器 - 环境检查
color 0A

echo ============================================
echo      简历生成器 - 环境检查
echo ============================================
echo.

:: 检查 Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [×] Node.js 未安装
    echo.
    echo 正在打开 Node.js 下载页面...
    echo 请下载并安装 LTS 版本，安装时勾选 "Add to PATH"
    start https://nodejs.org/zh-cn/download/
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%a in ('node --version') do set NODE_VERSION=%%a
    echo [√] Node.js 已安装: %NODE_VERSION%
)

:: 检查 npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [×] npm 未安装
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%a in ('npm --version') do set NPM_VERSION=%%a
    echo [√] npm 已安装: %NPM_VERSION%
)

echo.
echo ============================================
echo      环境检查通过！
echo ============================================
echo.

:: 检查是否需要安装依赖
if not exist "%~dp0node_modules" (
    echo [i] 首次运行，正在安装依赖...
    echo 这可能需要几分钟，请耐心等待...
    echo.
    cd /d "%~dp0"
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo [×] 依赖安装失败
        pause
        exit /b 1
    )
    echo.
    echo [√] 依赖安装完成！
) else (
    echo [√] 依赖已安装
)

echo.
pause
