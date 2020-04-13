const electron = require('electron')
const app = electron.app
const {BrowserWindow, ipcMain} = electron
// current env is dev
const isDev = require("electron-is-dev");
const path = require('path')

let mainWindow
const Menu = electron.Menu
function createWindow() {
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width:500, 
    height:752,
    useContentSize: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(
    isDev
      ? `http://localhost:3000`
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.on('closed', () => mainWindow = null);
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('close', () => mainWindow.close())
ipcMain.on('min', () => mainWindow.minimize());