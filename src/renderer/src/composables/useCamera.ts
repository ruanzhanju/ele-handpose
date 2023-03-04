export class Camera {
  public video?: HTMLVideoElement | null
  private videoStreamTracks?: MediaStreamTrack[] | null
  // 设置 vidoe dom
  public setVideoDom(selector:string) {
    this.close()
    this.video = document.querySelector(selector)
  }
  /**
   * @description 打开摄像摄像机器
   * @param constraints 媒体 约束
   */
  public async open(constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      deviceId: 'f84586c88c88b9d22fe22b9c7fda534e9489c0323ce23d6ee883798e856798d9',
      height: 720,
      width: 1183
      // height: 426,
      // width: 759
      /** 注意
       * video.height/video.width 必须接近 h/w = 0.6086(426/759)
       * 模型提取video的数据生成张量时，张量的shape与video.height和video.width有关
       * 自己训练的分类模型没有自适应，只能使用训练模型时的h/w比例
       */
    }
  }) {
    if(!this.video) throw new Error("应该先调用setVideoDom(selector)设置video标签")
    this.close()
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.video.srcObject = stream
      await this.video.play()
      this.videoStreamTracks = stream.getVideoTracks()
    } catch (error) {
      console.log('camera.open()',error)
    }
  }
  /**
   * @description 摄像机关闭
   */
  public close() {
    if(this.videoStreamTracks) {
      this.videoStreamTracks.forEach(track => {
        track.stop()
      })
      this.videoStreamTracks = null
    }
    if(this.video) {
      this.video.pause()
      this.video.srcObject = null
    }
  }
}

const camera = new Camera()

// 由于该程序只开一个摄像头，因此是单例的
export default () => {
  return {camera}
}
