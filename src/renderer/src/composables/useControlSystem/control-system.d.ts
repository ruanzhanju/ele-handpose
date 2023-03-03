import { Hand } from '@tensorflow-models/hand-pose-detection'
import * as tf from '@tensorflow/tfjs'
import { ControlSystem } from './control-system.class'
/**
 * @description 状态接口
 */
export interface IState {
  public system: ControlSystem
  public model: tf.LayersModel|null // 分类器模型
  public loadModel():Promise<void>
  public disposeModel()
  public nextTick(hand?: Hand):Promise<void>
}
