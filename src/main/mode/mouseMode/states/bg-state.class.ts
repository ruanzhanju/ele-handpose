import robot from "@/apis/mLearningApi/robot";
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
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        robot.mouseToggle({button: 'left', down: 'down'})
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        robot.mouseToggle({button: 'right', down: 'down'})
        this.modeObj.setState(this.modeObj.mouRightState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        robot.mouseLeftBtnDoubleClick({})
        this.modeObj.setState(this.modeObj.douClickState)
        break
      case MouseHandposeEnum.MOU_UP:
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        this.modeObj.mouUpState.setSrcVector(mouhanpose)
        this.modeObj.setState(this.modeObj.mouUpState)
        break
      default:
        break
    }
  }

}