import { Hand } from "@tensorflow-models/hand-pose-detection";
import { LayersModel } from "@tensorflow/tfjs";
import { IState } from "../control-system";
import { ControlSystem } from "../control-system.class";
import * as tf from '@tensorflow/tfjs'
import { modelUrl } from '../data'
import { hpdata, mldata } from '@renderer/utils'
import minMax from "@renderer/assets/models/bide/minMax";
import { BideHandposeEnum } from "../enums";
import useAudio from "@renderer/composables/useAudio";

const { audio } = useAudio()

export class BideState implements IState {
  public system: ControlSystem;

  public model: LayersModel|null;
  private minMax?: {min: tf.Scalar[], max: tf.Scalar[]}

  // 确认某个手势稳定的次数
  public countMax = 3 // 默认3
  private count = 0 // 当前积累的次数
  private preIndex = -1 // 上一个传入 的index

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
    this.model = await tf.loadLayersModel(modelUrl.bide)
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
  // 根据分类结果选择做不同事情
  private async switchWith(res: {hanpose: number}) {
    switch (res.hanpose) {
      case BideHandposeEnum.BG:
      case BideHandposeEnum.EMPTY:
        return new Promise(resolve => {
          // console.log('延迟00ms...')
          setTimeout(resolve, 800)
        })
      case BideHandposeEnum.DORSUM: // 手背
        return new Promise(resolve => {
          audio.start()
          setTimeout(() => {
            this.system.setState(this.system.mouseState)
            resolve(undefined)
          }, 500)
        })
      case BideHandposeEnum.PALM: // 手心
        return new Promise(resolve => {
          audio.start()
          setTimeout(() => {
            this.system.setState(this.system.keyboardState)
            resolve(undefined)
          }, 800)
        })
      default:
        break;
    }
  }
}
