const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/icon.png'),
    titleBarStyle: 'default'
  });

  // En desarrollo cargar desde Vite
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // En producción cargar desde dist
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ============================================
// IPC Handlers para Andriller
// ============================================

ipcMain.handle('andriller:start', async (event, config) => {
  const { outputPath, extractionType = 'logica', deviceId } = config;
  
  return new Promise((resolve, reject) => {
    const args = [
      '--output', outputPath,
      '--mode', extractionType,
      '--readonly'
    ];

    if (deviceId) {
      args.push('--device', deviceId);
    }

    const process = spawn('andriller', args);
    let output = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
      mainWindow.webContents.send('andriller:output', data.toString());
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
      mainWindow.webContents.send('andriller:error', data.toString());
    });

    process.on('close', (code) => {
      resolve({
        success: code === 0,
        exitCode: code,
        output,
        error: errorOutput
      });
    });

    process.on('error', (err) => {
      reject(err);
    });

    // Guardar PID para posible cancelación
    mainWindow.andrillerProcess = process;
  });
});

ipcMain.handle('andriller:cancel', async () => {
  if (mainWindow.andrillerProcess) {
    mainWindow.andrillerProcess.terminate();
    mainWindow.andrillerProcess = null;
    return { success: true };
  }
  return { success: false, message: 'No hay proceso activo' };
});

// ============================================
// IPC Handlers para ALEAPP
// ============================================

ipcMain.handle('aleapp:start', async (event, config) => {
  const { imagePath, outputPath, analysisType = 'completo' } = config;
  
  return new Promise((resolve, reject) => {
    const args = [
      '-i', imagePath,
      '-o', outputPath,
      '-t', 'fs'
    ];

    if (analysisType === 'whatsapp') {
      args.push('--filter', 'whatsapp');
    } else if (analysisType === 'timeline') {
      args.push('--timeline', '1');
    }

    const process = spawn('aleapp', args);
    let output = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
      mainWindow.webContents.send('aleapp:output', data.toString());
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
      mainWindow.webContents.send('aleapp:error', data.toString());
    });

    process.on('close', (code) => {
      resolve({
        success: code === 0,
        exitCode: code,
        output,
        error: errorOutput
      });
    });

    process.on('error', (err) => {
      reject(err);
    });

    mainWindow.aleappProcess = process;
  });
});

ipcMain.handle('aleapp:cancel', async () => {
  if (mainWindow.aleappProcess) {
    mainWindow.aleappProcess.terminate();
    mainWindow.aleappProcess = null;
    return { success: true };
  }
  return { success: false, message: 'No hay proceso activo' };
});

// ============================================
// IPC Handlers para Sistema de Archivos
// ============================================

ipcMain.handle('dialog:selectFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result;
});

ipcMain.handle('dialog:selectFile', async (filters) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: filters || []
  });
  return result;
});

ipcMain.handle('file:writeJson', async (event, filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('file:readJson', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, data: JSON.parse(content) };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ============================================
// IPC Handlers para Hash Calculation
// ============================================

const crypto = require('crypto');

ipcMain.handle('hash:calculate', async (event, filePath, algorithm = 'sha256') => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      resolve({ success: true, hash: hash.digest('hex'), algorithm });
    });

    stream.on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
  });
});
