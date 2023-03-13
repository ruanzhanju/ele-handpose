<template>
  <div>
    <el-button @click="openCamera">打开摄像头</el-button>
  </div>
</template>

<script setup lang="ts">
function openCamera(): void {
  window.electron.ipcRenderer.send('openCameraMain')
}
</script>

<style scoped></style>
