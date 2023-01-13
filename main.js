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
    // require(path.join(__dirname, 'build-server/serial'))
    // require(path.join(__dirname, 'build-server/nfc'))
  }

  mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    icon: __dirname + 'public/favicon.ico',
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

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
  })
}

app.on('ready', () => {
  createWindow()
  mainWindow.maximize()
  if (isDev) mainWindow.webContents.openDevTools()
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
    title: `${autoUpdater.channel} Update Available`,
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

autoUpdater.on('update-not-available', (_event) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: `Update Not available`,
    message: 'A message!',
    detail: `Update Not available`
  }

  dialog.showMessageBox(dialogOpts)
})
