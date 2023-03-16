export enum BideHandposeEnum {
  EMPTY = -1, // 检测不到手势
  DORSUM = 0,  // 手背手势
  PALM = 1, // 手心手势
  BG = 2 // 背景/其他手势
}

export enum MouseHandposeEnum {
  EMPTY = -1, // 检测不到手势
  MOU_LEFT = 0, // 鼠标左键手势
  DOU_CLICK = 1, // 鼠标左键双击手势
  MOU_RIGHT = 2, // 鼠标右键手势
  MOU_UP = 3, // 鼠标悬空手势
  BG = 4 // 背景/其他手势
}

export enum KeyboardHandposeEnum {
  EMPTY = -1, // 检测不到手势
  DOWN_A = 0, // 下a手势
  DOWN_B = 1, // 下b手势
  LEFT_A = 2, // 左a手势
  LEFT_B = 3, // 左b手势
  RIGHT_A = 4, // 右a手势
  RIGHT_B = 5, // 右b手势
  UP_A = 6, // 上a手势
  UP_B = 7, // 上b手势
  BG = 8 // 背景/其他手势
}
