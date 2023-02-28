import { BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'

export function createVideoWindow() {
  const videoWindow = new BrowserWindow({
    show: false,
    width: 250,
    height: 250,
    minWidth: 150,
    minHeight: 150,
    // maxWidth: 400,
    // maxHeight: 400,
    x: 1200,
    y: 100,
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
  videoWindow.webContents.openDevTools()
  return videoWindow
}
