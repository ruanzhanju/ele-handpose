import { throttle } from 'lodash-es'
// 窗口拖放功能类
class Drag {
  private pageX = 0
  private pageY = 0
  private throttleMouseMoveFn: (this: HTMLBodyElement, ev: MouseEvent) => any
  private body?: HTMLBodyElement
  constructor(){
    this.throttleMouseMoveFn = throttle(this.onMouseMove.bind(this), 16)
  }
  public run() {
    this.body = document.querySelector('body')!
    if(this.body) {
      this.body.addEventListener('mousedown', this.onMouseDown.bind(this))
      this.body.addEventListener('mouseup', this.onMouseUp.bind(this))
      this.body.addEventListener('mouseout', this.onMouseOut.bind(this))
    } else {
      window.addEventListener('load', () => {
        this.body = document.querySelector('body')!
        this.body.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.body.addEventListener('mouseup', this.onMouseUp.bind(this))
        this.body.addEventListener('mouseout', this.onMouseOut.bind(this))
      })
    }
  }
  private onMouseDown(e:MouseEvent) {
    this.pageX = e.pageX
    this.pageY = e.pageY
    this.body?.addEventListener('mousemove', this.throttleMouseMoveFn)
  }
  private onMouseMove(e: MouseEvent) {
    const x = e.pageX - this.pageX
    const y = e.pageY - this.pageY
    window.electron.ipcRenderer.send('dragMain', {x, y})
  }
  private onMouseUp() {
    this.body?.removeEventListener('mousemove', this.throttleMouseMoveFn)
  }
  private onMouseOut() {
    this.body?.removeEventListener('mousemove', this.throttleMouseMoveFn)
  }
}
export default () => {
  const drag = new Drag()
  return { drag }
}
