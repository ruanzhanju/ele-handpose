import { BrowserWindow, ipcMain } from 'electron'
import cameraMain from './cameraMain'

function setupIpcMain(mainWin: BrowserWindow):void {
  cameraMain()
  ipcMain.on('dragMain', (event, opt:{x:number, y:number}) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if(win) {
      const [x, y] = win.getPosition()
      // const [w, h] = win.getSize()
      win.setPosition(x + opt.x, y + opt.y)
      // win.setSize(w, h)
    }
  })

  ipcMain.on('Notification', (_, opt) => {
    mainWin.webContents.send('ElNotification', opt)
  })
}

export {
  setupIpcMain
}
