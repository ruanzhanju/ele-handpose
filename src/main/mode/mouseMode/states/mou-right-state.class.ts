import robot from "@/apis/mLearningApi/robot";
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
        robot.mouseToggle({button: 'right', down: 'up'})
        this.modeObj.setState(this.modeObj.emptyState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.dragMouse({x: mouhanpose.x, y: mouhanpose.y})
      case MouseHandposeEnum.BG:
        robot.mouseToggle({button: 'right', down: 'up'})
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        this.modeObj.setState(this.modeObj.bgState)
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.mouseToggle({button: 'right', down: 'up'})
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        robot.mouseToggle({button: 'left', down: 'down'})
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.mouseToggle({button: 'right', down: 'up'})
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        robot.mouseLeftBtnDoubleClick({})
        this.modeObj.setState(this.modeObj.douClickState)
        break
      case MouseHandposeEnum.MOU_UP:
        robot.mouseToggle({button: 'right', down: 'up'})
        robot.moveMouse({x: mouhanpose.x, y: mouhanpose.y})
        this.modeObj.mouUpState.setSrcVector(mouhanpose)
        this.modeObj.setState(this.modeObj.mouUpState)
        break
      default:
        break
    }
  }
  
}