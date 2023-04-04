import { Camera } from "@renderer/composables/useCamera";
import { IState } from "./control-system";
import { BideState } from "./states/bide-state.class";
import { KeyboardState } from "./states/keyboard-state.class";
import { MouseState } from "./states/mouse-state.class";
import { detector } from '@renderer/plugings/handpose-detect'

/**
 * @description **状态模式**实现手势控制系统
 */
export class ControlSystem {
  // 状态
  public bideState: BideState // 待机状态
  public mouseState: MouseState // 鼠标控制状态
  public keyboardState: KeyboardState // 键盘快捷键状态
  //@ts-ignore
  private curState:IState = null as unknown as IState // 当前状态指针
  // 摄像头对象
  //@ts-ignore
  private camera: Camera|null = null
  // 是否正在检测
  private isDetecing = false
  private estimationConfig = {
    flipHorizontal: true, // 水平反正，默认false
    staticImageMode: false // 静态模式，默认false
  }

  constructor() {
    this.bideState = new BideState(this)
    this.mouseState = new MouseState(this)
    this.keyboardState = new KeyboardState(this)
    this.setState(this.bideState)
  }
  // 加载所需的所有模型
  public async loadModels() {
    return Promise.all([
      this.bideState.loadModel(),
      this.mouseState.loadModel(),
      this.keyboardState.loadModel()
    ])
  }
  // 释放所有模型
  public disposeModels() {
    this.bideState.disposeModel()
    this.mouseState.disposeModel()
    this.keyboardState.disposeModel()
    // TODO: 这里释放模型的代码加上去不知道行不行
    // detector.detectorExits() && detector.setNull()
  }
  // 设置当前状态，用于跳转状态
  public setState(state: IState) {
    this.curState = state
  }
  // 设置所需的camera=>从camera中获取video标签才能探测手势hand
  public setCamera(camera: Camera) {
    this.camera = camera
  }
  // 启动控制系统
  public async run() {
    if(!this.camera) throw new Error('need to run: this.setCamera()')
    if(!this.camera?.video) throw new Error('need to set video dom by run: camera.setVideoDom()')
    if(this.isDetecing) return // 不能多次进入检测
    this.isDetecing = true
    let promise = Promise.resolve()
    while(this.isDetecing) {
      const p = promise.then(async():Promise<void>|never => {
        try {
          const hand = await this.detectHands()
          await this.curState.nextTick(hand)
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
  private async detectHands() {
    try {
      if(!detector.detectorExits()) {
        window.electron.ipcRenderer.send('Notification', {type: 'info', message: '正在创建检测器...'})
        await detector.createDetectorInstance()
        window.electron.ipcRenderer.send('Notification', {type: 'success', message: '检测器创建成功！'})
      }
      if(!this.isDetecing) return
      const hands = await detector.detectorInstance.estimateHands(this.camera?.video!, this.estimationConfig)
      return hands.find(h => h.handedness === 'Right')
      // if(this.callback) await this.callback(hand)
    } catch (error) { // 发生错误应该清除检测器
      detector.detectorExits() && detector.detectorInstance.dispose()
      detector.setNull()
      console.log('error',error)
      window.electron.ipcRenderer.send('Notification', {type: 'warning', title: '检测器发生错误', message: error as string})
      return
    }
  }
  // 暂停控制系统，注意：没有释放模型
  public pause() {
    this.isDetecing = false // 退出循环
  }
  public close() {
    this.pause()
    this.disposeModels()
  }
}
