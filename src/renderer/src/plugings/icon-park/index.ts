import { App } from "vue"
import { install } from '@icon-park/vue-next/es/all'
/**
 * 引入 icon-park 所有图标，注册为全局组件
 */
export function setupIconPark(app: App){
  install(app, 'i')
}
