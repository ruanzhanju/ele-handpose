<script setup lang="ts">
import { ElNotification } from 'element-plus'
import Menu from './Menu.vue'
/**
 * 主页面框架用于接收来自摄像头UI信息，然后弹窗提示
 */
window.electron.ipcRenderer.on('ElNotification', (_, opt) => {
  ElNotification(opt)
})
</script>

<template>
  <main class="home-layout">
    <Menu class="h-screen" />
    <div class="article">
      <RouterView v-slot="{ Component }">
        <keep-alive :max="3">
          <component :is="Component"></component>
        </keep-alive>
      </RouterView>
    </div>
  </main>
</template>

<style scoped lang="less">
.home-layout {
  @apply w-screen h-screen;
  display: grid;
  grid-template-columns: 60px minmax(400px, 1fr);
  .article {
    @apply h-screen bg-white;
  }
}
</style>
