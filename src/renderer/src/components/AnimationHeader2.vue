<template>
  <header class="header">
    <div id="typingAnimation">how to use?</div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {})
</script>

<style lang="less" scoped>
.header {
  @apply h-24 flex justify-center items-center bg-[#2c3e50] cursor-pointer;
  #typingAnimation {
    @apply relative text-3xl;
    background-image: linear-gradient(
      to right,
      rgb(236, 72, 153),
      rgb(239, 68, 68),
      rgb(234, 179, 8)
    );
    color: transparent;
    background-clip: text;
    &::before,
    &::after {
      content: '';
      @apply absolute bg-[#2c3e50] inset-0 w-full h-full;
      // animation: name duration timing-function delay iteration-count direction fill-mode;
      animation: typewriter 2s steps(11) forwards;
    }
    &::after {
      width: 2px;
      @apply bg-gray-300 rounded-xl;
      animation: typewriter 2s steps(11) forwards, flashing 0.4s ease-out infinite;
    }
  }
}
@keyframes typewriter {
  to {
    left: 100%;
  }
}
@keyframes flashing {
  to {
    opacity: 0;
  }
}
</style>
