const { app, BrowserWindow, dialog } = require('electron')
const isDev = require('electron-is-dev')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const url = require('url')

app.commandLine.appendSwitch('ignore-certificate-errors')
app.commandLine.appendSwitch('disable-web-security')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

let mainWindow

function createWindow() {
  if (!isDev) {
    require(path.join(__dirname, 'build-server/webservice'))
  }

  mainWindow = new BrowserWindow({
    // width: 1200,
    // height: 715,
    // show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname + 'public/wb.ico'),
    fullscreen: true,
    webPreferences: {
      // devTools: isDev ? true : false,
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : url.format({
          pathname: path.join(__dirname, 'build/index.html'),
          protocol: 'file:',
          slashes: true
        })
  )

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  // mainWindow.maximize()
  if (isDev) mainWindow.webContents.openDevTools()

  if (!isDev) autoUpdater.checkForUpdatesAndNotify()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: `Update Available`,
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: `A new version download started.`
  }

  dialog.showMessageBox(dialogOpts)
})

autoUpdater.on('update-downloaded', (_event) => {
  setTimeout(() => {
    autoUpdater.quitAndInstall()
  }, 3500)
})
