import robot from 'robotjs'
import { MouseHandposeEnum } from "../mouse-hanpose.enum";
import { MouseMode } from "../mouse-mode.class";
import { IState, IMouseHandpose } from "../mouse-model";

export class MouRightState implements IState {
  modeObj: MouseMode;
  constructor(modeObj: MouseMode) {
    this.modeObj = modeObj
  }
  async nextTick(mouhanpose: IMouseHandpose) {
    switch (mouhanpose.hanpose) {
      case MouseHandposeEnum.EMPTY:
        robot.mouseToggle('up', 'right')
        this.modeObj.setState(this.modeObj.emptyState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.dragMouse(mouhanpose.x, mouhanpose.y)
      case MouseHandposeEnum.BG:
        robot.mouseToggle('up', 'right')
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        this.modeObj.setState(this.modeObj.bgState)
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.mouseToggle('up', 'right')
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        robot.mouseToggle('down', 'left')
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.mouseToggle('up', 'right')
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        robot.mouseClick('left', true) // 左键双击
        this.modeObj.setState(this.modeObj.douClickState)
        break
      case MouseHandposeEnum.MOU_UP:
        robot.mouseToggle('up', 'right')
        robot.moveMouse(mouhanpose.x, mouhanpose.y)
        this.modeObj.mouUpState.setSrcVector(mouhanpose)
        this.modeObj.setState(this.modeObj.mouUpState)
        break
      default:
        break
    }
  }

}
