/**
 * @description handpose_data 手势识别数据处理工具函数
 */

 import { Hand } from "@tensorflow-models/hand-pose-detection"
 import * as tf from '@tensorflow/tfjs'
 /**
  * @description 输入HanposeDetector.class.ts检测到的手部数据Hand[]，返回3d数据组成的一个手的数据tensor
  */
 function getKeypoint3DTensor(hand: Hand) {
   const POINTKEY = ['x', 'y', 'z']
   return tf.tidy(() => {
     const feature = hand.keypoints3D?.reduce((feature, point:Record<string,any>) => {
       POINTKEY.forEach(key => {
         feature.push(point[key])
       })
       return feature
     },[] as number[])!
     // console.log('feature',feature)
     return tf.tensor2d([feature])
   })
 }
 export default {
   getKeypoint3DTensor,
 }
