<script setup lang="ts"></script>

<template>
  <!-- <video class="camera" height="480" width="640"></video> -->
  <video class="camera" height="720" width="480"></video>
</template>

<style scoped lang="less">
.camera {
  @apply object-cover;
  transform: rotateY(180deg);
}
</style>
