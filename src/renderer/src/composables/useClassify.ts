import { detector } from '@renderer/plugings/handpose-detect'
import { Hand } from '@tensorflow-models/hand-pose-detection'
import { ElNotification } from 'element-plus'
const estimationConfig = {
  flipHorizontal: true, // 水平反正，默认false
  staticImageMode: false // 静态模式，默认false
}
class Classify {
  private video?: HTMLVideoElement
  private callback?: (hand:Hand|undefined)=>Promise<void>
  constructor(){}
  public run(selector: string) {
    this.video = document.querySelector(selector)!
    console.log('here')
  }
  public async start(callback: (hand:Hand|undefined)=>Promise<void>){
    if(!this.video) return
    this.callback = callback
    try {
      if(!detector.detectorExits()) {
        ElNotification({type: 'info', message: '正在创建检测器...'})
        await detector.createDetectorInstance()
        ElNotification({type: 'success', message: '检测器创建成功！'})
      }
      const hands = await detector.detectorInstance.estimateHands(this.video!, estimationConfig)
      const hand = hands.find(h => h.handedness === 'Right')
      await this.callback(hand)
    } catch (error) { // 发生错误应该清除检测器
      detector.detectorExits() && detector.detectorInstance.dispose()
      detector.setNull()
      // console.log('error',error)
      ElNotification({type: 'warning', title: '检测器发生错误', message: error as string})
    }
  }
}
export default () => {
  const classify = new Classify()
  return {classify}
}
