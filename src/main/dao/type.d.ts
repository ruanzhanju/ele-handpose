import { KeyboardHandposeEnum } from '../keyboardMode/keyboard-handpose.enum'

type TStrategies = {
  [K in KeyboardHandposeEnum]: {
    name: string // 策略的名字
    key: string // 策略的 键
    modifier: string[] // 策略的功能键
    note: string // 策略的说明对应的说明，用户自定义
  }
}
// 类型运算的话，，，还是用type好用

interface IKeyMap {
  id: string // id 唯一标识，uuidv4
  name: string // keyMap的名字 如：默认方案
  notChange?: boolean // 不能修改
  strategies: TStrategies // 策略
}
