/**
 * @param {number} hanpose 代表预测结果的字符串
 * @param {number} x 手腕节点x坐标，应该传入hand.keypoints[0].x
 * @param {number} y 手腕节点y坐标，应该传入hand.keypoints[0].y
 */
 export interface IKeyboardHandpose {
  hanpose: number
}
