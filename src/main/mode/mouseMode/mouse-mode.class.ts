import { IState } from "./mouse-model"
import { BgState, DouClickState, EmptyState, MouLeftState, MouRightState, MouUpState } from "./states"


export class MouseMode {
  // 手势的x、y坐标都要驾驶这个基向量，默认时（0，0）
  public baseVetor = {
    x: 0,
    y: 0
  }
  // 触发状态转换的次数
  public countMax = 3 // 默认3
  private count = 0 // 当前积累的次数
  private preIndex = -1 // 上一个传入 updateBy 的index
  // 当前状态指针
  private curState: IState = null as unknown as IState
  // 所有状态
  public emptyState: EmptyState // 检测不到手的状态
  public bgState: BgState // 背景手势状态,
  public mouLeftState: MouLeftState // 鼠标左键状态
  public mouRightState: MouRightState // 鼠标右键状态
  public mouUpState: MouUpState // 鼠标悬空状态
  public douClickState: DouClickState // 鼠标左键双击状态
  constructor() {
    this.emptyState = new EmptyState(this)
    this.bgState = new BgState(this)
    this.mouLeftState = new MouLeftState(this)
    this.mouRightState = new MouRightState(this)
    this.mouUpState = new MouUpState(this)
    this.douClickState = new DouClickState(this)
    this.setState(this.emptyState)
  }
  // 设置状态
  public setState (state: IState) {
    this.curState = state
  }
  /**
   * @description 更具预测结果更新状态
   * @param {number} index -1=>检测不到手 0=>检测到index(食指)...
   * @param {number} x 手腕节点x坐标，应该传入hand.keypoints[0].x
   * @param {number} y 手腕节点y坐标，应该传入hand.keypoints[0].y
   */
  public async updateBy(index: number, x: number, y: number) {
    this.updateCount(index) // 跟新this.count
    // 如果 this.count === this.countMax
    if(this.count === this.countMax) { // 则可以进行nextTick
      // 叠加基向量, 生成hanpose 
      // 状态模式 触发 Tick
      await this.curState.nextTick({
        hanpose: index,
        x: this.baseVetor.x + x,
        y: this.baseVetor.y + y
      })
    }
  }
  private updateCount(index: number) {
    if(index === this.preIndex) {
      if(this.count < this.countMax) ++this.count 
    } else {
      this.preIndex = index
      this.count = 1
    }
  }
}