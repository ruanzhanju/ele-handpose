<script setup lang="ts">
import Setting from '@renderer/components/Setting.vue'
import useConfig from '@renderer/composables/useConfig'
import { onActivated } from 'vue'
const { config } = useConfig()
onActivated(async () => {
  await config.reflesh()
  await config.reloadKeyMapList()
})
// 开启功能
const openCamera = async (): Promise<void> => {
  window.electron.ipcRenderer.send('openCameraMain', {
    deviceId: config.deviceId.value,
    keyMapId: config.keyMapId.value
  })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <header class="w-full h-24 flex justify-center items-center gap-8 bg-[#2c3e50]">
      <div class="scale-125">
        <i-cool theme="two-tone" size="48" :fill="['#5b21b6', '#ffffff']" :stroke-width="3" />
      </div>
      <h1 class="app-name">Ele-Handpose</h1>
    </header>
    <main class="flex-1 overflow-y-auto">
      <div class="flex justify-center items-center py-8">
        <button class="toggle-handpose-function-btn" @click="openCamera">开启手势控制功能</button>
      </div>
      <Setting></Setting>
    </main>
  </div>
</template>

<style scoped lang="less">
.app-name {
  @apply text-3xl;
  background-image: linear-gradient(to right, #8b5cf6, #f97316);
  color: transparent;
  background-clip: text;
}
.toggle-handpose-function-btn {
  @apply py-2 px-4 text-lg text-gray-100 bg-violet-500 hover:bg-violet-600 rounded;
  &.active {
    @apply bg-orange-500 hover:bg-orange-600;
  }
}
</style>
