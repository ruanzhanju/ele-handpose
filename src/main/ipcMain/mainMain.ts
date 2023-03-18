import { ipcMain, BrowserWindow } from 'electron'
import keyMapDao from '../dao/key-map-dao.class'
import { IKeyMap } from '../dao/type'
export default (mainWin: BrowserWindow) => {
  // 转发: camera渲染进程=>主进程=>主渲染进程
  ipcMain.on('Notification', (_, opt) => {
    mainWin.webContents.send('ElNotification', opt)
  })

  // 返回keyMapList
  ipcMain.handle('get:keyMapList', async() => {
    try {
      return await keyMapDao.findAll()
    } catch (error) {
      mainWin.webContents.send('ElNotification', error)
      return []
    }
  })
  // 添加keyMap
  ipcMain.handle('add:keyMap', async(_, keyMap: IKeyMap) => {
    try {
      await keyMapDao.insert(keyMap)
    } catch (error) {
      mainWin.webContents.send('ElNotification', error)
    }
  })
  // 修改keyMap
  ipcMain.handle('update:keyMap', async(_, keyMap: IKeyMap) => {
    try {
      if(keyMap.id) await keyMapDao.update(keyMap)
    } catch (error) {
      mainWin.webContents.send('ElNotification', error)
    }
  })
  // 删除keyMap
  ipcMain.handle('delete:keyMap', async(_, keyMapId:string) => {
    try {
      await keyMapDao.remove(keyMapId)
    } catch (error) {
      mainWin.webContents.send('ElNotification', error)
    }
  })
}
