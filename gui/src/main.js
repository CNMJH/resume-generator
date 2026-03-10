/**
 * Electron 主进程
 */

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// 引入核心模块
const ResumeBuilder = require('../../src/index');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    titleBarStyle: 'default',
    show: false
  });

  // 加载页面
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // 开发模式打开开发者工具
    if (process.argv.includes('--dev')) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 应用就绪
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC 通信处理

// 生成简历
ipcMain.handle('generate-resume', async (event, data) => {
  try {
    const builder = new ResumeBuilder({
      template: data.template || 'modern'
    });
    
    const result = await builder.build(data);
    
    return {
      success: true,
      pdfPath: result.pdfPath,
      data: result.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// 选择输出目录
ipcMain.handle('select-output-dir', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: '选择简历输出目录'
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// 打开文件
ipcMain.handle('open-file', async (event, filePath) => {
  await shell.openPath(filePath);
});

// 打开文件夹
ipcMain.handle('open-folder', async (event, folderPath) => {
  await shell.openPath(folderPath);
});

// 保存 JSON
ipcMain.handle('save-json', async (event, data, defaultPath) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultPath || 'my-resume.json',
    filters: [
      { name: 'JSON', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    title: '保存简历数据'
  });
  
  if (!result.canceled) {
    await fs.writeFile(result.filePath, JSON.stringify(data, null, 2), 'utf-8');
    return result.filePath;
  }
  return null;
});

// 加载 JSON
ipcMain.handle('load-json', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'JSON', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    title: '加载简历数据'
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    const content = await fs.readFile(result.filePaths[0], 'utf-8');
    return JSON.parse(content);
  }
  return null;
});

// 获取示例数据
ipcMain.handle('get-sample-data', async () => {
  const samplePath = path.join(__dirname, '../../examples/sample.json');
  const content = await fs.readFile(samplePath, 'utf-8');
  return JSON.parse(content);
});
