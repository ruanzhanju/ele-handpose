import { BrowserWindow, ipcMain } from 'electron'
import { createVideoWindow} from '../windows/index'

let cameraWin: BrowserWindow | null = null

function setupIpcMain():void {
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

export {
  setupIpcMain
}
