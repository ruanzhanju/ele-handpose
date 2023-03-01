import { onMounted } from 'vue'
class Classify {
  private video?: HTMLVideoElement
  constructor(){}
  public run(selector: string) {
    onMounted(() => {
      this.video = document.querySelector(selector)!
      setTimeout(() => {
        this.video?.pause()
      }, 5000)
    })
  }
  public async start(callback: ()=>Promise<void>){

  }
}
export default () => {
  const classify = new Classify()
  return {classify}
}
