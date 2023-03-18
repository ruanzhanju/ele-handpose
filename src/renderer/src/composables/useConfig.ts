import { ElNotification } from "element-plus"
import { cloneDeep } from 'lodash-es'
import { Ref, ref } from "vue"
import { KeyboardHandposeEnum } from "./useControlSystem/enums"


type T1 = {
  [K in KeyboardHandposeEnum]: {
    key: string, // 键
    modifier: string[], // 功能键
    name: string // 策略、手势的名字，
    note: string // 策略、手势的说明，
  }
}

type TStrategies = Omit<T1, -1|8>

export type TKeyMap = {
  id: string // id 唯一标识，uuidv4
  name: string // keyMap的名字
  notChange?: boolean // 不能修改
  strategies: TStrategies // 策略
}

class Config {
  public cameras:Ref<MediaDeviceInfo[]> = ref([]) // // 计算机中可用的摄像头
  public deviceId:Ref<string> = ref('') // 选择的摄像头id

  public keyMapList: Ref<TKeyMap[]> = ref([]) // 可用的快捷键映射方案
  public keyMapId:Ref<string> = ref('default') // 选择的快捷键映射方案的id
  public operatekm = ref({}) as Ref<TKeyMap> // KeyMapItemList 正在操的keymap
  public fromDisable = ref(true) // 表单是否禁用
  public drawervisable = ref(false)

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
    // console.log('this.keyMapList',this.keyMapList.value)
  }
  public setOperateKeyMap(km: TKeyMap) {
    const index = this.keyMapList.value.findIndex(keymap => keymap.id === km.id)
    if(index !== -1) {
      this.operatekm.value = this.keyMapList.value[index]
      // console.log('this.operatekm.value',this.operatekm.value) // Proxy
      // console.log(this.operatekm.value === this.keyMapList.value[index]) // true
    }
  }
  // 创建一个空的响应对象
  public createEmptyKeyMap() {
    const defaultkm = this.keyMapList.value.find(km => km.id === 'default')
    const emptykm = cloneDeep(defaultkm)
    if(emptykm) {
      emptykm.id = null as unknown as string
      emptykm.name = ''
      emptykm.notChange = false
      Object.entries(emptykm.strategies).forEach(([numkey, value]) => {
        emptykm.strategies[numkey].key = '',
        emptykm.strategies[numkey].modifier = []
        emptykm.strategies[numkey].name = value.name
        emptykm.strategies[numkey].note = ''
      })
      this.operatekm = ref<TKeyMap>(emptykm)
    }
    // console.log('defaultkm',defaultkm) // Proxy 响应数据
    // console.log('emptykm',emptykm) // 普通对象
    // console.log(emptykm === defaultkm) // false
  }
  // check 添加/修改operatekm属性
  public async addOrUpdateOperateKeyMap() {
    if(this.operatekm.value.name.toString().trim().length === 0) {
      return
    }
    if(this.operatekm.value.id) { // 修改
      await window.electron.ipcRenderer.invoke('update:keyMap', JSON.parse(JSON.stringify(this.operatekm.value)))
    } else { // 添加
      await window.electron.ipcRenderer.invoke('add:keyMap', JSON.parse(JSON.stringify(this.operatekm.value)))
    }
    this.reloadKeyMapList()
    this.drawervisable.value = false
  }
  // 删除一个keyMap
  public async delKeyMap(km: TKeyMap) {
    await window.electron.ipcRenderer.invoke('delete:keyMap', km.id)
    this.reloadKeyMapList()
  }
}
const config = new Config()
export default () => {
  return {config}
}
