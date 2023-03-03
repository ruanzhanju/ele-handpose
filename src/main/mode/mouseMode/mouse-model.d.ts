import { IMouseHanpose, MouseMode } from "./mouse-mode.class"
import { MouseHandposeEnum } from './mouse-hanpose.enum'
/**
 * @param {number} hanpose 代表预测结果的字符串
 * @param {number} x 手腕节点x坐标，应该传入hand.keypoints[0].x
 * @param {number} y 手腕节点y坐标，应该传入hand.keypoints[0].y
 */
export interface IMouseHandpose {
  hanpose: number
  x?: number,
  y?: number
}

interface IState<T=any> {
  modeObj: MouseMode
  nextTick(mouhanpose: IMouseHandpose):Promise<T>
}
