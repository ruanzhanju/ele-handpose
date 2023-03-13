<script setup lang="ts">
import useMenu from '@renderer/composables/useMenu'
import { IMenuItem } from '@renderer/composables/useMenu/type'
import { useRouter } from 'vue-router'
const router = useRouter()
const { menu } = useMenu()
menu.init()
const handleClickMenuItem = (menuItem: IMenuItem): void => {
  // menu.active改变样式
  if (menu.active(menuItem)) {
    router.push({ name: menuItem.routeName })
  }
}
</script>

<template>
  <div class="menu">
    <div
      v-for="menuItem in menu.menuItems.value"
      :key="menuItem.routeName"
      class="menu-item"
      @click="handleClickMenuItem(menuItem)"
    >
      <component :is="menuItem.icon" v-bind="menuItem.props" />
    </div>
  </div>
</template>

<style scoped lang="less">
.menu {
  @apply pt-4 flex flex-col items-center gap-4 bg-[#2e2e2e];
  .menu-item {
    @apply w-full flex justify-center hover:cursor-pointer;
  }
}
</style>
