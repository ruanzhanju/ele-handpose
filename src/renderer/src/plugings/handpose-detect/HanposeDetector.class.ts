import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import { detectorConfig, model } from './data'
/**
 * @description 检测器类 （从自定义机器学习标签元素中提取，因为不是标签也可能需要该功能）
 * 
 */
export default class HanposeDetector {
  private static _detector: handPoseDetection.HandDetector | null = null
  // 异步创建检测器
  public async createDetectorInstance(){
    if(HanposeDetector._detector) return HanposeDetector._detector
    return new Promise(async(resolve, reject) => {
      HanposeDetector._detector = await handPoseDetection.createDetector(model, detectorConfig)
      resolve(HanposeDetector._detector)
    })
  }
  // 获取检测器
  get detectorInstance() {
    if(HanposeDetector._detector) return HanposeDetector._detector
    throw new Error(`dectector is ${HanposeDetector._detector}! 应该调用createDetector()方法之后再使用detector`)
  }

  public detectorExits() {
    return HanposeDetector._detector ? true : false
  }

  public setNull() {
    HanposeDetector._detector = null
  }
}