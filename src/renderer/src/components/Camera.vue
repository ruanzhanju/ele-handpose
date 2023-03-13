<script setup lang="ts">
/**
 * 只有480*640 和 462*759是最好的。
 * - 排除handpose-detector的原因，因为480*640和462*759都能很好运行，而且别人的模型应该是自适应的
 * - 排除物理摄像头的原因，应位物理摄像头会返回最满足要求的视频流
 * - 那么原因就是因为自己训练的模型的原因=》与提取的数据相关=》与提取数据时video的比例有关
 * - 比例是h/w = 0.6086(426/759),而480/640=0.75
 * - 现在使用 360/591=0.6086进行验证，猜测也是快的，720*1183也分类很快
 * - **验证正确**
 * == 结论，video.height/video.width 必须接近 h/w = 0.6086(426/759)
 */
</script>

<template>
  <!-- 只有 h/w = 0.6086(426/759)比较好 -->
  <!-- <video class="camera" height="462" width="759"></video> -->
  <!-- <video class="camera" height="480" width="640"></video> -->
  <video class="camera" height="720" width="1183"></video>

  <!-- 如果用下面的，分类模型好像不太行，分类效果差 -->
  <!-- <video class="camera" height="1080" width="1080"></video> -->
  <!-- <video class="camera" height="720" width="720"></video> -->
  <!-- <video class="camera" height="360" width="360"></video> -->
  <!-- <video class="camera" height="720" width="1282"></video> -->
</template>

<style scoped lang="less">
.camera {
  @apply object-fill;
  transform: rotateY(180deg);
}
</style>
