import { BrowserWindow, ipcMain } from 'electron'
import cameraMain from './cameraMain'

function setupIpcMain(mainWin: BrowserWindow):void {
  cameraMain()
  // 拖动功能
  ipcMain.on('dragMain', (event, opt:{x:number, y:number}) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if(win) {
      const [x, y] = win.getPosition()
      // const [w, h] = win.getSize()
      win.setPosition(x + opt.x, y + opt.y)
      // win.setSize(w, h)
    }
  })
  // 转发: camera渲染进程=>主进程=>主渲染进程
  ipcMain.on('Notification', (_, opt) => {
    mainWin.webContents.send('ElNotification', opt)
  })
  // TODO: 接收分类结果，根据结果控制计算机鼠标或键盘
}

export {
  setupIpcMain
}
