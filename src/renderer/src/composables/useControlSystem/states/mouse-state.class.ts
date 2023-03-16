import { Hand } from "@tensorflow-models/hand-pose-detection";
import { LayersModel } from "@tensorflow/tfjs";
import { IState } from "../control-system";
import { ControlSystem } from "../control-system.class";
import * as tf from '@tensorflow/tfjs'
import { modelUrl } from '../data'
import minMax from "@renderer/assets/models/mouse/minMax";
import { hpdata, mldata } from "@renderer/utils";
import { MouseHandposeEnum } from "../enums";
import useAudio from "@renderer/composables/useAudio";

const { audio } = useAudio()

export class MouseState implements IState {
  public system: ControlSystem;

  public model: LayersModel | null;
  private minMax?: {min: tf.Scalar[], max: tf.Scalar[]}

  // 确认某个手势稳定的次数
  public countMax = 3 // 默认3
  private count = 0 // 当前积累的次数
  private preIndex = -1 // 上一个传入 的index

  // 决定跳转会bide-state的属性：检测不到手势n=3500ms，即empty n 秒，就返回bide
  private timer:NodeJS.Timeout|null = null
  private isJump = false

  constructor(system: ControlSystem) {
    this.system = system
    this.model = null
  }
  // 释放模型
  public disposeModel() {
    this.model?.dispose()
    this.minMax?.max.forEach(scaler => scaler.dispose())
    this.minMax?.min.forEach(scalar => scalar.dispose())
    this.model = null
    this.minMax = void 0
  }
  // 加载模型
  public async loadModel() {
    if(this.model) this.disposeModel()
    this.model = await tf.loadLayersModel(modelUrl.mouse)
    this.minMax = {
      min: tf.tidy(() => {
        return minMax.min.map(num => tf.scalar(num, 'float32')) || []
      }),
      max: tf.tidy(() => {
        return minMax.max.map(num => tf.scalar(num, 'float32')) || []
      })
    }
  }
  public async nextTick(hand?: Hand) {
    // 1. 预测手势，生成结果: classifyRes: {hanpose:number, x?:number, y?:number}
    const res = this.predictHand(hand)
    // await this.switchWith(res) // 方式一
    // 方式二，
    this.updateCount(res.hanpose) // 跟新this.count
    if(this.count === this.countMax) {
      await this.switchWith(res)
    }
  }
  private updateCount(index: number) {
    if(index === this.preIndex) {
      if(this.count < this.countMax) ++this.count
    } else {
      this.preIndex = index
      this.count = 1
    }
  }
  // 使用hand对象分类，返回分类结果 {hanpose: number, x?:number, y?:number}
  private predictHand(hand?: Hand) {
    if(hand) {
      const output = tf.tidy(() => {
        const handTensor = hpdata.getKeypoint3DTensor(hand) // hand=>tensor
        const handposeTensor = mldata.removeTranslate(handTensor, 3) // 预处理1
        try {
          const nHanposeTensor = mldata.normalise(handposeTensor, this.minMax?.min, this.minMax?.max) // 预处理2
          const outputTensor = this.model!.predict(nHanposeTensor.tensor) as tf.Tensor
          // console.log('outputTensor',outputTensor)
          return outputTensor.dataSync()
        } catch (error) {
          throw new Error('model或minMax对象出现问题：' + error )
        }
      })
      const score = Math.max(...output)
      if(score > 0.8) {
        return {
          hanpose: output.findIndex(s => s == score),
          x: hand.keypoints[0].x,
          y: hand.keypoints[0].y
        }
      } else {
        return {hanpose: -1, x: -1, y: -1}
      }
    }
    else {
      return {hanpose: -1, x: -1, y: -1}
    }
  }
  // 根据分类结果选择做不同事情
  private async switchWith(res: {hanpose: number, x:number, y:number}) {
    switch (res.hanpose) {
      case MouseHandposeEnum.EMPTY:
        this.trySetTimer()
        // console.log('Empty')
        await window.electron.ipcRenderer.invoke('mouseControl:Main', res)
        break
      default:
        this.cleanTimer()
        // console.log('res.hanpose',res.hanpose)
        await window.electron.ipcRenderer.invoke('mouseControl:Main', res)
        break
    }
    if(this.isJump) {
      audio.over() // 跳出mouse-state播放提示音
      this.isJump = false // isJump 复位
      this.timer = null
      // 复位偏移量
      window.electron.ipcRenderer.send('mouseControl-resetBase:Main')
      this.system.setState(this.system.bideState)
    }
  }
  // 尝试设置定时器，准备跳回bide-state
  private trySetTimer() {
    if(!this.timer) {
      // console.log('setTimer')
      this.timer = setTimeout(() => {
        this.isJump = true
      }, 3500)
    }
  }
  private cleanTimer() {
    if(this.timer) {
      // console.log('cleanTimer')
      clearTimeout(this.timer as unknown as number)
      this.timer = null
    }
  }
}
