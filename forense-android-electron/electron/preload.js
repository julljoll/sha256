const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs seguras al renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Andriller
  andriller: {
    start: (config) => ipcRenderer.invoke('andriller:start', config),
    cancel: () => ipcRenderer.invoke('andriller:cancel'),
    onOutput: (callback) => {
      ipcRenderer.on('andriller:output', (event, data) => callback(data));
    },
    onError: (callback) => {
      ipcRenderer.on('andriller:error', (event, data) => callback(data));
    }
  },

  // ALEAPP
  aleapp: {
    start: (config) => ipcRenderer.invoke('aleapp:start', config),
    cancel: () => ipcRenderer.invoke('aleapp:cancel'),
    onOutput: (callback) => {
      ipcRenderer.on('aleapp:output', (event, data) => callback(data));
    },
    onError: (callback) => {
      ipcRenderer.on('aleapp:error', (event, data) => callback(data));
    }
  },

  // Diálogos
  dialog: {
    selectFolder: () => ipcRenderer.invoke('dialog:selectFolder'),
    selectFile: (filters) => ipcRenderer.invoke('dialog:selectFile', filters)
  },

  // Archivos
  file: {
    writeJson: (filePath, data) => ipcRenderer.invoke('file:writeJson', filePath, data),
    readJson: (filePath) => ipcRenderer.invoke('file:readJson', filePath)
  },

  // Hash
  hash: {
    calculate: (filePath, algorithm) => ipcRenderer.invoke('hash:calculate', filePath, algorithm)
  },

  // Platform info
  platform: process.platform
});
