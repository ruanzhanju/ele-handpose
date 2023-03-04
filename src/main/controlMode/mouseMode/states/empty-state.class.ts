import robot from 'robotjs'
import { MouseHandposeEnum } from "../mouse-hanpose.enum";
import { MouseMode } from "../mouse-mode.class";
import { IMouseHandpose, IState } from "../mouse-model";

export class EmptyState implements IState{
  modeObj: MouseMode
  constructor(modeObj: MouseMode){
    this.modeObj = modeObj
  }
  async nextTick(mhandpose: IMouseHandpose) {
    switch (mhandpose.hanpose) {
      case MouseHandposeEnum.BG:
        robot.moveMouse(mhandpose.x, mhandpose.y)
        this.modeObj.setState(this.modeObj.bgState)
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.moveMouse(mhandpose.x, mhandpose.y)
        robot.mouseToggle('down', 'left')
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.moveMouse(mhandpose.x, mhandpose.y)
        robot.mouseToggle('down', 'right')
        this.modeObj.setState(this.modeObj.mouRightState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.moveMouse(mhandpose.x, mhandpose.y)
        robot.mouseClick('left', true) // 左键双击
        this.modeObj.setState(this.modeObj.douClickState)
        break
      case MouseHandposeEnum.MOU_UP:
        robot.moveMouse(mhandpose.x, mhandpose.y)
        this.modeObj.mouUpState.setSrcVector(mhandpose)
        this.modeObj.setState(this.modeObj.mouUpState)
        break
      case MouseHandposeEnum.EMPTY:
      default:
        break
    }
  }
}
