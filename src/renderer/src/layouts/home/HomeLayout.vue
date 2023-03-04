<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { reactive } from 'vue'
const versions = reactive({ ...window.electron.process.versions })
window.electron.ipcRenderer.on('ElNotification', (_, opt) => {
  ElNotification(opt)
})
function openCamera(): void {
  window.electron.ipcRenderer.send('openCameraMain')
}
window.electron.process.versions
</script>

<template>
  <div>
    <h1>软件布局</h1>
    <el-button @click="openCamera">打开摄像头</el-button>
    <ul class="versions">
      <li class="electron-version">Electron v{{ versions.electron }}</li>
      <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
      <li class="node-version">Node v{{ versions.node }}</li>
      <li class="v8-version">V8 v{{ versions.v8 }}</li>
    </ul>
  </div>
</template>

<style scoped lang="less"></style>
