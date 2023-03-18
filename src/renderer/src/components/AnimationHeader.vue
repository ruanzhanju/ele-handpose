<template>
  <header class="header">
    <div id="randColorAnimation">自定义手势快捷键</div>
  </header>
</template>

<script setup lang="ts">
import { onActivated, onMounted } from 'vue'

class RandColorAnimation {
  constructor(private el: HTMLDivElement, private text = [...el.innerHTML]) {}
  private randomColorValue(): string {
    const arr = ['7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    return arr[Math.floor(Math.random() * arr.length)]
  }
  private color(): string {
    return (
      '#' +
      Array(6)
        .fill(null)
        .map(() => this.randomColorValue())
        .join('')
    )
  }
  public run(): void {
    this.el.innerHTML = ''
    this.text.forEach((str, i) => {
      this.el.insertAdjacentHTML(
        'beforeend',
        `<div style="color:${this.color()}; animation-delay:${i * 0.1}s">${str}</div>`
      )
    })
  }
}
let animation: RandColorAnimation
onMounted(() => {
  animation = new RandColorAnimation(document.querySelector('#randColorAnimation')!)
})
onActivated(() => {
  animation.run()
})
</script>

<style lang="less" scoped>
.header {
  @apply h-24 flex justify-center items-center bg-[#2c3e50] cursor-pointer;
  #randColorAnimation {
    display: grid;
    grid-auto-flow: column;
    white-space: pre;
    font-size: 2.25rem;
    :deep(div) {
      animation: myscale 0.5s;
    }
  }
}

@keyframes myscale {
  50% {
    margin: 0 1.5rem;
    transform: scale(2);
    text-shadow: rgba(13, 6, 89, 0.8) 3px 3px 5px;
  }
  to {
    transform: scale(1);
  }
}
</style>
