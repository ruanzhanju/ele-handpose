import { createVideoWindow} from '../windows/index'
import { BrowserWindow, ipcMain } from 'electron'
import { IMouseHandpose } from '../controlMode/mouseMode/mouse-model'
import { mouseMode } from '../controlMode/index'
let cameraWin: BrowserWindow | null = null
export default () => {
  ipcMain.on('openCameraMain', () => {
    if(cameraWin) return
    cameraWin = createVideoWindow()
    cameraWin.on('closed', () => {
      cameraWin = null
    })
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
}
