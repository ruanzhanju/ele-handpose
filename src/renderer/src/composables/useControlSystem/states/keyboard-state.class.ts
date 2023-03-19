import { Hand } from "@tensorflow-models/hand-pose-detection";
import { LayersModel } from "@tensorflow/tfjs";
import { IState } from "../control-system";
import { ControlSystem } from "../control-system.class";
import * as tf from '@tensorflow/tfjs'
import { modelUrl } from '../data'
import minMax from "@renderer/assets/models/keyboard/minMax";
import useAudio from "@renderer/composables/useAudio";
import { hpdata, mldata } from "@renderer/utils";
import { KeyboardHandposeEnum } from "../enums";

const { audio } = useAudio()

export class KeyboardState implements IState {
  public system: ControlSystem;

  public model: LayersModel | null;
  private minMax?: {min: tf.Scalar[], max: tf.Scalar[]}

  // 确认某个手势稳定的次数
  public countMax = 3 // 默认3
  private count = 0 // 当前积累的次数
  private preIndex = -1 // 上一个传入 的index

  // 决定跳转会bide-state的属性：检测不到手势n=3500ms，即empty n 秒，或者检测到非背景的有效手势就返回bide
  private timer:NodeJS.Timeout|null = null
  private isJump = false

  constructor(system: ControlSystem) {
    this.system = system
    this.model = null
  }
  public disposeModel() {
    this.model?.dispose()
    this.minMax?.max.forEach(scaler => scaler.dispose())
    this.minMax?.min.forEach(scalar => scalar.dispose())
    this.model = null
    this.minMax = void 0
  }
  public async loadModel() {
    if(this.model) this.disposeModel()
    this.model = await tf.loadLayersModel(modelUrl.keyboard)
    this.minMax = {
      min: tf.tidy(() => {
        return minMax.min.map(num => tf.scalar(num, 'float32')) || []
      }),
      max: tf.tidy(() => {
        return minMax.max.map(num => tf.scalar(num, 'float32')) || []
      })
    }
    // this.model.summary() // 输出模型信息是否加载成功
  }
  public async nextTick(hand?: Hand) {
    // 1. 得到分类结果 {hanpose: number}
    const res = this.predictHand(hand)
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
  // 使用hand对象分类，返回分类结果 {hanpose: number}
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
        return {hanpose: output.findIndex(s => s == score)}
      } else {
        return {hanpose: -1}
      }
    }
    else {
      return {hanpose: -1}
    }
  }
  private async switchWith(res: {hanpose: number}) {
    this.trySetTimer()
    switch (res.hanpose) {
      case KeyboardHandposeEnum.BG:
      case KeyboardHandposeEnum.EMPTY:
        break;
      default:
        this.cleanTimer()
        await window.electron.ipcRenderer.invoke('keyboardControl:Main', res)
        this.isJump = true
        break;
    }
    if(this.isJump) {
      // 跳出mouse-state播放提示音:如果this.timer为null,则已经完成动作而跳出，否则为定时到时间而跳出
      this.timer === null ? audio.over2() : audio.over()
      this.isJump = false // isJump 复位
      this.timer = null
      // 跳转
      this.system.setState(this.system.bideState)
    }
  }
  // 尝试设置定时器，准备跳回bide-state
  private trySetTimer() {
    if(!this.timer) {
      // console.log('setTimer')
      this.timer = setTimeout(() => {
        this.isJump = true
      }, 3000)
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
