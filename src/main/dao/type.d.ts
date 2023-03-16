import { KeyboardHandposeEnum } from '../keyboardMode/keyboard-handpose.enum'

type TStrategies = {
  [K in KeyboardHandposeEnum]?: {
    key: string,
    modifier: string[]
  }
}
// 类型运算的话，，，还是用type好用

interface IKeyMap {
  id: string // id 唯一标识，uuidv4
  name: string // keyMap的名字
  strategies: TStrategies // 策略
}
