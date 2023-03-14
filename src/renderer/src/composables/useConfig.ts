import { Ref, ref } from "vue"

class Config {
  // 计算机中可用的摄像头
  public cameras:Ref<MediaDeviceInfo[]> = ref([])
  // 选择的摄像头id
  public deviceId:Ref<string> = ref('')
  constructor() {
    // 有设备变化
    navigator.mediaDevices.addEventListener('devicechange', this.reflesh.bind(this))
  }
  // 刷新可用的摄像头
  public async reflesh(){
    const devices = await navigator.mediaDevices.enumerateDevices()
    this.cameras.value = devices.filter((d) => d.kind.includes('video'))
    // 如果存在摄像头且用户没有选择，则选择第一个
    if(this.deviceId.value === '' && this.cameras.value.length) {
      this.deviceId.value = this.cameras.value[0].deviceId
    }
  }
}
const config = new Config()
export default () => {
  return {config}
}
