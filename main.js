const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
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

  // mainWindow.webContents.print({ silent: true })
  mainWindow.on('closed', function () {
    mainWindow = null
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
