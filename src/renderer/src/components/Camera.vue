<script setup lang="ts"></script>

<template>
  <video class="camera" width="640" height="480"></video>
</template>

<style scoped lang="less">
.camera {
  @apply object-cover;
  transform: rotateY(180deg);
}
</style>
