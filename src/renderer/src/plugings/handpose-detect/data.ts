//代码参考： https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection/src/tfjs
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import { MediaPipeHandsTfjsModelConfig } from '@tensorflow-models/hand-pose-detection'
import '@tensorflow/tfjs'
/**
 * 3.0 tfjs似乎已经包含了下面的包，无需单独引用？
 * （1）.import '@tensorflow/tfjs' 与 （2）.import * as tf from '@tensorflow/tfjs'的区别
 * 方式（1）会直接执行模块进行初始化，而方式（2）只有在使用tf这个变量时才会
 * 可以说，方式一是作为模块的副作用而导入：初始化tfjs-backend-webgl
 */
// import  '@tensorflow/tfjs-core';
// // Register WebGL backend.
// import '@tensorflow/tfjs-backend-webgl';
// Create a detector

/**
 * detectorModelUrl、landmarkModelUrl：由于有墙，默认值不能访问，需要自己设置
 * 他们是托管模型的地址。不能访问，自己下载模型：https://hub.tensorflow.google.cn/s?deployment-format=tfjs
 * 不知道是不是这样使用下载的模型
 */
export const model = handPoseDetection.SupportedModels.MediaPipeHands
export const detectorConfig: MediaPipeHandsTfjsModelConfig = {
  runtime: 'tfjs',
  modelType: 'full',
  maxHands: 1,
  detectorModelUrl: '/src/assets/handpose_detect_model/handpose_3d_detecor_full_1/model.json',
  landmarkModelUrl: '/src/assets/handpose_detect_model/handpose_3d_landmark_full_1/model.json'
}
