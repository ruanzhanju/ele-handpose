// 定义vue-router meta的接口 参考：https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
// typings.d.ts or router.ts
import 'vue-router'
import { IMenuItem } from '@renderer/composables/useMenu/type'

declare module 'vue-router' {
  interface RouteMeta {
    menuItem?: IMenuItem
  }
}
