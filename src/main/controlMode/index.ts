import { KeyboardMode } from "./keyboardMode/keyboard-mode.class";
import { MouseMode } from "./mouseMode/mouse-mode.class";

const mouseMode = new MouseMode()
const keyboardMode = new KeyboardMode()
export {
  mouseMode, // 鼠标模式
  keyboardMode, // 键盘模式
}
