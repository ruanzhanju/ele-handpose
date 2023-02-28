<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
onMounted(() => {
  const constraints = {
    audio: false,
    video: {
      deviceId: 'f84586c88c88b9d22fe22b9c7fda534e9489c0323ce23d6ee883798e856798d9'
    }
    // eslint-disable-next-line no-undef
  } as MediaStreamConstraints
  const video = document.querySelector('video')!
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    //@ts-ignore 这个变量目前没使用
    const videoTracks = stream.getVideoTracks()
    video.srcObject = stream
    video.play()
  })
})

const closeCamera = (): void => {
  window.electron.ipcRenderer.send('closeCameraMain')
}
</script>

<template>
  <main>
    <video class="camera"></video>
    <el-button
      class="closeBtn"
      type="danger"
      size="default"
      :icon="Close"
      plain
      circle
      @click="closeCamera"
    />
  </main>
</template>

<style scoped lang="less">
main {
  @apply w-screen h-screen flex relative rounded-full overflow-hidden border-0 border-violet-300;
  .camera {
    @apply object-fill;
    transform: rotateY(180deg);
  }
  .closeBtn {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden;
  }
  &:hover .closeBtn {
    @apply block;
  }
}
</style>
