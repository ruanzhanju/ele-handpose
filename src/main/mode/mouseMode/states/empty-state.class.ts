import robot from "@/apis/mLearningApi/robot";
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
        robot.moveMouse({x: mhandpose.x, y: mhandpose.y})
        this.modeObj.setState(this.modeObj.bgState)
        break
      case MouseHandposeEnum.MOU_LEFT:
        robot.moveMouse({x: mhandpose.x, y: mhandpose.y})
        robot.mouseToggle({button: 'left', down: 'down'})
        this.modeObj.setState(this.modeObj.mouLeftState)
        break
      case MouseHandposeEnum.MOU_RIGHT:
        robot.moveMouse({x: mhandpose.x, y: mhandpose.y})
        robot.mouseToggle({button: 'right', down: 'down'})
        this.modeObj.setState(this.modeObj.mouRightState)
        break
      case MouseHandposeEnum.DOU_CLICK:
        robot.moveMouse({x: mhandpose.x, y: mhandpose.y})
        robot.mouseLeftBtnDoubleClick({})
        this.modeObj.setState(this.modeObj.douClickState)
        break
      case MouseHandposeEnum.MOU_UP:
        robot.moveMouse({x: mhandpose.x, y: mhandpose.y})
        this.modeObj.mouUpState.setSrcVector(mhandpose)
        this.modeObj.setState(this.modeObj.mouUpState)
        break
      case MouseHandposeEnum.EMPTY:
      default:
        break
    }
  }
}