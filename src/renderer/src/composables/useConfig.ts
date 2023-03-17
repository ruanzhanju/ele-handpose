import { Ref, ref } from "vue"

type TKeyMap = {
  id: string // id 唯一标识，uuidv4
  name: string // keyMap的名字
  notChange?: boolean // 不能修改
}

class Config {
  public cameras:Ref<MediaDeviceInfo[]> = ref([]) // // 计算机中可用的摄像头
  public deviceId:Ref<string> = ref('') // 选择的摄像头id

  public keyMapList: Ref<TKeyMap[]> = ref([]) // 可用的快捷键映射方案
  public keyMapId:Ref<string> = ref('default') // 选择的快捷键映射方案的id

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
  // 重新从主进程获取keyMapList
  public async reloadKeyMapList() {
    this.keyMapList.value = await window.electron.ipcRenderer.invoke('get:keyMapList')
  }
}
const config = new Config()
export default () => {
  return {config}
}
