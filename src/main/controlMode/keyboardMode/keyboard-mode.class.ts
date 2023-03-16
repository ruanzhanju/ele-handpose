import { IKeyMap } from "../../dao/type"
import { KeyboardHandposeEnum } from "./keyboard-handpose.enum"
import { IKeyboardHandpose } from "./keyboard-mode"
import robot from 'robotjs'

export class KeyboardMode {
  private keyMap: IKeyMap

  constructor() {
    this.keyMap = {
      id: 'default',
      name: '默认方案',
      strategies: {
        [KeyboardHandposeEnum.DOWN_A]: {
          key: 'down',
          modifier: []
        },
        [KeyboardHandposeEnum.DOWN_B]: {
          key: 'pagedown',
          modifier: []
        },
        [KeyboardHandposeEnum.LEFT_A]: {
          key: 'left',
          modifier: []
        },
        [KeyboardHandposeEnum.RIGHT_A]: {
          key: 'right',
          modifier: []
        },
        [KeyboardHandposeEnum.UP_A]: {
          key: 'up',
          modifier: []
        },
        [KeyboardHandposeEnum.UP_B]: {
          key: 'pageup',
          modifier: []
        }
      }
    }
    // console.log('this.keyMap',this.keyMap)
  }
  // 根据id设置strategies策略对象
  public setKeyMapById(id:string) {

  }
  // 根据手势分类结果进行计算机键盘控制
  public controllKeyboard(keyhanpose: IKeyboardHandpose) {
    // console.log('keyhanpose',keyhanpose)
    // 1.根据keyhanpose从strategies取出操作字符串
    const strategy = this.keyMap.strategies[keyhanpose.hanpose]
    // 2. 操作键盘
    if(strategy?.key && strategy.modifier) {
      robot.keyTap(strategy.key, strategy.modifier)
    }
  }
}
