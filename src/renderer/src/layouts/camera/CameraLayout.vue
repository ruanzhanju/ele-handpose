<script setup lang="ts">
import { Aim, Close, FullScreen } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import Camera from '@renderer/components/Camera.vue'
import useDrag from '@renderer/composables/useDrag'
import useCamera from '@renderer/composables/useCamera'
import useControlSystem from '@renderer/composables/useControlSystem'
interface Config {
  deviceId: string // 摄像机id
  keyMapId: string // 手势-快捷键映射方案
}
const { drag } = useDrag()
drag.run()
const { camera } = useCamera()
const isOpen = ref(false)
const { controlSystem } = useControlSystem()
onMounted(async () => {
  const config = (await window.electron.ipcRenderer.invoke('getConfig')) as Config // 获取摄像头，映射方案等配置
  camera.setVideoDom('#camera') // 设置摄像投dom
  // 根据config打开摄像投
  isOpen.value = true
  await camera.open(config.deviceId)
  isOpen.value = camera.video?.paused ? false : true

  await window.electron.ipcRenderer.invoke('set:keyMap', { keyMapId: config.keyMapId })

  await controlSystem.loadModels() // 加载bide/mouse/keyboard 三个状态的模型
  controlSystem.setCamera(camera) // 控制系统连接摄像头
  controlSystem.run() // 注意：这里没有用await
})
const closeCamera = (): void => {
  controlSystem.pause()
  controlSystem.disposeModels()
  camera.close()
  isOpen.value = camera.video?.paused ? false : true
  window.electron.ipcRenderer.send('closeCameraMain')
}

// 按钮形状
const circleShape = ref(true)
const shapeToggle = (): void => {
  circleShape.value = !circleShape.value
}
</script>

<template>
  <main :class="{ 'rounded-full': circleShape, 'rounded-2xl': !circleShape, isOpen }">
    <Camera id="camera" />
    <el-button
      class="closeBtn"
      type="danger"
      size="default"
      :icon="Close"
      plain
      circle
      @click="closeCamera"
    />
    <el-button
      v-if="circleShape"
      class="shapeBtn"
      size="default"
      :icon="FullScreen"
      plain
      circle
      @click="shapeToggle"
    />
    <el-button
      v-else
      class="shapeBtn"
      size="default"
      :icon="Aim"
      plain
      circle
      @click="shapeToggle"
    />
  </main>
</template>

<style scoped lang="less">
main {
  @apply w-screen h-screen flex relative overflow-hidden border-2 border-violet-300 transition-all;
  transition-timing-function: linear;
  background: url('/src/assets/images/camera_off.png') no-repeat center 50%/50%;
  &.isOpen {
    background-image: url('/src/assets/images/camera.png');
  }
  .closeBtn {
    @apply absolute left-1/2 top-0 -translate-x-1/2 hidden;
  }
  .shapeBtn {
    @apply absolute left-1/2 bottom-0 hidden;
    transform: translateX(-70%);
  }
  .moveable {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden border border-violet-100
    w-16 h-16 rounded-full text-2xl;
    -webkit-app-region: drag;
  }
  &:hover {
    .closeBtn {
      @apply block;
    }
    .shapeBtn {
      @apply block;
    }
  }
  .el-button {
    @apply bg-gray-700 opacity-50 text-gray-100;
  }
}
</style>
