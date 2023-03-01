import { BrowserWindow, ipcMain } from 'electron'
import cameraMain from './cameraMain'
import { ceil } from 'lodash'

function setupIpcMain():void {
  cameraMain()
  ipcMain.on('dragMain', (event, opt:{x:number, y:number}) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if(win) {
      const [x, y] = win.getPosition()
      // const [w, h] = win.getSize()
      win.setPosition(ceil(x + opt.x), ceil(y + opt.y))
      // win.setSize(w, h)
    }
  })
}

export {
  setupIpcMain
}
