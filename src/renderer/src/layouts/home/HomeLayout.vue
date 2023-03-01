<script setup lang="ts">
function openCamera(): void {
  window.electron.ipcRenderer.send('openCameraMain')
}
</script>

<template>
  <div>
    <h1>软件布局</h1>
    <el-button @click="openCamera">打开摄像头</el-button>
  </div>
</template>

<style scoped lang="less">
.camera {
  @apply object-fill;
  transform: rotateY(180deg);
}
</style>
