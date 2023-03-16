export class KeyboardMode {
  /** 需要一个映射对象=>策略对象
   * {
   *    [keyhanpose.hanpose]: 操作
   * }
   */
  private strategies: Record<string, string>

  constructor() {
    this.strategies = {}
    console.log('this.strategies',this.strategies)
  }
  // 根据id设置strategies策略对象
  public setStrategiesBy(id:string) {

  }
  // 根据手势分类结果进行计算机键盘控制
  public controllKeyboard(keyhanpose) {
    // 1.根据keyhanpose从strategies取出操作字符串
    // 2. 操作键盘
  }
}
