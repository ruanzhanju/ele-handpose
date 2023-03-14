import { ipcMain, BrowserWindow } from 'electron'
export default (mainWin: BrowserWindow) => {
    // 转发: camera渲染进程=>主进程=>主渲染进程
    ipcMain.on('Notification', (_, opt) => {
      mainWin.webContents.send('ElNotification', opt)
    })
}
