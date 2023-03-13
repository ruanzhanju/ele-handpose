import { Component } from "vue"

export interface IMenuItem {
  title?: string,
  icon: string,
  props: {theme?: string, size?: string, fill?: string, 'stroke-width': number},
  routeName?: string
  sort?: number
}
