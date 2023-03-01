<script setup lang="ts">
import { Aim, Close, FullScreen } from '@element-plus/icons-vue'
import { ref } from 'vue'
import Camera from '@renderer/components/Camera.vue'
import useDrag from '@renderer/composables/useDrag'

const { drag } = useDrag()
drag.run()
const closeCamera = (): void => {
  window.electron.ipcRenderer.send('closeCameraMain')
}

// 按钮形状
const circleShape = ref(true)
const shapeToggle = (): void => {
  circleShape.value = !circleShape.value
}
</script>

<template>
  <main :class="{ 'rounded-full': circleShape }">
    <Camera />
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
    <!-- <div class="moveable">
      <el-icon><Pointer class="opacity-70" /></el-icon>
    </div> -->
  </main>
</template>

<style scoped lang="less">
main {
  @apply w-screen h-screen flex relative overflow-hidden border-2 border-violet-300 transition-all;
  transition-timing-function: linear;
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
    // .moveable {
    //   @apply flex justify-center items-center;
    // }
  }
}
</style>
