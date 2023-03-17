import { ipcMain, BrowserWindow } from 'electron'
import keyMapDao from '../dao/key-map-dao.class'
export default (mainWin: BrowserWindow) => {
    // 转发: camera渲染进程=>主进程=>主渲染进程
    ipcMain.on('Notification', (_, opt) => {
      mainWin.webContents.send('ElNotification', opt)
    })

    // 返回keyMapList
    ipcMain.handle('get:keyMapList', async() => {
      return await keyMapDao.findAll()
    })
}
