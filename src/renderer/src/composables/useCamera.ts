class Camera {
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
  public async open(constraints: MediaStreamConstraints) {
    if(!this.video) throw new Error("应该先调用setVideoDom(selector)设置video标签")
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.video.srcObject = stream
      this.video.play()
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
