import robot from "@/apis/mLearningApi/robot";
import { MouseHandposeEnum } from "../mouse-hanpose.enum";
import { MouseMode } from "../mouse-mode.class";
import { IState, IMouseHandpose } from "../mouse-model";

export class MouUpState implements IState {
  modeObj: MouseMode
  // 到达该状态时，需记录鼠标位置，作为srcVector
  private srcVector = {
    x: 0,
    y: 0
  }
  constructor(modeObj: MouseMode) {
    this.modeObj = modeObj
  }
  async nextTick(mouhanpose: IMouseHandpose) {
    switch (mouhanpose.hanpose) {
      case MouseHandposeEnum.BG:
        this.updateBaseVector(mouhanpose)
        this.modeObj.setState(this.modeObj.bgState)
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.mouseToggle({button: 'left', down: 'down'})
        this.updateBaseVector(mouhanpose)
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.mouseToggle({button: 'right', down: 'down'})
        this.updateBaseVector(mouhanpose)
        this.modeObj.setState(this.modeObj.mouRightState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.mouseLeftBtnDoubleClick({})
        this.updateBaseVector(mouhanpose)
        this.modeObj.setState(this.modeObj.douClickState)
      case MouseHandposeEnum.MOU_UP:
      case MouseHandposeEnum.EMPTY:
      default:
        break
    }
  }
  // 记录srcVector, 跳转到该状态前调用
  public setSrcVector(mouhanpose: IMouseHandpose) {
    this.srcVector.x = mouhanpose.x
    this.srcVector.y = mouhanpose.y
  }
  // 设置鼠标模式的基本偏移量, 跳出该状态时调用
  // TODO: 需要限制一下偏移量不能过大
  private updateBaseVector(mouhanpose: IMouseHandpose) {
    this.modeObj.baseVetor.x += this.srcVector.x - mouhanpose.x
    this.modeObj.baseVetor.y += this.srcVector.y - mouhanpose.y 
  }
}