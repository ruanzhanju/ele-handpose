import { detector } from '@renderer/plugings/handpose-detect'
import { Hand } from '@tensorflow-models/hand-pose-detection'
const estimationConfig = {
  flipHorizontal: true, // 水平反正，默认false
  staticImageMode: false // 静态模式，默认false
}
class Classify {
  private video?: HTMLVideoElement
  private callback?: (hand:Hand|undefined)=>Promise<void>
  private isDetecing = false
  constructor(){}
  public run(selector: string) {
    this.video = document.querySelector(selector)!
  }
  public async start(callback: (hand:Hand|undefined)=>Promise<void>){
    if(!this.video) return
    this.callback = callback
    if(this.isDetecing) return // 不能多次进入检测
    this.isDetecing = true
    await this.openCamera()
    let promise = Promise.resolve()
    while(this.isDetecing) {
      const p = promise.then(async():Promise<void>|never => {
        try {
          await this.detectHands()
          return
        } catch (error) {
          window.electron.ipcRenderer.send('Notification', {type: 'error', message: error as string})
          console.log('error',error)
          return Promise.reject()
        }
      })
      await p
      promise = p
    }
  }
  private async openCamera() {
    const constraints = {
      audio: false,
      video: {
        deviceId: 'f84586c88c88b9d22fe22b9c7fda534e9489c0323ce23d6ee883798e856798d9',
        // width: 640,
        // height: 480
      }
      // eslint-disable-next-line no-undef
    } as MediaStreamConstraints
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    //@ts-ignore 这个变量目前没使用
    const videoTracks = stream.getVideoTracks()
    if(this.video) {
      this.video.srcObject = stream
      this.video?.play()
    }
  }
  private async detectHands() {
    try {
      if(!detector.detectorExits()) {
        window.electron.ipcRenderer.send('Notification', {type: 'info', message: '正在创建检测器...'})
        await detector.createDetectorInstance()
        window.electron.ipcRenderer.send('Notification', {type: 'success', message: '检测器创建成功！'})
      }
      const hands = await detector.detectorInstance.estimateHands(this.video!, estimationConfig)
      const hand = hands.find(h => h.handedness === 'Right')
      if(this.callback) await this.callback(hand)
    } catch (error) { // 发生错误应该清除检测器
      detector.detectorExits() && detector.detectorInstance.dispose()
      detector.setNull()
      // console.log('error',error)
      window.electron.ipcRenderer.send('Notification', {type: 'warning', title: '检测器发生错误', message: error as string})
    }
  }
}
export default () => {
  const classify = new Classify()
  return {classify}
}
