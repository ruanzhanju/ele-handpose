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
