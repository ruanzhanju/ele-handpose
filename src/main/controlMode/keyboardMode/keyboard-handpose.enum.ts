export enum KeyboardHandposeEnum {
  // EMPTY = -1, // 检测不到手势，这个手势不会发送到主进程
  DOWN_A = 0, // 下a手势
  DOWN_B = 1, // 下b手势
  LEFT_A = 2, // 左a手势
  LEFT_B = 3, // 左b手势
  RIGHT_A = 4, // 右a手势
  RIGHT_B = 5, // 右b手势
  UP_A = 6, // 上a手势
  UP_B = 7, // 上b手势
  // BG = 8 // 背景/其他手势，这个手势不会发送到主进程
}
