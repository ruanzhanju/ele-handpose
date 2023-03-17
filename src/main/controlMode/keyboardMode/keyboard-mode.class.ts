import robot from 'robotjs'
import keyMapDao from "../../dao/key-map-dao.class"
import { IKeyMap } from "../../dao/type"
import { IKeyboardHandpose } from "./keyboard-mode"

export class KeyboardMode {
  private keyMap = {} as IKeyMap

  // 根据id设置strategies策略对象
  public async setKeyMapById(id:string) {
    let keyMap = await keyMapDao.find(id)
    if(!keyMap) {
      keyMap = await keyMapDao.find('default')
    } else {
      console.log('sucess')
    }
    this.keyMap = keyMap!
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
