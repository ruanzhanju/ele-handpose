import router from "@renderer/router"
import { ref } from "vue"
import { IMenuItem } from "./type"
class Menu {
  public menuItems = ref<IMenuItem[]>([])
  constructor(){}
  public init() {
    let res = router.getRoutes().filter(route => route.meta.menuItem)
      .map(route => {
        return {
          ...route.meta.menuItem,
          routeName: route.name
        } as IMenuItem
      })

    this.menuItems.value = res
    this.menuItems.value[0].props.fill = '#f9fafb'
    this.menuItems.value[0].props["stroke-width"] = 3
    // console.log('this.menuItems',this.menuItems.value)
  }
  public active(menuItem: IMenuItem) {
    this.menuItems.value.forEach(item => {
      item.props.fill = '#828585'
      item.props["stroke-width"] = 2
    })
    const curItem = this.menuItems.value.find(value => value.routeName === menuItem.routeName)
    if(curItem) {
      curItem.props.fill = '#f9fafb'
      curItem.props["stroke-width"] = 3
      return true
    }
    return false
  }
}
const menu = new Menu()
export default () => {
  return {menu}
}
