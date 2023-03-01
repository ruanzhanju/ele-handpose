import { createVideoWindow} from '../windows/index'
import { BrowserWindow, ipcMain } from 'electron'
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
}
