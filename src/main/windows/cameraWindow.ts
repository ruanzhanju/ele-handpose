import { BrowserWindow, screen } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'

export function createVideoWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const {width, height} = primaryDisplay.workAreaSize
  const WIDTH = 200, HEIGHT = 200
  const videoWindow = new BrowserWindow({
    show: false,
    width: WIDTH,
    height: HEIGHT,
    minWidth: 150,
    minHeight: 150,
    maxWidth: WIDTH,
    maxHeight: HEIGHT,
    x: width - WIDTH - 50,
    y: 50,
    alwaysOnTop: true,
    transparent: true,
    resizable: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  videoWindow.setAspectRatio(1) // 等比例缩放

  videoWindow.on('ready-to-show', () => {
    videoWindow.show()
  })
  videoWindow.setMenu(null)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const url = process.env['ELECTRON_RENDERER_URL'] + '/camera'
    videoWindow.loadURL(url)
  } else {
    videoWindow.loadFile(join(__dirname, '../../renderer/index.html/camera'))
  }
  // videoWindow.webContents.openDevTools()
  return videoWindow
}
