import { BrowserWindow, ipcMain } from 'electron'
import cameraMain from './cameraMain'
import mainMain from './mainMain'

function setupIpcMain(mainWin: BrowserWindow):void {
  cameraMain(mainWin)
  mainMain(mainWin)
  // 窗口拖动功能
  ipcMain.on('dragMain', (event, opt:{x:number, y:number}) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if(win) {
      const [x, y] = win.getPosition()
      // const [w, h] = win.getSize()
      win.setPosition(x + opt.x, y + opt.y)
      // win.setSize(w, h)
    }
  })
}

export {
  setupIpcMain
}
