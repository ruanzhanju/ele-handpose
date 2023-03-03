import * as tf from '@tensorflow/tfjs'
/**
 * @description mldata => machineLearning_data => 机器学习数据处理工具函数
 */

 type TNormalised = {
  tensor: tf.Tensor
  min: tf.Tensor | tf.Tensor[]
  max: tf.Tensor | tf.Tensor[]
}
/**
 * @description 归一化函数，可归一化单特征、多特征
 * @returns TNormalised
 */
function normalise (
  tensor: tf.Tensor, // 需要进行归一化的张量
  /**如果提供可选参数 previous[(Min)(Max)]，则按按提供的最值进行归一化处理。
   * 否则会从tensor参数中寻找最值。该可选参数在已经确定最值的情况下提供
   */
  preMin?: tf.Tensor | tf.Tensor[],
  preMax?: tf.Tensor | tf.Tensor[]
) {
  return tf.tidy(() => {
    /**
     * 张量维度大于1，且第二维的长度大于1时，取第二维的长度=>即一个记录（record）的特征的个数
     */
    const featureDimension = tensor.shape.length > 1 && tensor.shape[1] as number
    if(featureDimension && featureDimension > 1) {
      /**如果一个记录（record）有**多**个特征，
       * 则分别对不同的特征进行归一化处理=>因为不同的特征取值范围不同。
       */
      const features = tf.split(tensor, featureDimension, 1)
      // 递归，归一化
      const normalisedFeatures = features.map((featureTensor, i) => {
        const min = preMin as tf.Tensor[]
        const max = preMax as tf.Tensor[]
        return normalise(featureTensor, min ? min[i] : undefined, max ? max[i] : undefined)
      }) as TNormalised[]
      // 构造多特征结果
      const returnTensor = tf.concat(normalisedFeatures.map(f => f.tensor), 1)
      const min = normalisedFeatures.map(f => f.min)
      const max = normalisedFeatures.map(f => f.max)
      return {
        tensor: returnTensor,
        min,
        max
      } as TNormalised
    } else {
      // 如果一个记录（record）只有一个特征（最普通的情况）。
      // 如果没有提供最值，则从tensor中获取
      const min = preMin as tf.Tensor || tensor.min()
      const max = preMax as tf.Tensor || tensor.max()
      return {
        tensor: tensor.sub(min).div(max.sub(min)), // 归一化
        // 特征的最值
        min,
        max
      } as TNormalised
    }
  })
}

/**
 * @description 张量按特征逆向归一化
 * @returns tf.Tensor
 */
function denormalise (
  tensor: tf.Tensor, // 需要进行逆向归一化的张量
  /**
   * 参数 previous[(Min)(Max)]，必须提供最值，（因为必须有归一化才有逆向归一化）
   * 最值在归一化函数normalise()中返回
   */
  preMin: tf.Tensor | tf.Tensor[],
  preMax: tf.Tensor | tf.Tensor[]
) {
  return tf.tidy(() => {
    /**
    * 张量维度大于1，且第二维的长度大于1时，取第二维的长度=>即一个记录（record）的特征的个数
    */
    const featureDimension = tensor.shape.length > 1 && tensor.shape[1] as number
    if(featureDimension && featureDimension > 1) {
      // 处理一个记录（record）多个特征的情况
      // 按特征维度切分张量
      const features = tf.split(tensor, featureDimension, 1)
      // 对每个特征逆向归一化
      const denormalisedFeatures = features.map((featureTensor, i) => {
        const min = preMin as tf.Tensor[]
        const max = preMax as tf.Tensor[]
        return denormalise(featureTensor, min[i], max[i])
      }) as tf.Tensor[]
      // 构造结果
      return tf.concat(denormalisedFeatures, 1)
    }
    else {
      // 处理一个记录(record)只有一个特征的情况
      const min = preMin as tf.Tensor
      const max = preMax as tf.Tensor
      return tensor.mul(max.sub(min)).add(min) as tf.Tensor
    }
  })
}

/**
 * @description 以手部第一个点（手腕关节）为原点，处理手部关节坐标
 * @param tensor 二维张量，第一维沿着记录，第二维度沿着特征
 * @param spaceDimension 点坐标的维度 2维的点或3维的点：2 | 3
 * @returns 经过原点转换之后的tensor
 */
function removeTranslate (
  tensor: tf.Tensor, // 记录（records）张量，第一维是数据(记录维)，第二维是每个记录的特征
  spaceDimension: 2 | 3, // 空间维度，2维空间（x,y)表示一个点，3维空间(x,y,z)表示一个点
) {
  return tf.tidy(() => {
    const recordsTensor = tensor // [168, 3 * 21] => [168, 21, 3]
      .reshape([tensor.shape[0], tensor.shape[1]!/spaceDimension, spaceDimension])
      .split(tensor.shape[0]) // [1, 21, 3], [1, 21, 3],,,X168
      .map(recordPointTensor => {
        // 按第二维度（向量点）分割出第一个点point1（手腕关节）
        const [point1] = tf.split(recordPointTensor, [1, recordPointTensor.shape[1]! - 1], 1)
        // 平移变换，以手腕关节点作为一个手势的原点
        return recordPointTensor.sub(point1)
      })

    return tf.concat(recordsTensor, 0).reshape(tensor.shape)
  })
}
export default {
  normalise, // 张量按特征归一化
  denormalise, // 张量按特征逆向归一化
  removeTranslate // 去除平移：数据处理以手部第一个点（手腕关节）为原点，处理手部关节坐标
}
