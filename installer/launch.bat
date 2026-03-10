@echo off
chcp 65001 >nul
title 简历生成器
color 0B

cd /d "%~dp0"

:: 检查 Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Node.js 未安装！
    echo 请先运行 "检查环境.bat" 或访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)

:: 检查依赖
if not exist "node_modules" (
    echo [提示] 首次运行，正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

cls
echo ============================================
echo      欢迎使用简历生成器 v1.0.0
echo ============================================
echo.
echo  请选择操作：
echo.
echo  [1] 创建新简历（交互式向导）
echo  [2] 使用示例数据生成
echo  [3] 查看可用模板
echo  [4] 打开输出文件夹
echo  [5] 退出
echo.
echo ============================================
echo.

set /p choice="请输入选项 (1-5): "

if "%choice%"=="1" goto create
if "%choice%"=="2" goto sample
if "%choice%"=="3" goto templates
if "%choice%"=="4" goto open_output
if "%choice%"=="5" goto exit
goto invalid

:create
cls
echo 正在启动简历创建向导...
echo.
node src/cli.js create
goto end

:sample
cls
echo 正在使用示例数据生成简历...
echo.
if not exist "examples" mkdir examples
if not exist "examples\sample.json" (
    echo {> "examples\sample.json"
    echo   "name": "张三",>> "examples\sample.json"
    echo   "title": "高级软件工程师",>> "examples\sample.json"
    echo   "email": "zhangsan@example.com",>> "examples\sample.json"
    echo   "phone": "13800138000",>> "examples\sample.json"
    echo   "location": "北京",>> "examples\sample.json"
    echo   "summary": "5年软件开发经验，专注于Web应用开发",>> "examples\sample.json"
    echo   "skills": ["JavaScript", "React", "Node.js", "Python"],>> "examples\sample.json"
    echo   "experience": [>> "examples\sample.json"
    echo     {>> "examples\sample.json"
    echo       "company": "科技有限公司",>> "examples\sample.json"
    echo       "position": "高级前端工程师",>> "examples\sample.json"
    echo       "startDate": "2020-01",>> "examples\sample.json"
    echo       "endDate": "至今",>> "examples\sample.json"
    echo       "description": "负责公司核心产品的前端开发",>> "examples\sample.json"
    echo       "achievements": ["优化页面加载速度提升50%%", "主导重构前端架构"]>> "examples\sample.json"
    echo     }>> "examples\sample.json"
    echo   ],>> "examples\sample.json"
    echo   "education": [>> "examples\sample.json"
    echo     {>> "examples\sample.json"
    echo       "school": "北京大学",>> "examples\sample.json"
    echo       "degree": "计算机科学学士",>> "examples\sample.json"
    echo       "startDate": "2015-09",>> "examples\sample.json"
    echo       "endDate": "2019-06">> "examples\sample.json"
    echo     }>> "examples\sample.json"
    echo   ]>> "examples\sample.json"
    echo }>> "examples\sample.json"
)
npm run build examples/sample.json
goto end

:templates
cls
echo 可用模板列表：
echo.
node src/cli.js templates 2>nul || (
    echo [现代风格] modern - 适合科技公司
    echo [经典风格] classic - 适合传统行业
    echo [极简风格] minimal - 突出重点
)
goto end

:open_output
cls
if exist "output" (
    echo 正在打开输出文件夹...
    start "" "output"
) else (
    echo 输出文件夹不存在，正在创建...
    mkdir output
    start "" "output"
)
goto end

:invalid
echo.
echo [错误] 无效选项，请重新运行
timeout /t 2 >nul
goto end

:exit
echo.
echo 感谢使用，再见！
timeout /t 1 >nul

:end
echo.
echo 按任意键退出...
pause >nul
