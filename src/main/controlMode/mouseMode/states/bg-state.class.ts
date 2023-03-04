import robot from 'robotjs'
import { MouseHandposeEnum } from "../mouse-hanpose.enum";
import { MouseMode } from "../mouse-mode.class";
import { IMouseHandpose, IState } from "../mouse-model";

export class BgState implements IState{
  modeObj: MouseMode
  constructor(modeObj: MouseMode) {
    this.modeObj = modeObj
  }
  async nextTick(mouhanpose: IMouseHandpose) {
    switch (mouhanpose.hanpose) {
      case MouseHandposeEnum.EMPTY:
        this.modeObj.setState(this.modeObj.emptyState)
        break
      case MouseHandposeEnum.BG:
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        robot.mouseToggle('down', 'left')
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        robot.mouseToggle('down', 'right')
        this.modeObj.setState(this.modeObj.mouRightState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        robot.mouseClick('left', true) // 左键双击
        this.modeObj.setState(this.modeObj.douClickState)
        break
      case MouseHandposeEnum.MOU_UP:
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        this.modeObj.mouUpState.setSrcVector(mouhanpose)
        this.modeObj.setState(this.modeObj.mouUpState)
        break
      default:
        break
    }
  }

}
