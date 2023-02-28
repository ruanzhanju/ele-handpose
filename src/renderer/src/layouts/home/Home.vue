<script setup lang="ts">
function openCamera(): void {
  window.api.openCameraMain()
}
</script>

<template>
  <div>
    <h1>软件布局</h1>
    <el-button @click="openCamera">打开摄像头</el-button>
  </div>
</template>

<style scoped lang="less"></style>
