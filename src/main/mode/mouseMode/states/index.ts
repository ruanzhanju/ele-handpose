import { EmptyState } from "./empty-state.class"
import { BgState } from "./bg-state.class"
import { MouLeftState } from "./mou-left-state.class"
import { MouRightState } from "./mou-right-state.class"
import { MouUpState } from "./mou-up-state.class"
import { DouClickState } from "./dou-click-state.class"
/**
 * @description MouseMode的状态模式的所有状态类
 */
export {
  EmptyState, // 空手势/检测不到手势
  BgState, // 背景手势状态
  MouLeftState, // 鼠标左键状态
  MouRightState, // 鼠标右键状态
  MouUpState, // 鼠标悬空状态
  DouClickState // 鼠标左键双击状态
}