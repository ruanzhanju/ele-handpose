import { createVideoWindow} from '../windows/index'
import { BrowserWindow, ipcMain } from 'electron'
import { IMouseHandpose } from '../controlMode/mouseMode/mouse-model'
import { IKeyboardHandpose } from '../controlMode/keyboardMode/keyboard-mode'
import { keyboardMode, mouseMode } from '../controlMode/index'
let cameraWin: BrowserWindow | null = null
// 用于保存摄像头定义
interface Config {
  deviceId:string // 摄像机id
}
let config:Config = {} as Config
export default (mainWin: BrowserWindow) => {
  ipcMain.on('openCameraMain', (_, opt:Config) => {
    if(cameraWin) {
      mainWin.webContents.send('ElNotification', {type: 'warning', message: '功能已经开启'})
      return
    }
    cameraWin = createVideoWindow()
    config = opt
    cameraWin.on('closed', () => {
      cameraWin = null
    })
  })

  ipcMain.handle('getConfig', () => {
    return config
  })

  ipcMain.on('closeCameraMain', () => {
    if(cameraWin) {
      cameraWin.close()
    }
  })

  // 鼠标控制方式：
  ipcMain.handle('mouseControl:Main', async(_, mouhanpose: IMouseHandpose) => {
    // console.log('index', mouhanpose.hanpose)
    await mouseMode.updateBy(mouhanpose)
    // console.log('mouhanpose',mouhanpose)
  })
  ipcMain.on('mouseControl-resetBase:Main', () => {
    mouseMode.resetBaseVetor()
  })
  // 键盘控制方式：
  ipcMain.handle('keyboardControl:Main', async(_, keyhanpose: IKeyboardHandpose) => {
    keyboardMode.controllKeyboard(keyhanpose)
  })
}
