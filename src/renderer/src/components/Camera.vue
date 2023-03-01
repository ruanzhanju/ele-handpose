<script setup lang="ts">
import { onMounted } from 'vue'
let video = null as unknown as HTMLVideoElement
onMounted(() => {
  const constraints = {
    audio: false,
    video: {
      deviceId: 'f84586c88c88b9d22fe22b9c7fda534e9489c0323ce23d6ee883798e856798d9'
    }
    // eslint-disable-next-line no-undef
  } as MediaStreamConstraints
  video = document.querySelector('video')!
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    //@ts-ignore 这个变量目前没使用
    const videoTracks = stream.getVideoTracks()
    video.srcObject = stream
    video.play()
  })
})
</script>

<template>
  <video class="camera"></video>
</template>

<style scoped lang="less">
.camera {
  @apply object-cover;
  transform: rotateY(180deg);
}
</style>
