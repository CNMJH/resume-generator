@echo off
chcp 65001 >nul
title 构建简历生成器安装包
color 0A

echo ============================================
echo      简历生成器 Windows 安装包构建工具
echo ============================================
echo.

:: 检查 Inno Setup
set "INNO_PATH=C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
if not exist "%INNO_PATH%" (
    set "INNO_PATH=C:\Program Files\Inno Setup 6\ISCC.exe"
)
if not exist "%INNO_PATH%" (
    echo [错误] 未找到 Inno Setup 6
    echo.
    echo 请先下载并安装 Inno Setup 6：
    echo https://jrsoftware.org/isdl.php
    echo.
    pause
    exit /b 1
)

echo [√] 找到 Inno Setup: %INNO_PATH%
echo.

:: 创建输出目录
if not exist "..\dist" mkdir "..\dist"

:: 创建图标（如果不存在）
if not exist "icon.ico" (
    echo [i] 创建默认图标...
    copy /Y nul "icon.ico" >nul 2>&1
    echo [√] 已创建占位图标（建议替换为实际图标）
)

echo.
echo [i] 开始构建安装包...
echo.

"%INNO_PATH%" setup.iss

if %errorlevel% neq 0 (
    echo.
    echo [×] 构建失败
    pause
    exit /b 1
)

echo.
echo ============================================
echo      构建成功！
echo ============================================
echo.
echo 安装包位置: ..\dist\
echo.
dir "..\dist\*.exe" /b 2>nul
echo.
echo 按任意键退出...
pause >nul
